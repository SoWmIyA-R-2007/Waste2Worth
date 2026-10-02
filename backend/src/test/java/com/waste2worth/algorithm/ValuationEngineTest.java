package com.waste2worth.algorithm;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ValuationEngineTest {

    private ValuationEngine engine;

    @BeforeEach
    void setUp() {
        engine = new ValuationEngine();
    }

    @Test
    void testLaptopValuationWorkingCondition() {
        // Base rate for laptop is 420, working condition multiplier is 1.4
        // 420 * 2.0 * 1.4 * 1 = 1176.0
        double val = engine.calculateEstimatedValue("LAPTOP", "working", 2.0, 1);
        assertEquals(1176.0, val);
    }

    @Test
    void testSmartphoneValuationBrokenCondition() {
        // Base rate for smartphone is 350, broken multiplier is 0.65
        // 350 * 1.0 * 0.65 * 1 = 227.5
        double val = engine.calculateEstimatedValue("SMARTPHONE", "broken", 1.0, 1);
        assertEquals(227.5, val);
    }

    @Test
    void testEcoPointsCalculation() {
        // 10 pts per KG + 1 pt per 10 INR
        int points = engine.calculateEcoPoints(2.0, 1000.0);
        // (2 * 10) + (1000 / 10) = 20 + 100 = 120
        assertEquals(120, points);
    }
}
