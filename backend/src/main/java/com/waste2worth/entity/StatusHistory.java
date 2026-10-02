package com.waste2worth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatusHistory {
    private String status;
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
    private String changedBy;
    private String notes;
}
