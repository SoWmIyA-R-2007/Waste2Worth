package com.waste2worth.algorithm;

import com.waste2worth.entity.EWasteItem;
import com.waste2worth.entity.RuleCode;
import com.waste2worth.repository.EWasteRepository;
import com.waste2worth.service.SecurityAlertService;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class SecurityRuleEngine {

    private final SecurityAlertService alertService;
    private final EWasteRepository eWasteRepository;

    private static final double WEIGHT_THRESHOLD_KG = 100.0;
    private static final int MAX_REQUESTS_IN_10_MIN = 10;

    public SecurityRuleEngine(SecurityAlertService alertService, EWasteRepository eWasteRepository) {
        this.alertService = alertService;
        this.eWasteRepository = eWasteRepository;
    }

    /**
     * Rule 1: High submission velocity (> 10 requests in 10 minutes) -> FLAG_USER
     */
    public boolean checkVelocityRule(String userId) {
        if (userId == null) return false;
        LocalDateTime tenMinutesAgo = LocalDateTime.now().minusMinutes(10);
        List<EWasteItem> recent = eWasteRepository.findByUserIdOrderByCreatedAtDesc(userId);

        long recentCount = recent.stream()
                .filter(item -> item.getCreatedAt() != null && item.getCreatedAt().isAfter(tenMinutesAgo))
                .count();

        if (recentCount >= MAX_REQUESTS_IN_10_MIN) {
            alertService.createAlert(
                    userId,
                    null,
                    RuleCode.FLAG_USER.name(),
                    "HIGH",
                    String.format("User %s created %d e-waste requests within 10 minutes. Flagged for review.", userId, recentCount)
            );
            return true;
        }
        return false;
    }

    /**
     * Rule 2: Heavy weight submission (> 100 kg) -> REQUIRE_MANUAL_VERIFICATION
     */
    public boolean checkWeightRule(EWasteItem item) {
        if (item != null && item.getWeightKg() > WEIGHT_THRESHOLD_KG) {
            alertService.createAlert(
                    item.getUserId(),
                    item.getId(),
                    RuleCode.REQUIRE_MANUAL_VERIFICATION.name(),
                    "MEDIUM",
                    String.format("Item %s weight (%.1f kg) exceeds manual verification threshold (%.1f kg).",
                            item.getWasteId(), item.getWeightKg(), WEIGHT_THRESHOLD_KG)
            );
            return true;
        }
        return false;
    }

    /**
     * Rule 3: Duplicate QR scan at same lifecycle state -> DUPLICATE_QR_SCAN
     */
    public void flagDuplicateScan(String ewasteId, String currentStatus) {
        alertService.createAlert(
                null,
                ewasteId,
                RuleCode.DUPLICATE_QR_SCAN.name(),
                "MEDIUM",
                String.format("Duplicate QR scan attempt detected on item %s while already in state %s.", ewasteId, currentStatus)
        );
    }

    /**
     * Rule 4: Invalid lifecycle transition -> INVALID_LIFECYCLE
     */
    public void flagInvalidTransition(String ewasteId, String fromStatus, String toStatus) {
        alertService.createAlert(
                null,
                ewasteId,
                RuleCode.INVALID_LIFECYCLE.name(),
                "HIGH",
                String.format("Unauthorized state transition attempt from %s to %s for e-waste %s.", fromStatus, toStatus, ewasteId)
        );
    }

    /**
     * Rule 5: Certificate hash mismatch -> CERTIFICATE_TAMPERING
     */
    public void flagTampering(String certificateNumber, String computedHash, String storedHash) {
        alertService.createAlert(
                null,
                certificateNumber,
                RuleCode.CERTIFICATE_TAMPERING.name(),
                "CRITICAL",
                String.format("Tamper detected for certificate %s. Recomputed hash [%s] does not match stored hash [%s].",
                        certificateNumber, computedHash, storedHash)
        );
    }
}
