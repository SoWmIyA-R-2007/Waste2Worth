package com.waste2worth.service;

import com.waste2worth.algorithm.ValuationEngine;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ValuationService {

    private final ValuationEngine valuationEngine;

    public ValuationService(ValuationEngine valuationEngine) {
        this.valuationEngine = valuationEngine;
    }

    public Map<String, Object> calculateEstimate(String category, String condition, double weightKg, int quantity) {
        double estimatedValue = valuationEngine.calculateEstimatedValue(category, condition, weightKg, quantity);
        int ecoPoints = valuationEngine.calculateEcoPoints(weightKg, estimatedValue);

        Map<String, Object> result = new HashMap<>();
        result.put("category", category);
        result.put("condition", condition);
        result.put("weightKg", weightKg);
        result.put("quantity", quantity);
        result.put("estimatedValue", estimatedValue);
        result.put("ecoPoints", ecoPoints);
        result.put("currency", "INR");
        return result;
    }
}
