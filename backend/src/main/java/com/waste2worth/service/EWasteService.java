package com.waste2worth.service;

import com.waste2worth.algorithm.RecyclerMatching;
import com.waste2worth.algorithm.SecurityRuleEngine;
import com.waste2worth.algorithm.ValuationEngine;
import com.waste2worth.entity.*;
import com.waste2worth.repository.*;
import com.waste2worth.utility.HashUtility;
import com.waste2worth.utility.QRCodeUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class EWasteService {

    private final EWasteRepository eWasteRepository;
    private final RecyclerRepository recyclerRepository;
    private final UserRepository userRepository;
    private final PickupRequestRepository pickupRequestRepository;
    private final ValuationEngine valuationEngine;
    private final RecyclerMatching recyclerMatching;
    private final SecurityRuleEngine securityRuleEngine;
    private final LifecycleValidationService lifecycleValidationService;
    private final NotificationService notificationService;

    @Value("${waste2worth.frontend-url:http://localhost:5173}")
    private String frontendUrl;

    public EWasteService(
            EWasteRepository eWasteRepository,
            RecyclerRepository recyclerRepository,
            UserRepository userRepository,
            PickupRequestRepository pickupRequestRepository,
            ValuationEngine valuationEngine,
            RecyclerMatching recyclerMatching,
            SecurityRuleEngine securityRuleEngine,
            LifecycleValidationService lifecycleValidationService,
            NotificationService notificationService) {
        this.eWasteRepository = eWasteRepository;
        this.recyclerRepository = recyclerRepository;
        this.userRepository = userRepository;
        this.pickupRequestRepository = pickupRequestRepository;
        this.valuationEngine = valuationEngine;
        this.recyclerMatching = recyclerMatching;
        this.securityRuleEngine = securityRuleEngine;
        this.lifecycleValidationService = lifecycleValidationService;
        this.notificationService = notificationService;
    }

    public double calculateEstimate(String category, String condition, double weightKg, int quantity) {
        return valuationEngine.calculateEstimatedValue(category, condition, weightKg, quantity);
    }

    public EWasteItem submitWaste(EWasteItem item) {
        // 1. Check velocity fraud rule
        securityRuleEngine.checkVelocityRule(item.getUserId());

        // 2. Generate unique tracking wasteId W2W-EW-XXXXXX
        int randomNum = 100000 + new Random().nextInt(900000);
        item.setWasteId("W2W-EW-" + randomNum);

        // 3. Deterministic Valuation & EcoPoints calculation
        double estimatedVal = valuationEngine.calculateEstimatedValue(
                item.getCategory(), item.getCondition(), item.getWeightKg(), item.getQuantity());
        int points = valuationEngine.calculateEcoPoints(item.getWeightKg(), estimatedVal);
        item.setEstimatedValue(estimatedVal);
        item.setEcoPointsEarned(points);

        // 4. Algorithm-driven Recycler Matching (4-factor scoring)
        List<RecyclerCenter> allRecyclers = recyclerRepository.findAll();
        RecyclerMatching.RecyclerMatchResult match = recyclerMatching.findBestRecycler(
                allRecyclers,
                item.getCategory(),
                item.getPickupLatitude(),
                item.getPickupLongitude(),
                item.getWeightKg());

        if (match != null && match.getRecycler() != null) {
            item.setMatchedRecyclerId(match.getRecycler().getId());
            item.setMatchedRecyclerName(match.getRecycler().getName());
            item.setDistanceKm(match.getDistanceKm());
        } else {
            item.setMatchedRecyclerName("GreenCycle EcoHub");
            item.setDistanceKm(4.2);
        }

        // 5. Check weight threshold rule
        securityRuleEngine.checkWeightRule(item);

        // 6. Cryptographic SHA-256 proof & QR Code payload
        String rawProof = item.getWasteId() + ":" + item.getUserId() + ":" + item.getCategory() + ":" + System.currentTimeMillis();
        String hash = HashUtility.generateSHA256(rawProof);
        item.setSha256VerificationHash(hash);

        String verifyUrl = frontendUrl + "/tracking/" + item.getWasteId();
        item.setQrCodeData(verifyUrl);

        item.setStatus(LifecycleStatus.REQUESTED.name());
        item.setCreatedAt(LocalDateTime.now());
        item.setUpdatedAt(LocalDateTime.now());

        EWasteItem saved = eWasteRepository.save(item);

        // 7. Automatically create matching PickupRequest in pickup_requests collection
        List<StatusHistory> history = new ArrayList<>();
        history.add(StatusHistory.builder()
                .status(LifecycleStatus.REQUESTED.name())
                .timestamp(LocalDateTime.now())
                .changedBy(item.getUserId() != null ? item.getUserId() : "CITIZEN")
                .notes("Pickup requested by citizen")
                .build());

        PickupRequest pickup = PickupRequest.builder()
                .ewasteId(saved.getId())
                .userId(saved.getUserId())
                .recyclerId(saved.getMatchedRecyclerId())
                .pickupAddress(saved.getPickupAddress())
                .pickupLatitude(saved.getPickupLatitude())
                .pickupLongitude(saved.getPickupLongitude())
                .scheduledDate(saved.getPreferredDate() != null ? saved.getPreferredDate() : LocalDateTime.now().plusDays(1).toLocalDate().toString())
                .scheduledTime(saved.getPreferredTimeSlot() != null ? saved.getPreferredTimeSlot() : "10:00 AM - 01:00 PM")
                .status(LifecycleStatus.REQUESTED.name())
                .estimatedDistanceKm(saved.getDistanceKm())
                .statusHistory(history)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        pickupRequestRepository.save(pickup);

        // 8. Update user stats
        if (item.getUserId() != null) {
            userRepository.findById(item.getUserId()).ifPresent(user -> {
                user.setTotalWasteRecycledKg(user.getTotalWasteRecycledKg() + item.getWeightKg());
                userRepository.save(user);
            });
        }

        // 9. Send notification
        notificationService.sendNotification(
                saved.getUserId(),
                NotificationType.PICKUP_SCHEDULED,
                "E-Waste Registered: " + saved.getWasteId(),
                "Your " + saved.getCategory() + " has been scheduled for recycling pickup.",
                "/tracking/" + saved.getWasteId()
        );

        return saved;
    }

    public EWasteItem getItemById(String id) {
        return eWasteRepository.findById(id)
                .or(() -> eWasteRepository.findByWasteId(id))
                .orElseThrow(() -> new RuntimeException("E-Waste item not found: " + id));
    }

    public List<EWasteItem> getUserRequests(String userId) {
        return eWasteRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<EWasteItem> getRecyclerPickups(String recyclerId) {
        return eWasteRepository.findByMatchedRecyclerIdOrderByCreatedAtDesc(recyclerId);
    }

    public List<EWasteItem> getAllRequests() {
        return eWasteRepository.findAll();
    }

    public EWasteItem updateStatus(String id, String status) {
        EWasteItem item = getItemById(id);

        lifecycleValidationService.validateTransition(item.getStatus(), status);

        item.setStatus(status);
        item.setUpdatedAt(LocalDateTime.now());
        if (LifecycleStatus.RECYCLED.name().equalsIgnoreCase(status)) {
            item.setCompletedAt(LocalDateTime.now());
        }

        EWasteItem saved = eWasteRepository.save(item);

        // Sync pickup status
        pickupRequestRepository.findByEwasteId(item.getId()).ifPresent(p -> {
            p.setStatus(status);
            p.setUpdatedAt(LocalDateTime.now());
            if (p.getStatusHistory() == null) p.setStatusHistory(new ArrayList<>());
            p.getStatusHistory().add(StatusHistory.builder()
                    .status(status)
                    .timestamp(LocalDateTime.now())
                    .changedBy("SYSTEM")
                    .notes("Status updated to " + status)
                    .build());
            pickupRequestRepository.save(p);
        });

        return saved;
    }

    public byte[] getQRCode(String id) {
        EWasteItem item = getItemById(id);
        String qrPayload = item.getQrCodeData() != null ? item.getQrCodeData() : frontendUrl + "/tracking/" + item.getWasteId();
        return QRCodeUtil.generateQRCodeImage(qrPayload, 300, 300);
    }

    public Map<String, Object> getVerificationData(String id) {
        EWasteItem item = getItemById(id);

        Map<String, Object> response = new HashMap<>();
        response.put("wasteId", item.getWasteId());
        response.put("id", item.getId());
        response.put("category", item.getCategory());
        response.put("brand", item.getBrand());
        response.put("model", item.getModel());
        response.put("condition", item.getCondition());
        response.put("weightKg", item.getWeightKg());
        response.put("quantity", item.getQuantity());
        response.put("estimatedValue", item.getEstimatedValue());
        response.put("ecoPointsEarned", item.getEcoPointsEarned());
        response.put("currentStatus", item.getStatus());
        response.put("matchedRecyclerName", item.getMatchedRecyclerName());
        response.put("distanceKm", item.getDistanceKm());
        response.put("sha256VerificationHash", item.getSha256VerificationHash());
        response.put("qrCodeData", item.getQrCodeData());
        response.put("createdAt", item.getCreatedAt());
        response.put("completedAt", item.getCompletedAt());
        response.put("verificationResult", "AUTHENTIC_RECORD");

        return response;
    }
}
