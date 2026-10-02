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
@Document(collection = "pickup_routes")
public class PickupRoute {
    @Id
    private String id;

    @Indexed
    private String recyclerId;

    @Indexed
    private String collectorId;

    @Builder.Default
    private List<String> pickupIds = new ArrayList<>();

    private double totalDistanceKm;
    private int estimatedDurationMinutes;

    @Indexed
    private String routeDate;

    @Indexed
    @Builder.Default
    private String status = "CREATED"; // CREATED, IN_PROGRESS, COMPLETED

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
