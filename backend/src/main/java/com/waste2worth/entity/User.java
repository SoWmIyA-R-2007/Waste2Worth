package com.waste2worth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    private String password;
    private String fullName;
    private String phone;
    private String address;
    private String city;
    private String postalCode;

    private double latitude;
    private double longitude;

    private Set<String> roles; // ROLE_USER, ROLE_RECYCLER, ROLE_ADMIN

    @Builder.Default
    private int ecoPoints = 0;

    @Builder.Default
    private double totalWasteKg = 0.0;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
