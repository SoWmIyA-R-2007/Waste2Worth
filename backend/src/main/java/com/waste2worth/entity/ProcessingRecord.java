package com.waste2worth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "processing_records")
public class ProcessingRecord {
    @Id
    private String id;

    @Indexed
    private String ewasteId;

    @Indexed
    private String recyclerId;

    private double receivedWeightKg;

    private Classification classification;
    private ProcessingMethod processingMethod;

    @Builder.Default
    private List<RecoveredMaterialEntry> recoveredMaterials = new ArrayList<>();

    @Builder.Default
    private LocalDateTime processingDate = LocalDateTime.now();

    @Builder.Default
    private boolean completed = false;
}
