package com.waste2worth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "ewaste_items")
public class EWasteItem {
    @Id
    private String id;

    @Indexed(unique = true)
    private String wasteId; // Formatted tracking ID e.g., W2W-EW-1002

    @Indexed
    private String userId;
    private String userName;
    private String userPhone;

    @Indexed
    private String category; // LAPTOP, SMARTPHONE, etc.
    private String brand;
    private String model;
    private String condition; // WORKING, USED, BROKEN
    private int quantity;
    private double weightKg;

    private Map<String, String> specifications;

    private double estimatedValue;
    private int ecoPointsEarned;

    private String pickupAddress;
    private double pickupLatitude;
    private double pickupLongitude;
    private String preferredDate;
    private String preferredTimeSlot;

    @Indexed
    private String matchedRecyclerId;
    private String matchedRecyclerName;
    private double distanceKm;

    @Indexed
    @Builder.Default
    private String status = LifecycleStatus.REQUESTED.name();

    private String qrCodeData;
    private String sha256VerificationHash;

    @Indexed
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    private LocalDateTime completedAt;
}
