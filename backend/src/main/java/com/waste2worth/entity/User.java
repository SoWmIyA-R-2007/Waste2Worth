package com.waste2worth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;

    private String name;
    private String fullName;

    @Indexed(unique = true)
    private String email;

    private String password;
    private String phone;

    @Builder.Default
    private String role = "USER"; // USER, RECYCLER, COLLECTOR, ADMIN

    @Builder.Default
    private Set<String> roles = new HashSet<>(); // ROLE_USER, ROLE_RECYCLER, etc.

    @Builder.Default
    private String status = "ACTIVE"; // ACTIVE, FLAGGED, SUSPENDED

    private Address address;

    // Backward-compatible address fields
    private String rawAddress;
    private String city;
    private String postalCode;
    private double latitude;
    private double longitude;

    @Builder.Default
    private int ecoPoints = 0;

    @Builder.Default
    private double totalWasteRecycledKg = 0.0;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Helper getters/setters for backward compatibility
    public String getName() {
        return name != null ? name : fullName;
    }

    public void setName(String name) {
        this.name = name;
        if (this.fullName == null) {
            this.fullName = name;
        }
    }

    public String getFullName() {
        return fullName != null ? fullName : name;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
        if (this.name == null) {
            this.name = fullName;
        }
    }

    public double getTotalWasteKg() {
        return totalWasteRecycledKg;
    }

    public void setTotalWasteKg(double totalWasteKg) {
        this.totalWasteRecycledKg = totalWasteKg;
    }
}
