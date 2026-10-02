package com.waste2worth.service;

import com.waste2worth.algorithm.RecyclerMatching;
import com.waste2worth.entity.RecyclerCenter;
import com.waste2worth.repository.RecyclerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecyclerMatchingService {

    private final RecyclerRepository recyclerRepository;
    private final RecyclerMatching recyclerMatching;

    public RecyclerMatchingService(
            RecyclerRepository recyclerRepository,
            RecyclerMatching recyclerMatching) {
        this.recyclerRepository = recyclerRepository;
        this.recyclerMatching = recyclerMatching;
    }

    public RecyclerMatching.RecyclerMatchResult matchRecycler(
            String category,
            double latitude,
            double longitude,
            double weightKg) {
        List<RecyclerCenter> allRecyclers = recyclerRepository.findAll();
        return recyclerMatching.findBestRecycler(allRecyclers, category, latitude, longitude, weightKg);
    }
}
