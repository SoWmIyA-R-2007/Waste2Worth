package com.waste2worth.service;

import com.waste2worth.entity.*;
import com.waste2worth.repository.EWasteRepository;
import com.waste2worth.repository.PickupRequestRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PickupService {

    private final PickupRequestRepository pickupRequestRepository;
    private final EWasteRepository eWasteRepository;
    private final LifecycleValidationService lifecycleValidationService;
    private final NotificationService notificationService;

    public PickupService(
            PickupRequestRepository pickupRequestRepository,
            EWasteRepository eWasteRepository,
            LifecycleValidationService lifecycleValidationService,
            NotificationService notificationService) {
        this.pickupRequestRepository = pickupRequestRepository;
        this.eWasteRepository = eWasteRepository;
        this.lifecycleValidationService = lifecycleValidationService;
        this.notificationService = notificationService;
    }

    public PickupRequest createPickupRequest(PickupRequest request) {
        if (request.getStatusHistory() == null) {
            request.setStatusHistory(new ArrayList<>());
        }

        StatusHistory initialHistory = StatusHistory.builder()
                .status(LifecycleStatus.REQUESTED.name())
                .timestamp(LocalDateTime.now())
                .changedBy(request.getUserId())
                .notes("Pickup request submitted")
                .build();
        request.getStatusHistory().add(initialHistory);
        request.setStatus(LifecycleStatus.REQUESTED.name());
        request.setCreatedAt(LocalDateTime.now());
        request.setUpdatedAt(LocalDateTime.now());

        PickupRequest saved = pickupRequestRepository.save(request);

        // Update corresponding e-waste item status if present
        if (request.getEwasteId() != null) {
            eWasteRepository.findById(request.getEwasteId()).ifPresent(item -> {
                item.setStatus(LifecycleStatus.REQUESTED.name());
                item.setUpdatedAt(LocalDateTime.now());
                eWasteRepository.save(item);
            });
        }

        notificationService.sendNotification(
                request.getUserId(),
                NotificationType.PICKUP_SCHEDULED,
                "Pickup Scheduled",
                "Your e-waste pickup request has been received and scheduled for " + request.getScheduledDate(),
                "/tracking/" + (request.getEwasteId() != null ? request.getEwasteId() : saved.getId())
        );

        return saved;
    }

    public PickupRequest getPickupById(String id) {
        return pickupRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pickup request not found: " + id));
    }

    public List<PickupRequest> getUserPickups(String userId) {
        return pickupRequestRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<PickupRequest> getRecyclerPickups(String recyclerId) {
        return pickupRequestRepository.findByRecyclerIdOrderByCreatedAtDesc(recyclerId);
    }

    public List<PickupRequest> getCollectorPickups(String collectorId) {
        return pickupRequestRepository.findByCollectorIdOrderByCreatedAtDesc(collectorId);
    }

    public PickupRequest updatePickupStatus(String pickupId, String newStatus, String changedBy, String notes) {
        PickupRequest pickup = getPickupById(pickupId);

        // Validate lifecycle transition
        lifecycleValidationService.validateTransition(pickup.getStatus(), newStatus);

        pickup.setStatus(newStatus);
        pickup.setUpdatedAt(LocalDateTime.now());

        if (pickup.getStatusHistory() == null) {
            pickup.setStatusHistory(new ArrayList<>());
        }

        StatusHistory history = StatusHistory.builder()
                .status(newStatus)
                .timestamp(LocalDateTime.now())
                .changedBy(changedBy != null ? changedBy : "SYSTEM")
                .notes(notes != null ? notes : "Status updated to " + newStatus)
                .build();
        pickup.getStatusHistory().add(history);

        PickupRequest saved = pickupRequestRepository.save(pickup);

        // Sync corresponding EWasteItem
        if (pickup.getEwasteId() != null) {
            eWasteRepository.findById(pickup.getEwasteId()).ifPresent(item -> {
                item.setStatus(newStatus);
                item.setUpdatedAt(LocalDateTime.now());
                if (LifecycleStatus.RECYCLED.name().equalsIgnoreCase(newStatus)) {
                    item.setCompletedAt(LocalDateTime.now());
                }
                eWasteRepository.save(item);
            });
        }

        // Notify citizen
        notificationService.sendNotification(
                pickup.getUserId(),
                NotificationType.STATUS_UPDATED,
                "Status Updated: " + newStatus,
                "Your pickup request status changed to " + newStatus,
                "/tracking/" + (pickup.getEwasteId() != null ? pickup.getEwasteId() : saved.getId())
        );

        return saved;
    }

    public PickupRequest assignCollector(String pickupId, String collectorId, String scheduledDate, String scheduledTime) {
        PickupRequest pickup = getPickupById(pickupId);
        pickup.setCollectorId(collectorId);
        if (scheduledDate != null) pickup.setScheduledDate(scheduledDate);
        if (scheduledTime != null) pickup.setScheduledTime(scheduledTime);

        return updatePickupStatus(pickupId, LifecycleStatus.SCHEDULED.name(), "RECYCLER", "Assigned to logistics collector " + collectorId);
    }
}
