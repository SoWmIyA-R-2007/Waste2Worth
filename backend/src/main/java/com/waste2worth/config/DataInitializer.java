package com.waste2worth.config;

import com.waste2worth.entity.Address;
import com.waste2worth.entity.RecyclerCenter;
import com.waste2worth.entity.User;
import com.waste2worth.repository.RecyclerRepository;
import com.waste2worth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.*;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(
            RecyclerRepository recyclerRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed Default Users
            if (userRepository.count() == 0) {
                User citizen = User.builder()
                        .name("Sowmiya R")
                        .fullName("Sowmiya R")
                        .email("sowmiya@w2w.org")
                        .password(passwordEncoder.encode("password123"))
                        .phone("+91 9876543210")
                        .role("USER")
                        .roles(Set.of("ROLE_USER"))
                        .status("ACTIVE")
                        .address(Address.builder()
                                .line1("Plot 14, Anna Nagar 2nd Avenue")
                                .city("Chennai")
                                .state("Tamil Nadu")
                                .pincode("600040")
                                .build())
                        .city("Chennai")
                        .latitude(13.0827)
                        .longitude(80.2707)
                        .ecoPoints(1850)
                        .totalWasteRecycledKg(28.4)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();

                User recyclerUser = User.builder()
                        .name("GreenCycle Facility Manager")
                        .fullName("GreenCycle Facility Manager")
                        .email("greencycle@w2w.org")
                        .password(passwordEncoder.encode("password123"))
                        .phone("+91 9876500001")
                        .role("RECYCLER")
                        .roles(Set.of("ROLE_RECYCLER"))
                        .status("ACTIVE")
                        .city("Chennai")
                        .ecoPoints(0)
                        .totalWasteRecycledKg(0.0)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();

                User admin = User.builder()
                        .name("Central Administrator")
                        .fullName("Central Administrator")
                        .email("admin@waste2worth.gov.in")
                        .password(passwordEncoder.encode("password123"))
                        .phone("+91 9876500099")
                        .role("ADMIN")
                        .roles(Set.of("ROLE_ADMIN"))
                        .status("ACTIVE")
                        .city("Chennai")
                        .ecoPoints(0)
                        .totalWasteRecycledKg(0.0)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();

                userRepository.saveAll(Arrays.asList(citizen, recyclerUser, admin));
                System.out.println("✅ Seeded default demo users (Citizen, Recycler, Admin) with BCrypt passwords.");
            }

            // Seed Default Recyclers
            if (recyclerRepository.count() == 0) {
                Map<String, Double> greenCycleInv = new HashMap<>();
                greenCycleInv.put("Gold (g)", 14.5);
                greenCycleInv.put("Copper (kg)", 280.0);
                greenCycleInv.put("Aluminium (kg)", 450.0);

                RecyclerCenter r1 = RecyclerCenter.builder()
                        .name("GreenCycle EcoHub")
                        .email("greencycle@w2w.org")
                        .phone("+91 9876543210")
                        .address("Plot 42, Tech Corridor Industrial Area")
                        .city("Chennai")
                        .latitude(13.0827)
                        .longitude(80.2707)
                        .location(new RecyclerCenter.GeoLocation(80.2707, 13.0827))
                        .acceptedCategories(Arrays.asList("LAPTOP", "SMARTPHONE", "DESKTOP", "TABLET", "BATTERY"))
                        .capacityKg(500.0)
                        .dailyCapacityKg(500.0)
                        .currentLoadKg(145.0)
                        .efficiencyRating(94.5)
                        .recoveredInventory(greenCycleInv)
                        .verified(true)
                        .status("ACTIVE")
                        .active(true)
                        .build();

                Map<String, Double> ecoTechInv = new HashMap<>();
                ecoTechInv.put("Lithium (kg)", 65.0);
                ecoTechInv.put("Cobalt (kg)", 22.0);
                ecoTechInv.put("Copper (kg)", 190.0);

                RecyclerCenter r2 = RecyclerCenter.builder()
                        .name("EcoTech Lithium & Battery Recyclers")
                        .email("ecotech@w2w.org")
                        .phone("+91 9845123456")
                        .address("Sector 9, Clean Energy Zone")
                        .city("Chennai")
                        .latitude(13.0400)
                        .longitude(80.2300)
                        .location(new RecyclerCenter.GeoLocation(80.2300, 13.0400))
                        .acceptedCategories(Arrays.asList("BATTERY", "CHARGER", "SMARTPHONE", "TABLET"))
                        .capacityKg(800.0)
                        .dailyCapacityKg(800.0)
                        .currentLoadKg(280.0)
                        .efficiencyRating(89.0)
                        .recoveredInventory(ecoTechInv)
                        .verified(true)
                        .status("ACTIVE")
                        .active(true)
                        .build();

                Map<String, Double> cleanEarthInv = new HashMap<>();
                cleanEarthInv.put("Ferrous Scrap (kg)", 850.0);
                cleanEarthInv.put("Plastic Regrind (kg)", 420.0);

                RecyclerCenter r3 = RecyclerCenter.builder()
                        .name("CleanEarth Heavy Electronics & Appliances")
                        .email("cleanearth@w2w.org")
                        .phone("+91 9712345678")
                        .address("Industrial Phase 2, Ring Road")
                        .city("Chennai")
                        .latitude(13.1200)
                        .longitude(80.2000)
                        .location(new RecyclerCenter.GeoLocation(80.2000, 13.1200))
                        .acceptedCategories(Arrays.asList("TELEVISION", "REFRIGERATOR", "WASHING_MACHINE", "MICROWAVE", "DESKTOP"))
                        .capacityKg(1200.0)
                        .dailyCapacityKg(1200.0)
                        .currentLoadKg(430.0)
                        .efficiencyRating(91.2)
                        .recoveredInventory(cleanEarthInv)
                        .verified(true)
                        .status("ACTIVE")
                        .active(true)
                        .build();

                recyclerRepository.saveAll(Arrays.asList(r1, r2, r3));
                System.out.println("✅ Seeded default recycler centers into MongoDB");
            }
        };
    }
}
