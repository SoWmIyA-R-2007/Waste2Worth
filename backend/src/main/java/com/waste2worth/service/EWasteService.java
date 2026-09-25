package com.waste2worth.service;

import com.waste2worth.algorithm.RecyclerMatching;
import com.waste2worth.algorithm.ValuationEngine;
import com.waste2worth.entity.EWasteItem;
import com.waste2worth.entity.RecyclerCenter;
import com.waste2worth.entity.User;
import com.waste2worth.repository.EWasteRepository;
import com.waste2worth.repository.RecyclerRepository;
import com.waste2worth.repository.UserRepository;
import com.waste2worth.utility.HashUtility;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class EWasteService {

    private final EWasteRepository eWasteRepository;
    private final RecyclerRepository recyclerRepository;
    private final UserRepository userRepository;
    private final ValuationEngine valuationEngine;
    private final RecyclerMatching recyclerMatching;

    public EWasteService(
            EWasteRepository eWasteRepository,
            RecyclerRepository recyclerRepository,
            UserRepository userRepository,
            ValuationEngine valuationEngine,
            RecyclerMatching recyclerMatching) {
        this.eWasteRepository = eWasteRepository;
        this.recyclerRepository = recyclerRepository;
        this.userRepository = userRepository;
        this.valuationEngine = valuationEngine;
        this.recyclerMatching = recyclerMatching;
    }

    public double calculateEstimate(String category, String condition, double weightKg, int quantity) {
        return valuationEngine.calculateEstimatedValue(category, condition, weightKg, quantity);
    }

    public EWasteItem submitWaste(EWasteItem item) {
        // Generate formatted waste ID
        int randomNum = 1000 + new Random().nextInt(9000);
        item.setWasteId("W2W-EW-" + randomNum);

        // 1. Calculate valuation & EcoPoints
        double estimatedVal = valuationEngine.calculateEstimatedValue(
                item.getCategory(), item.getCondition(), item.getWeightKg(), item.getQuantity());
        int points = valuationEngine.calculateEcoPoints(item.getWeightKg(), estimatedVal);
        item.setEstimatedValue(estimatedVal);
        item.setEcoPointsEarned(points);

        // 2. Algorithm-driven Recycler Matching
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

        // 3. QR code & SHA-256 integrity cryptographic hash
        String rawProof = item.getWasteId() + ":" + item.getUserId() + ":" + item.getCategory() + ":" + System.currentTimeMillis();
        String hash = HashUtility.generateSHA256(rawProof);
        item.setSha256VerificationHash(hash);
        item.setQrCodeData("https://waste2worth.org/verify/" + item.getWasteId() + "?hash=" + hash);

        item.setStatus("REQUESTED");
        item.setCreatedAt(LocalDateTime.now());

        EWasteItem saved = eWasteRepository.save(item);

        // Update user stats if userId exists
        if (item.getUserId() != null) {
            userRepository.findById(item.getUserId()).ifPresent(user -> {
                user.setEcoPoints(user.getEcoPoints() + points);
                user.setTotalWasteKg(user.getTotalWasteKg() + item.getWeightKg());
                userRepository.save(user);
            });
        }

        return saved;
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
        EWasteItem item = eWasteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("E-Waste item not found with id: " + id));
        item.setStatus(status);
        if ("RECYCLED".equalsIgnoreCase(status)) {
            item.setCompletedAt(LocalDateTime.now());
        }
        return eWasteRepository.save(item);
    }
}
