package com.waste2worth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "inventory")
public class Inventory {
    @Id
    private String id;

    @Indexed
    private String recyclerId;

    @Indexed
    private String category;

    @Builder.Default
    private int quantity = 0;

    @Builder.Default
    private double totalWeightKg = 0.0;

    @Builder.Default
    private String status = "AVAILABLE"; // AVAILABLE, IN_PROCESSING, RECYCLED

    @Builder.Default
    private LocalDateTime lastUpdated = LocalDateTime.now();
}
