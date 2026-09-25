package com.waste2worth.algorithm;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class ValuationEngine {

    // Base rates in INR per KG
    private static final Map<String, Double> BASE_RATES_PER_KG = new HashMap<>();
    
    // Condition multipliers
    private static final Map<String, Double> CONDITION_MULTIPLIERS = new HashMap<>();

    static {
        BASE_RATES_PER_KG.put("smartphones", 350.0);
        BASE_RATES_PER_KG.put("laptops", 420.0);
        BASE_RATES_PER_KG.put("desktops", 280.0);
        BASE_RATES_PER_KG.put("batteries", 180.0);
        BASE_RATES_PER_KG.put("appliances", 120.0);
        BASE_RATES_PER_KG.put("accessories", 80.0);

        CONDITION_MULTIPLIERS.put("working", 1.40);
        CONDITION_MULTIPLIERS.put("used", 1.00);
        CONDITION_MULTIPLIERS.put("broken", 0.65);
    }

    public double calculateEstimatedValue(String category, String condition, double weightKg, int quantity) {
        String catKey = category != null ? category.toLowerCase().trim() : "accessories";
        String condKey = condition != null ? condition.toLowerCase().trim() : "used";

        double ratePerKg = BASE_RATES_PER_KG.getOrDefault(catKey, 100.0);
        double multiplier = CONDITION_MULTIPLIERS.getOrDefault(condKey, 1.0);

        // Effective weight calculation
        double effectiveWeight = (weightKg > 0) ? weightKg : 1.0;
        int qty = Math.max(1, quantity);

        double totalValue = ratePerKg * effectiveWeight * multiplier * qty;
        
        // Return rounded to 2 decimal places
        return Math.round(totalValue * 100.0) / 100.0;
    }

    public int calculateEcoPoints(double weightKg, double estimatedValue) {
        // EcoPoint algorithm: 10 points per KG recycled + 1 point per 10 INR value
        int weightPoints = (int) Math.round(weightKg * 10.0);
        int valuePoints = (int) Math.round(estimatedValue / 10.0);
        return Math.max(10, weightPoints + valuePoints);
    }
}
