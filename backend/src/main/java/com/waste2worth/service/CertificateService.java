package com.waste2worth.service;

import com.waste2worth.algorithm.SecurityRuleEngine;
import com.waste2worth.entity.*;
import com.waste2worth.repository.*;
import com.waste2worth.utility.HashUtility;
import com.waste2worth.utility.PdfCertificateGenerator;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class CertificateService {

    private final CertificateRepository certificateRepository;
    private final EWasteRepository eWasteRepository;
    private final UserRepository userRepository;
    private final RecyclerRepository recyclerRepository;
    private final PickupRequestRepository pickupRequestRepository;
    private final NotificationService notificationService;
    private final SecurityRuleEngine securityRuleEngine;
    private final PdfCertificateGenerator pdfCertificateGenerator;

    public CertificateService(
            CertificateRepository certificateRepository,
            EWasteRepository eWasteRepository,
            UserRepository userRepository,
            RecyclerRepository recyclerRepository,
            PickupRequestRepository pickupRequestRepository,
            NotificationService notificationService,
            SecurityRuleEngine securityRuleEngine,
            PdfCertificateGenerator pdfCertificateGenerator) {
        this.certificateRepository = certificateRepository;
        this.eWasteRepository = eWasteRepository;
        this.userRepository = userRepository;
        this.recyclerRepository = recyclerRepository;
        this.pickupRequestRepository = pickupRequestRepository;
        this.notificationService = notificationService;
        this.securityRuleEngine = securityRuleEngine;
        this.pdfCertificateGenerator = pdfCertificateGenerator;
    }

    public Certificate generateCertificate(String ewasteId) {
        EWasteItem item = eWasteRepository.findById(ewasteId)
                .or(() -> eWasteRepository.findByWasteId(ewasteId))
                .orElseThrow(() -> new RuntimeException("E-Waste item not found: " + ewasteId));

        // Rule: Certificate can ONLY be generated after RECYCLED
        if (!LifecycleStatus.RECYCLED.name().equalsIgnoreCase(item.getStatus()) &&
            !LifecycleStatus.CERTIFIED.name().equalsIgnoreCase(item.getStatus())) {
            throw new IllegalStateException("Certificate cannot be generated for pending or uncompleted recycling status: " + item.getStatus());
        }

        // Check if certificate already exists
        Optional<Certificate> existing = certificateRepository.findByEwasteId(item.getId());
        if (existing.isPresent()) {
            return existing.get();
        }

        // Get previous certificate for cryptographic hash chaining
        String previousHash = certificateRepository.findTopByOrderByIssuedAtDesc()
                .map(Certificate::getHash)
                .orElse("0000000000000000000000000000000000000000000000000000000000000000");

        String certNum = "W2W-CERT-" + (100000 + new Random().nextInt(900000));
        LocalDateTime issuedAt = LocalDateTime.now();

        // Calculate tamper-evident SHA-256
        String rawData = certNum + ":" + item.getId() + ":" + item.getUserId() + ":" +
                item.getMatchedRecyclerId() + ":" + item.getWeightKg() + ":" + issuedAt + ":" + previousHash;
        String hash = HashUtility.generateSHA256(rawData);

        Certificate cert = Certificate.builder()
                .certificateNumber(certNum)
                .ewasteId(item.getId())
                .userId(item.getUserId())
                .recyclerId(item.getMatchedRecyclerId())
                .deviceCategory(item.getCategory())
                .deviceBrand(item.getBrand())
                .deviceModel(item.getModel())
                .weightKg(item.getWeightKg())
                .ecoPointsEarned(item.getEcoPointsEarned())
                .status("ISSUED")
                .hash(hash)
                .previousHash(previousHash)
                .issuedAt(issuedAt)
                .build();

        Certificate saved = certificateRepository.save(cert);

        // Update lifecycle status to CERTIFIED
        item.setStatus(LifecycleStatus.CERTIFIED.name());
        item.setUpdatedAt(LocalDateTime.now());
        eWasteRepository.save(item);

        pickupRequestRepository.findByEwasteId(item.getId()).ifPresent(p -> {
            p.setStatus(LifecycleStatus.CERTIFIED.name());
            p.setUpdatedAt(LocalDateTime.now());
            pickupRequestRepository.save(p);
        });

        // Notify citizen
        notificationService.sendNotification(
                item.getUserId(),
                NotificationType.CERTIFICATE_READY,
                "Recycling Certificate Ready",
                "Your official recycling certificate " + certNum + " is ready for download.",
                "/certificates/" + saved.getId()
        );

        return saved;
    }

    public Map<String, Object> verifyCertificate(String certificateNumber) {
        Certificate cert = certificateRepository.findByCertificateNumber(certificateNumber)
                .orElseThrow(() -> new RuntimeException("Certificate not found with number: " + certificateNumber));

        String rawData = cert.getCertificateNumber() + ":" + cert.getEwasteId() + ":" +
                cert.getUserId() + ":" + cert.getRecyclerId() + ":" + cert.getWeightKg() + ":" +
                cert.getIssuedAt() + ":" + cert.getPreviousHash();
        String computedHash = HashUtility.generateSHA256(rawData);

        boolean matches = computedHash.equalsIgnoreCase(cert.getHash());

        Map<String, Object> result = new HashMap<>();
        result.put("certificateNumber", cert.getCertificateNumber());
        result.put("storedHash", cert.getHash());
        result.put("computedHash", computedHash);
        result.put("status", matches ? "MATCH" : "SUSPICIOUS");
        result.put("verified", matches);
        result.put("certificate", cert);

        if (!matches) {
            securityRuleEngine.flagTampering(cert.getCertificateNumber(), computedHash, cert.getHash());
        }

        return result;
    }

    public Certificate getCertificateById(String id) {
        return certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found: " + id));
    }

    public List<Certificate> getUserCertificates(String userId) {
        return certificateRepository.findByUserIdOrderByIssuedAtDesc(userId);
    }

    public byte[] generatePdf(String certificateId) {
        Certificate cert = getCertificateById(certificateId);
        String userName = userRepository.findById(cert.getUserId()).map(User::getFullName).orElse("Citizen");
        String recyclerName = recyclerRepository.findById(cert.getRecyclerId()).map(RecyclerCenter::getName).orElse("Recycler Center");
        return pdfCertificateGenerator.generateCertificatePdf(cert, userName, recyclerName);
    }
}
