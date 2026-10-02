package com.waste2worth.algorithm;

import com.waste2worth.entity.EWasteCategory;
import com.waste2worth.entity.RecyclerCenter;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class RecyclerMatching {

    private final HaversineCalculator haversineCalculator;

    public RecyclerMatching(HaversineCalculator haversineCalculator) {
        this.haversineCalculator = haversineCalculator;
    }

    public static class RecyclerMatchResult {
        private final RecyclerCenter recycler;
        private final double distanceKm;
        private final double score;

        public RecyclerMatchResult(RecyclerCenter recycler, double distanceKm, double score) {
            this.recycler = recycler;
            this.distanceKm = distanceKm;
            this.score = score;
        }

        public RecyclerCenter getRecycler() {
            return recycler;
        }

        public double getDistanceKm() {
            return distanceKm;
        }

        public double getScore() {
            return score;
        }
    }

    /**
     * Matches best recycler based on 4-factor scoring:
     * - Compatibility = 40%
     * - Capacity Headroom = 25%
     * - Distance Proximity = 25%
     * - Availability / Efficiency = 10%
     */
    public RecyclerMatchResult findBestRecycler(
            List<RecyclerCenter> allRecyclers,
            String category,
            double userLat,
            double userLon,
            double requiredCapacityKg) {

        if (allRecyclers == null || allRecyclers.isEmpty()) {
            return null;
        }

        EWasteCategory catEnum = EWasteCategory.fromString(category);
        String catName = catEnum.name();

        return allRecyclers.stream()
                .filter(RecyclerCenter::isActive)
                .map(r -> {
                    // 1. Compatibility check (40% weight -> max 40 points)
                    boolean categoryMatch = r.getAcceptedCategories() != null &&
                            r.getAcceptedCategories().stream().anyMatch(c ->
                                    c.equalsIgnoreCase(category) ||
                                    c.equalsIgnoreCase(catName) ||
                                    c.toUpperCase().contains(catName) ||
                                    catName.contains(c.toUpperCase()));
                    double compatibilityScore = categoryMatch ? 40.0 : 10.0;

                    // 2. Capacity headroom check (25% weight -> max 25 points)
                    double totalCap = Math.max(1.0, r.getCapacityKg());
                    double currentLoad = r.getCurrentLoadKg();
                    double availableCap = Math.max(0.0, totalCap - currentLoad);
                    double capacityRatio = Math.min(1.0, availableCap / totalCap);
                    double capacityScore = capacityRatio * 25.0;

                    // 3. Distance check using Haversine (25% weight -> max 25 points)
                    double distanceKm = haversineCalculator.calculateDistanceKm(
                            userLat, userLon, r.getLatitude(), r.getLongitude());
                    // 0 km = 25 pts, 25 km = 12.5 pts, 50+ km approaches ~2 pts
                    double distanceScore = (25.0 / (1.0 + (distanceKm / 10.0)));

                    // 4. Availability / Efficiency check (10% weight -> max 10 points)
                    double efficiency = r.getEfficiencyRating() > 0 ? r.getEfficiencyRating() : 85.0;
                    double availabilityScore = (efficiency / 100.0) * 10.0;

                    double totalScore = compatibilityScore + capacityScore + distanceScore + availabilityScore;

                    return new RecyclerMatchResult(r, Math.round(distanceKm * 10.0) / 10.0, Math.round(totalScore * 10.0) / 10.0);
                })
                .max(Comparator.comparingDouble(RecyclerMatchResult::getScore))
                .orElse(null);
    }
}
