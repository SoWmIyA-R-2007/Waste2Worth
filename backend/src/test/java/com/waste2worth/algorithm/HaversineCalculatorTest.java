package com.waste2worth.algorithm;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class HaversineCalculatorTest {

    @Test
    void testHaversineDistanceCalculation() {
        HaversineCalculator calc = new HaversineCalculator();
        // Distance between Chennai (13.0827, 80.2707) and nearby point (13.0400, 80.2300) is approx 6.4 km
        double distance = calc.calculateDistanceKm(13.0827, 80.2707, 13.0400, 80.2300);

        assertTrue(distance > 5.0 && distance < 8.0, "Expected distance around 6.4km, got: " + distance);
    }

    @Test
    void testSameCoordinatesReturnZeroDistance() {
        HaversineCalculator calc = new HaversineCalculator();
        double distance = calc.calculateDistanceKm(13.0827, 80.2707, 13.0827, 80.2707);

        assertEquals(0.0, distance, 0.001);
    }
}
