package com.waste2worth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "pickup_requests")
public class PickupRequest {
    @Id
    private String id;

    @Indexed
    private String ewasteId;

    @Indexed
    private String userId;

    @Indexed
    private String recyclerId;

    @Indexed
    private String collectorId;

    private String pickupAddress;
    private double pickupLatitude;
    private double pickupLongitude;

    @Indexed
    private String scheduledDate;
    private String scheduledTime;

    @Indexed
    @Builder.Default
    private String status = LifecycleStatus.REQUESTED.name();

    private double estimatedDistanceKm;

    @Builder.Default
    private List<StatusHistory> statusHistory = new ArrayList<>();

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
