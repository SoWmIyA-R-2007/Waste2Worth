package com.waste2worth.service;

import com.waste2worth.algorithm.RouteOptimizer;
import com.waste2worth.entity.PickupRequest;
import com.waste2worth.entity.PickupRoute;
import com.waste2worth.entity.RecyclerCenter;
import com.waste2worth.repository.PickupRequestRepository;
import com.waste2worth.repository.PickupRouteRepository;
import com.waste2worth.repository.RecyclerRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RouteService {

    private final PickupRouteRepository pickupRouteRepository;
    private final PickupRequestRepository pickupRequestRepository;
    private final RecyclerRepository recyclerRepository;
    private final RouteOptimizer routeOptimizer;

    public RouteService(
            PickupRouteRepository pickupRouteRepository,
            PickupRequestRepository pickupRequestRepository,
            RecyclerRepository recyclerRepository,
            RouteOptimizer routeOptimizer) {
        this.pickupRouteRepository = pickupRouteRepository;
        this.pickupRequestRepository = pickupRequestRepository;
        this.recyclerRepository = recyclerRepository;
        this.routeOptimizer = routeOptimizer;
    }

    public PickupRoute generateOptimizedRoute(String recyclerId, String collectorId, String routeDate) {
        RecyclerCenter recycler = recyclerRepository.findById(recyclerId)
                .orElseThrow(() -> new RuntimeException("Recycler center not found: " + recyclerId));

        // Get pending pickup requests for this facility
        List<PickupRequest> pendingPickups = pickupRequestRepository.findByRecyclerIdOrderByCreatedAtDesc(recyclerId)
                .stream()
                .filter(p -> "SCHEDULED".equalsIgnoreCase(p.getStatus()) || "ASSIGNED".equalsIgnoreCase(p.getStatus()) || "REQUESTED".equalsIgnoreCase(p.getStatus()))
                .collect(Collectors.toList());

        RouteOptimizer.RouteOptimizationResult result = routeOptimizer.optimizeRoute(
                recycler.getLatitude(),
                recycler.getLongitude(),
                pendingPickups
        );

        PickupRoute route = PickupRoute.builder()
                .recyclerId(recyclerId)
                .collectorId(collectorId != null ? collectorId : "COL-DEFAULT")
                .routeDate(routeDate != null ? routeDate : LocalDateTime.now().toLocalDate().toString())
                .pickupIds(result.getOrderedPickupIds())
                .totalDistanceKm(result.getTotalDistanceKm())
                .estimatedDurationMinutes(result.getEstimatedDurationMinutes())
                .status("CREATED")
                .createdAt(LocalDateTime.now())
                .build();

        return pickupRouteRepository.save(route);
    }

    public PickupRoute getRouteById(String id) {
        return pickupRouteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pickup route not found: " + id));
    }

    public List<PickupRoute> getRecyclerRoutes(String recyclerId) {
        return pickupRouteRepository.findByRecyclerIdOrderByCreatedAtDesc(recyclerId);
    }

    public PickupRoute updateRouteStatus(String id, String status) {
        PickupRoute route = getRouteById(id);
        route.setStatus(status);
        return pickupRouteRepository.save(route);
    }
}
