package com.waste2worth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecoveredMaterialEntry {
    private String materialType; // COPPER, ALUMINIUM, STEEL, PLASTIC, GOLD, SILVER, etc.
    private double weightKg;
    private double estimatedValue;
}
