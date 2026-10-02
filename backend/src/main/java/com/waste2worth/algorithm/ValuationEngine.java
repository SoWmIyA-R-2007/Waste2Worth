package com.waste2worth.algorithm;

import com.waste2worth.entity.EWasteCategory;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class ValuationEngine {

    // Base rates in INR per KG for all categories
    private static final Map<EWasteCategory, Double> BASE_RATES_PER_KG = new HashMap<>();

    // Condition multipliers
    private static final Map<String, Double> CONDITION_MULTIPLIERS = new HashMap<>();

    static {
        BASE_RATES_PER_KG.put(EWasteCategory.SMARTPHONE, 350.0);
        BASE_RATES_PER_KG.put(EWasteCategory.TABLET, 320.0);
        BASE_RATES_PER_KG.put(EWasteCategory.LAPTOP, 420.0);
        BASE_RATES_PER_KG.put(EWasteCategory.DESKTOP, 280.0);
        BASE_RATES_PER_KG.put(EWasteCategory.SMARTWATCH, 220.0);
        BASE_RATES_PER_KG.put(EWasteCategory.PRINTER, 150.0);
        BASE_RATES_PER_KG.put(EWasteCategory.ROUTER, 140.0);
        BASE_RATES_PER_KG.put(EWasteCategory.TELEVISION, 130.0);
        BASE_RATES_PER_KG.put(EWasteCategory.REFRIGERATOR, 110.0);
        BASE_RATES_PER_KG.put(EWasteCategory.WASHING_MACHINE, 100.0);
        BASE_RATES_PER_KG.put(EWasteCategory.MICROWAVE, 115.0);
        BASE_RATES_PER_KG.put(EWasteCategory.KEYBOARD, 90.0);
        BASE_RATES_PER_KG.put(EWasteCategory.MOUSE, 80.0);
        BASE_RATES_PER_KG.put(EWasteCategory.PCB, 480.0);
        BASE_RATES_PER_KG.put(EWasteCategory.RAM, 520.0);
        BASE_RATES_PER_KG.put(EWasteCategory.HARD_DISK, 260.0);
        BASE_RATES_PER_KG.put(EWasteCategory.SSD, 390.0);
        BASE_RATES_PER_KG.put(EWasteCategory.POWER_SUPPLY, 160.0);
        BASE_RATES_PER_KG.put(EWasteCategory.BATTERY, 190.0);
        BASE_RATES_PER_KG.put(EWasteCategory.CHARGER, 80.0);
        BASE_RATES_PER_KG.put(EWasteCategory.OTHER, 100.0);

        CONDITION_MULTIPLIERS.put("working", 1.40);
        CONDITION_MULTIPLIERS.put("used", 1.00);
        CONDITION_MULTIPLIERS.put("broken", 0.65);
    }

    public double calculateEstimatedValue(String category, String condition, double weightKg, int quantity) {
        EWasteCategory catEnum = EWasteCategory.fromString(category);
        String condKey = condition != null ? condition.toLowerCase().trim() : "used";

        double ratePerKg = BASE_RATES_PER_KG.getOrDefault(catEnum, 100.0);
        double multiplier = CONDITION_MULTIPLIERS.getOrDefault(condKey, 1.0);

        // Effective weight calculation: ensure positive values
        double effectiveWeight = (weightKg > 0) ? weightKg : 1.0;
        int qty = Math.max(1, quantity);

        double totalValue = ratePerKg * effectiveWeight * multiplier * qty;

        // Return rounded to 2 decimal places
        return Math.round(totalValue * 100.0) / 100.0;
    }

    public int calculateEcoPoints(double weightKg, double estimatedValue) {
        // EcoPoint algorithm: 10 points per KG recycled + 1 point per 10 INR value
        int weightPoints = (int) Math.round(Math.max(0.5, weightKg) * 10.0);
        int valuePoints = (int) Math.round(estimatedValue / 10.0);
        return Math.max(10, weightPoints + valuePoints);
    }
}
