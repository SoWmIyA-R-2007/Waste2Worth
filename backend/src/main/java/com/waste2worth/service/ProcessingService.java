package com.waste2worth.service;

import com.waste2worth.entity.*;
import com.waste2worth.repository.EWasteRepository;
import com.waste2worth.repository.ProcessingRecordRepository;
import com.waste2worth.repository.RecoveredMaterialRepository;
import com.waste2worth.repository.RecyclerRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProcessingService {

    private final ProcessingRecordRepository processingRecordRepository;
    private final RecoveredMaterialRepository recoveredMaterialRepository;
    private final EWasteRepository eWasteRepository;
    private final RecyclerRepository recyclerRepository;
    private final InventoryService inventoryService;
    private final CertificateService certificateService;
    private final RewardService rewardService;
    private final LifecycleValidationService lifecycleValidationService;

    public ProcessingService(
            ProcessingRecordRepository processingRecordRepository,
            RecoveredMaterialRepository recoveredMaterialRepository,
            EWasteRepository eWasteRepository,
            RecyclerRepository recyclerRepository,
            InventoryService inventoryService,
            CertificateService certificateService,
            RewardService rewardService,
            LifecycleValidationService lifecycleValidationService) {
        this.processingRecordRepository = processingRecordRepository;
        this.recoveredMaterialRepository = recoveredMaterialRepository;
        this.eWasteRepository = eWasteRepository;
        this.recyclerRepository = recyclerRepository;
        this.inventoryService = inventoryService;
        this.certificateService = certificateService;
        this.rewardService = rewardService;
        this.lifecycleValidationService = lifecycleValidationService;
    }

    public ProcessingRecord startProcessing(
            String ewasteId,
            String recyclerId,
            double receivedWeightKg,
            Classification classification,
            ProcessingMethod processingMethod) {

        EWasteItem item = eWasteRepository.findById(ewasteId)
                .or(() -> eWasteRepository.findByWasteId(ewasteId))
                .orElseThrow(() -> new RuntimeException("E-Waste item not found: " + ewasteId));

        // Validate transition to PROCESSING
        lifecycleValidationService.validateTransition(item.getStatus(), LifecycleStatus.PROCESSING.name());

        item.setStatus(LifecycleStatus.PROCESSING.name());
        item.setUpdatedAt(LocalDateTime.now());
        eWasteRepository.save(item);

        // Add to facility inventory
        inventoryService.addOrUpdateInventory(recyclerId, item.getCategory(), 1, receivedWeightKg);

        ProcessingRecord record = ProcessingRecord.builder()
                .ewasteId(item.getId())
                .recyclerId(recyclerId)
                .receivedWeightKg(receivedWeightKg > 0 ? receivedWeightKg : item.getWeightKg())
                .classification(classification != null ? classification : Classification.RECYCLABLE)
                .processingMethod(processingMethod != null ? processingMethod : ProcessingMethod.MATERIAL_RECOVERY)
                .processingDate(LocalDateTime.now())
                .completed(false)
                .build();

        return processingRecordRepository.save(record);
    }

    public ProcessingRecord completeProcessing(String processingId, List<RecoveredMaterialEntry> recoveredList) {
        ProcessingRecord record = processingRecordRepository.findById(processingId)
                .orElseThrow(() -> new RuntimeException("Processing record not found: " + processingId));

        record.setCompleted(true);
        if (recoveredList != null && !recoveredList.isEmpty()) {
            record.setRecoveredMaterials(recoveredList);

            // Record recovered materials in collection & update recycler inventory
            RecyclerCenter recycler = recyclerRepository.findById(record.getRecyclerId()).orElse(null);
            Map<String, Double> inv = recycler != null && recycler.getRecoveredInventory() != null ?
                    recycler.getRecoveredInventory() : new HashMap<>();

            for (RecoveredMaterialEntry entry : recoveredList) {
                RecoveredMaterial mat = RecoveredMaterial.builder()
                        .processingId(record.getId())
                        .recyclerId(record.getRecyclerId())
                        .materialType(entry.getMaterialType())
                        .weightKg(entry.getWeightKg())
                        .estimatedValue(entry.getEstimatedValue())
                        .recoveredAt(LocalDateTime.now())
                        .build();
                recoveredMaterialRepository.save(mat);

                String key = entry.getMaterialType();
                double current = inv.getOrDefault(key, 0.0);
                inv.put(key, Math.round((current + entry.getWeightKg()) * 100.0) / 100.0);
            }

            if (recycler != null) {
                recycler.setRecoveredInventory(inv);
                recyclerRepository.save(recycler);
            }
        }

        ProcessingRecord savedRecord = processingRecordRepository.save(record);

        // Mark ewaste item as RECYCLED
        EWasteItem item = eWasteRepository.findById(record.getEwasteId()).orElse(null);
        if (item != null) {
            item.setStatus(LifecycleStatus.RECYCLED.name());
            item.setCompletedAt(LocalDateTime.now());
            item.setUpdatedAt(LocalDateTime.now());
            eWasteRepository.save(item);

            // Award EcoPoints transaction
            rewardService.awardPoints(
                    item.getUserId(),
                    item.getId(),
                    RewardType.RECYCLING,
                    item.getEcoPointsEarned(),
                    "Recycling completed for " + item.getCategory() + " (" + item.getWeightKg() + " KG)"
            );

            // Automatically issue tamper-evident certificate
            certificateService.generateCertificate(item.getId());
        }

        return savedRecord;
    }

    public ProcessingRecord getProcessingById(String id) {
        return processingRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Processing record not found: " + id));
    }

    public ProcessingRecord getProcessingByEwasteId(String ewasteId) {
        return processingRecordRepository.findByEwasteId(ewasteId).orElse(null);
    }

    public List<ProcessingRecord> getRecyclerProcessingRecords(String recyclerId) {
        return processingRecordRepository.findByRecyclerIdOrderByProcessingDateDesc(recyclerId);
    }
}
