package com.waste2worth.controller;

import com.waste2worth.entity.PickupRequest;
import com.waste2worth.service.PickupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pickups")
@CrossOrigin(origins = "*")
public class PickupController {

    private final PickupService pickupService;

    public PickupController(PickupService pickupService) {
        this.pickupService = pickupService;
    }

    @PostMapping
    public ResponseEntity<PickupRequest> createPickup(@RequestBody PickupRequest request) {
        return ResponseEntity.ok(pickupService.createPickupRequest(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PickupRequest> getPickupById(@PathVariable String id) {
        return ResponseEntity.ok(pickupService.getPickupById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PickupRequest>> getUserPickups(@PathVariable String userId) {
        return ResponseEntity.ok(pickupService.getUserPickups(userId));
    }

    @GetMapping("/recycler/{recyclerId}")
    public ResponseEntity<List<PickupRequest>> getRecyclerPickups(@PathVariable String recyclerId) {
        return ResponseEntity.ok(pickupService.getRecyclerPickups(recyclerId));
    }

    @GetMapping("/collector/{collectorId}")
    public ResponseEntity<List<PickupRequest>> getCollectorPickups(@PathVariable String collectorId) {
        return ResponseEntity.ok(pickupService.getCollectorPickups(collectorId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<PickupRequest> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        String status = body.get("status");
        String changedBy = body.getOrDefault("changedBy", "RECYCLER");
        String notes = body.getOrDefault("notes", "Status updated");
        return ResponseEntity.ok(pickupService.updatePickupStatus(id, status, changedBy, notes));
    }

    @PostMapping("/{id}/assign")
    public ResponseEntity<PickupRequest> assignCollector(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        String collectorId = body.get("collectorId");
        String date = body.get("scheduledDate");
        String time = body.get("scheduledTime");
        return ResponseEntity.ok(pickupService.assignCollector(id, collectorId, date, time));
    }
}
