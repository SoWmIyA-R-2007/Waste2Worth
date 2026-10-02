package com.waste2worth.controller;

import com.waste2worth.entity.PickupRoute;
import com.waste2worth.service.RouteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "*")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @PostMapping("/optimize")
    public ResponseEntity<PickupRoute> optimizeRoute(@RequestBody Map<String, String> body) {
        String recyclerId = body.get("recyclerId");
        String collectorId = body.getOrDefault("collectorId", "COL-01");
        String routeDate = body.get("routeDate");
        return ResponseEntity.ok(routeService.generateOptimizedRoute(recyclerId, collectorId, routeDate));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PickupRoute> getRouteById(@PathVariable String id) {
        return ResponseEntity.ok(routeService.getRouteById(id));
    }

    @GetMapping("/recycler/{recyclerId}")
    public ResponseEntity<List<PickupRoute>> getRecyclerRoutes(@PathVariable String recyclerId) {
        return ResponseEntity.ok(routeService.getRecyclerRoutes(recyclerId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<PickupRoute> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        String status = body.get("status");
        return ResponseEntity.ok(routeService.updateRouteStatus(id, status));
    }
}
