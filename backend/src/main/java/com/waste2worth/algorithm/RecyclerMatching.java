package com.waste2worth.algorithm;

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

    public RecyclerMatchResult findBestRecycler(
            List<RecyclerCenter> allRecyclers,
            String category,
            double userLat,
            double userLon,
            double requiredCapacityKg) {

        if (allRecyclers == null || allRecyclers.isEmpty()) {
            return null;
        }

        return allRecyclers.stream()
                .filter(r -> r.isActive())
                .filter(r -> r.getAcceptedCategories() != null &&
                        r.getAcceptedCategories().stream().anyMatch(c -> c.equalsIgnoreCase(category)))
                .filter(r -> (r.getDailyCapacityKg() - r.getCurrentLoadKg()) >= requiredCapacityKg)
                .map(r -> {
                    double dist = haversineCalculator.calculateDistanceKm(
                            userLat, userLon, r.getLatitude(), r.getLongitude());
                    // Score combines proximity (lower dist = higher score) and efficiency
                    double distanceFactor = Math.max(0.1, dist);
                    double capacityHeadroom = (r.getDailyCapacityKg() - r.getCurrentLoadKg()) / r.getDailyCapacityKg();
                    double compositeScore = (100.0 / distanceFactor) * 0.6 + (r.getEfficiencyRating() * 0.3) + (capacityHeadroom * 10);
                    return new RecyclerMatchResult(r, Math.round(dist * 10.0) / 10.0, compositeScore);
                })
                .max(Comparator.comparingDouble(RecyclerMatchResult::getScore))
                .orElseGet(() -> {
                    // Fallback to nearest active recycler if none match capacity filters strictly
                    return allRecyclers.stream()
                            .filter(RecyclerCenter::isActive)
                            .map(r -> {
                                double dist = haversineCalculator.calculateDistanceKm(
                                        userLat, userLon, r.getLatitude(), r.getLongitude());
                                return new RecyclerMatchResult(r, Math.round(dist * 10.0) / 10.0, 50.0);
                            })
                            .min(Comparator.comparingDouble(RecyclerMatchResult::getDistanceKm))
                            .orElse(null);
                });
    }
}
