package com.waste2worth.config;

import com.waste2worth.entity.RecyclerCenter;
import com.waste2worth.repository.RecyclerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initRecyclers(RecyclerRepository recyclerRepository) {
        return args -> {
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
                        .acceptedCategories(Arrays.asList("smartphones", "laptops", "desktops", "accessories"))
                        .dailyCapacityKg(500.0)
                        .currentLoadKg(145.0)
                        .efficiencyRating(94.5)
                        .recoveredInventory(greenCycleInv)
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
                        .acceptedCategories(Arrays.asList("batteries", "appliances", "smartphones"))
                        .dailyCapacityKg(800.0)
                        .currentLoadKg(280.0)
                        .efficiencyRating(89.0)
                        .recoveredInventory(ecoTechInv)
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
                        .acceptedCategories(Arrays.asList("appliances", "desktops", "laptops"))
                        .dailyCapacityKg(1200.0)
                        .currentLoadKg(430.0)
                        .efficiencyRating(91.2)
                        .recoveredInventory(cleanEarthInv)
                        .active(true)
                        .build();

                recyclerRepository.saveAll(Arrays.asList(r1, r2, r3));
                System.out.println("✅ Seeded default recycler centers into MongoDB Atlas");
            }
        };
    }
}
