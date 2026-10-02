package com.waste2worth.algorithm;

import com.waste2worth.entity.PickupRequest;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class RouteOptimizerTest {

    @Test
    void testGreedyRouteOptimizationOrdersByProximity() {
        HaversineCalculator haversine = new HaversineCalculator();
        RouteOptimizer optimizer = new RouteOptimizer(haversine);

        double depotLat = 13.0827;
        double depotLon = 80.2707;

        PickupRequest p1 = PickupRequest.builder().id("p1").pickupLatitude(13.1500).pickupLongitude(80.2900).build(); // farther
        PickupRequest p2 = PickupRequest.builder().id("p2").pickupLatitude(13.0850).pickupLongitude(80.2720).build(); // very close

        List<PickupRequest> requests = Arrays.asList(p1, p2);
        RouteOptimizer.RouteOptimizationResult result = optimizer.optimizeRoute(depotLat, depotLon, requests);

        assertNotNull(result);
        assertEquals(2, result.getOrderedPickupIds().size());
        // p2 is closer to depot, so it must be visited first
        assertEquals("p2", result.getOrderedPickupIds().get(0));
        assertEquals("p1", result.getOrderedPickupIds().get(1));
        assertTrue(result.getTotalDistanceKm() > 0);
        assertTrue(result.getEstimatedDurationMinutes() > 0);
    }
}
