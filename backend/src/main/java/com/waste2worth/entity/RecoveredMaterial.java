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
@Document(collection = "recovered_materials")
public class RecoveredMaterial {
    @Id
    private String id;

    @Indexed
    private String processingId;

    @Indexed
    private String recyclerId;

    @Indexed
    private String materialType; // COPPER, ALUMINIUM, STEEL, PLASTIC, GOLD, SILVER, PCB, GLASS, OTHER

    private double weightKg;
    private double estimatedValue;

    @Builder.Default
    private LocalDateTime recoveredAt = LocalDateTime.now();
}
