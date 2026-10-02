package com.waste2worth.controller;

import com.waste2worth.entity.Classification;
import com.waste2worth.entity.ProcessingMethod;
import com.waste2worth.entity.ProcessingRecord;
import com.waste2worth.entity.RecoveredMaterialEntry;
import com.waste2worth.service.ProcessingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/processing")
@CrossOrigin(origins = "*")
public class ProcessingController {

    private final ProcessingService processingService;

    public ProcessingController(ProcessingService processingService) {
        this.processingService = processingService;
    }

    @PostMapping({"", "/start"})
    public ResponseEntity<ProcessingRecord> startProcessing(@RequestBody Map<String, Object> body) {
        String ewasteId = (String) body.get("ewasteId");
        String recyclerId = (String) body.get("recyclerId");
        double weightKg = body.containsKey("receivedWeightKg") ?
                Double.parseDouble(body.get("receivedWeightKg").toString()) : 0.0;

        String classStr = (String) body.getOrDefault("classification", "RECYCLABLE");
        String methodStr = (String) body.getOrDefault("processingMethod", "MATERIAL_RECOVERY");

        Classification classification = Classification.valueOf(classStr.toUpperCase());
        ProcessingMethod method = ProcessingMethod.valueOf(methodStr.toUpperCase());

        return ResponseEntity.ok(processingService.startProcessing(ewasteId, recyclerId, weightKg, classification, method));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProcessingRecord> getProcessingById(@PathVariable String id) {
        return ResponseEntity.ok(processingService.getProcessingById(id));
    }

    @GetMapping("/ewaste/{ewasteId}")
    public ResponseEntity<ProcessingRecord> getByEwasteId(@PathVariable String ewasteId) {
        ProcessingRecord record = processingService.getProcessingByEwasteId(ewasteId);
        return record != null ? ResponseEntity.ok(record) : ResponseEntity.notFound().build();
    }

    @GetMapping("/recycler/{recyclerId}")
    public ResponseEntity<List<ProcessingRecord>> getRecyclerProcessing(@PathVariable String recyclerId) {
        return ResponseEntity.ok(processingService.getRecyclerProcessingRecords(recyclerId));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<ProcessingRecord> completeProcessing(
            @PathVariable String id,
            @RequestBody List<RecoveredMaterialEntry> recoveredMaterials) {
        return ResponseEntity.ok(processingService.completeProcessing(id, recoveredMaterials));
    }
}
