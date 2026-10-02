package com.waste2worth.dto;

import com.waste2worth.entity.Address;
import com.waste2worth.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String id;
    private String fullName;
    private String email;
    private String phone;
    private String role;
    private Set<String> roles;
    private String status;
    private Address address;
    private String city;
    private double latitude;
    private double longitude;
    private int ecoPoints;
    private double totalWasteRecycledKg;
    private LocalDateTime createdAt;

    public static UserDto fromEntity(User user) {
        if (user == null) return null;
        return UserDto.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .roles(user.getRoles())
                .status(user.getStatus())
                .address(user.getAddress())
                .city(user.getCity())
                .latitude(user.getLatitude())
                .longitude(user.getLongitude())
                .ecoPoints(user.getEcoPoints())
                .totalWasteRecycledKg(user.getTotalWasteRecycledKg())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
