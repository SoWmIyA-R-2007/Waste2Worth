package com.waste2worth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "ewaste_items")
public class EWasteItem {
    @Id
    private String id;
    private String wasteId; // Formatted ID e.g., W2W-EW-1002

    private String userId;
    private String userName;
    private String userPhone;

    private String category; // laptop, smartphone, battery, appliance, etc.
    private String brand;
    private String model;
    private String condition; // working, used, broken
    private int quantity;
    private double weightKg;

    private double estimatedValue;
    private int ecoPointsEarned;

    private String pickupAddress;
    private double pickupLatitude;
    private double pickupLongitude;
    private String preferredDate;
    private String preferredTimeSlot;

    private String matchedRecyclerId;
    private String matchedRecyclerName;
    private double distanceKm;

    private String status; // REQUESTED, SCHEDULED, ASSIGNED, PICKED_UP, PROCESSING, RECYCLED, CANCELLED
    private String qrCodeData;
    private String sha256VerificationHash;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime completedAt;
}
