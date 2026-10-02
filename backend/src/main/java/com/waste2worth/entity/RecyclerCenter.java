package com.waste2worth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "recyclers")
public class RecyclerCenter {
    @Id
    private String id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String city;

    private double latitude;
    private double longitude;

    // GeoJSON Point location for 2dsphere indexing
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoLocation location;

    private List<String> acceptedCategories; // e.g. ["LAPTOP", "SMARTPHONE", "BATTERY"]
    private double capacityKg;
    private double dailyCapacityKg;
    private double currentLoadKg;
    private double efficiencyRating; // 0 - 100%

    @Indexed
    @Builder.Default
    private boolean verified = true;

    @Indexed
    @Builder.Default
    private String status = "ACTIVE"; // ACTIVE, INACTIVE, AT_CAPACITY

    @Builder.Default
    private boolean active = true;

    // Inventory of recovered raw materials: Gold (g), Copper (kg), Aluminium (kg), Plastic (kg), etc.
    private Map<String, Double> recoveredInventory;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Helper methods for capacity
    public double getCapacityKg() {
        return capacityKg > 0 ? capacityKg : dailyCapacityKg;
    }

    public void setCapacityKg(double capacityKg) {
        this.capacityKg = capacityKg;
        this.dailyCapacityKg = capacityKg;
    }

    public double getDailyCapacityKg() {
        return dailyCapacityKg > 0 ? dailyCapacityKg : capacityKg;
    }

    public void setDailyCapacityKg(double dailyCapacityKg) {
        this.dailyCapacityKg = dailyCapacityKg;
        this.capacityKg = dailyCapacityKg;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GeoLocation {
        private String type = "Point";
        private double[] coordinates; // [longitude, latitude]

        public GeoLocation(double longitude, double latitude) {
            this.type = "Point";
            this.coordinates = new double[]{longitude, latitude};
        }
    }
}
