package com.waste2worth.controller;

import com.waste2worth.entity.EWasteItem;
import com.waste2worth.service.EWasteService;
import com.waste2worth.service.ValuationService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ewaste")
@CrossOrigin(origins = "*")
public class EWasteController {

    private final EWasteService eWasteService;
    private final ValuationService valuationService;

    public EWasteController(EWasteService eWasteService, ValuationService valuationService) {
        this.eWasteService = eWasteService;
        this.valuationService = valuationService;
    }

    @GetMapping("/estimate")
    public ResponseEntity<Map<String, Object>> getEstimate(
            @RequestParam String category,
            @RequestParam(defaultValue = "used") String condition,
            @RequestParam(defaultValue = "1.0") double weightKg,
            @RequestParam(defaultValue = "1") int quantity) {

        return ResponseEntity.ok(valuationService.calculateEstimate(category, condition, weightKg, quantity));
    }

    @PostMapping("/estimate")
    public ResponseEntity<Map<String, Object>> postEstimate(@RequestBody Map<String, Object> req) {
        String category = (String) req.getOrDefault("category", "laptops");
        String condition = (String) req.getOrDefault("condition", "used");
        double weightKg = req.containsKey("weightKg") ? Double.parseDouble(req.get("weightKg").toString()) : 1.0;
        int quantity = req.containsKey("quantity") ? Integer.parseInt(req.get("quantity").toString()) : 1;

        return ResponseEntity.ok(valuationService.calculateEstimate(category, condition, weightKg, quantity));
    }

    @PostMapping({"", "/submit"})
    public ResponseEntity<EWasteItem> submitWaste(@Valid @RequestBody EWasteItem item) {
        EWasteItem created = eWasteService.submitWaste(item);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EWasteItem> getItemById(@PathVariable String id) {
        return ResponseEntity.ok(eWasteService.getItemById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EWasteItem>> getUserRequests(@PathVariable String userId) {
        return ResponseEntity.ok(eWasteService.getUserRequests(userId));
    }

    @GetMapping("/recycler/{recyclerId}")
    public ResponseEntity<List<EWasteItem>> getRecyclerPickups(@PathVariable String recyclerId) {
        return ResponseEntity.ok(eWasteService.getRecyclerPickups(recyclerId));
    }

    @GetMapping({"", "/all"})
    public ResponseEntity<List<EWasteItem>> getAllRequests() {
        return ResponseEntity.ok(eWasteService.getAllRequests());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<EWasteItem> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> statusUpdate) {
        String newStatus = statusUpdate.get("status");
        return ResponseEntity.ok(eWasteService.updateStatus(id, newStatus));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<EWasteItem> patchStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> statusUpdate) {
        String newStatus = statusUpdate.get("status");
        return ResponseEntity.ok(eWasteService.updateStatus(id, newStatus));
    }

    @GetMapping(value = "/{id}/qr", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getQRCode(@PathVariable String id) {
        return ResponseEntity.ok(eWasteService.getQRCode(id));
    }

    @GetMapping("/{id}/verify")
    public ResponseEntity<Map<String, Object>> getVerificationData(@PathVariable String id) {
        return ResponseEntity.ok(eWasteService.getVerificationData(id));
    }
}
