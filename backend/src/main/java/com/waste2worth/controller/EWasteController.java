package com.waste2worth.controller;

import com.waste2worth.entity.EWasteItem;
import com.waste2worth.service.EWasteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ewaste")
@CrossOrigin(origins = "*")
public class EWasteController {

    private final EWasteService eWasteService;

    public EWasteController(EWasteService eWasteService) {
        this.eWasteService = eWasteService;
    }

    @GetMapping("/estimate")
    public ResponseEntity<Map<String, Object>> getEstimate(
            @RequestParam String category,
            @RequestParam(defaultValue = "used") String condition,
            @RequestParam(defaultValue = "1.0") double weightKg,
            @RequestParam(defaultValue = "1") int quantity) {

        double estimatedValue = eWasteService.calculateEstimate(category, condition, weightKg, quantity);
        Map<String, Object> response = new HashMap<>();
        response.put("category", category);
        response.put("condition", condition);
        response.put("weightKg", weightKg);
        response.put("quantity", quantity);
        response.put("estimatedValue", estimatedValue);
        response.put("currency", "INR");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/submit")
    public ResponseEntity<EWasteItem> submitWaste(@RequestBody EWasteItem item) {
        EWasteItem created = eWasteService.submitWaste(item);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EWasteItem>> getUserRequests(@PathVariable String userId) {
        return ResponseEntity.ok(eWasteService.getUserRequests(userId));
    }

    @GetMapping("/recycler/{recyclerId}")
    public ResponseEntity<List<EWasteItem>> getRecyclerPickups(@PathVariable String recyclerId) {
        return ResponseEntity.ok(eWasteService.getRecyclerPickups(recyclerId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<EWasteItem>> getAllRequests() {
        return ResponseEntity.ok(eWasteService.getAllRequests());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<EWasteItem> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> statusUpdate) {
        String newStatus = statusUpdate.get("status");
        return ResponseEntity.ok(eWasteService.updateStatus(id, newStatus));
    }
}
