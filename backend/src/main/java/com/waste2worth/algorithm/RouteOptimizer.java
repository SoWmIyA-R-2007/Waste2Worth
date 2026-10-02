package com.waste2worth.algorithm;

import com.waste2worth.entity.PickupRequest;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RouteOptimizer {

    private final HaversineCalculator haversineCalculator;

    public RouteOptimizer(HaversineCalculator haversineCalculator) {
        this.haversineCalculator = haversineCalculator;
    }

    public static class RouteOptimizationResult {
        private final List<String> orderedPickupIds;
        private final double totalDistanceKm;
        private final int estimatedDurationMinutes;

        public RouteOptimizationResult(List<String> orderedPickupIds, double totalDistanceKm, int estimatedDurationMinutes) {
            this.orderedPickupIds = orderedPickupIds;
            this.totalDistanceKm = totalDistanceKm;
            this.estimatedDurationMinutes = estimatedDurationMinutes;
        }

        public List<String> getOrderedPickupIds() {
            return orderedPickupIds;
        }

        public double getTotalDistanceKm() {
            return totalDistanceKm;
        }

        public int getEstimatedDurationMinutes() {
            return estimatedDurationMinutes;
        }
    }

    /**
     * Nearest Neighbor / Greedy Route Optimization Algorithm
     * Departs from recycler facility, visits nearest unvisited stops successively, and returns to facility.
     */
    public RouteOptimizationResult optimizeRoute(
            double depotLat,
            double depotLon,
            List<PickupRequest> pendingPickups) {

        if (pendingPickups == null || pendingPickups.isEmpty()) {
            return new RouteOptimizationResult(new ArrayList<>(), 0.0, 0);
        }

        List<PickupRequest> unvisited = new ArrayList<>(pendingPickups);
        List<String> orderedPickupIds = new ArrayList<>();

        double currentLat = depotLat;
        double currentLon = depotLon;
        double totalDistanceKm = 0.0;

        while (!unvisited.isEmpty()) {
            PickupRequest nearest = null;
            double shortestDist = Double.MAX_VALUE;

            for (PickupRequest p : unvisited) {
                double dist = haversineCalculator.calculateDistanceKm(
                        currentLat, currentLon, p.getPickupLatitude(), p.getPickupLongitude());
                if (dist < shortestDist) {
                    shortestDist = dist;
                    nearest = p;
                }
            }

            if (nearest != null) {
                unvisited.remove(nearest);
                orderedPickupIds.add(nearest.getId());
                totalDistanceKm += shortestDist;
                currentLat = nearest.getPickupLatitude();
                currentLon = nearest.getPickupLongitude();
            }
        }

        // Return from last pickup back to depot
        double returnToDepotDist = haversineCalculator.calculateDistanceKm(
                currentLat, currentLon, depotLat, depotLon);
        totalDistanceKm += returnToDepotDist;

        // Estimated transit speed ~25 km/h + 10 mins stop time per pickup
        int transitMinutes = (int) Math.round((totalDistanceKm / 25.0) * 60.0);
        int stopMinutes = orderedPickupIds.size() * 10;
        int totalMinutes = transitMinutes + stopMinutes;

        return new RouteOptimizationResult(
                orderedPickupIds,
                Math.round(totalDistanceKm * 100.0) / 100.0,
                Math.max(15, totalMinutes)
        );
    }
}
