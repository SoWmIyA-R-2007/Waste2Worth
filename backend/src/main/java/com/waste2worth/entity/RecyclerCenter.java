package com.waste2worth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "recycler_centers")
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

    private List<String> acceptedCategories; // e.g. ["smartphones", "laptops", "batteries", "appliances"]
    private double dailyCapacityKg;
    private double currentLoadKg;
    private double efficiencyRating; // 0 - 100%

    // Inventory of recovered raw materials: Gold (g), Copper (kg), Aluminium (kg), Plastic (kg), etc.
    private Map<String, Double> recoveredInventory;
    private boolean active;
}
