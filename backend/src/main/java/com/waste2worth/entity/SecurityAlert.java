package com.waste2worth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "security_alerts")
public class SecurityAlert {
    @Id
    private String id;

    @Indexed
    private String userId;

    @Indexed
    private String ewasteId;

    private String ruleCode; // FLAG_USER, REQUIRE_MANUAL_VERIFICATION, DUPLICATE_QR_SCAN, INVALID_LIFECYCLE, CERTIFICATE_TAMPERING
    private String severity; // LOW, MEDIUM, HIGH, CRITICAL
    private String message;

    @Indexed
    @Builder.Default
    private String status = "OPEN"; // OPEN, INVESTIGATING, RESOLVED, DISMISSED

    @Indexed
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime resolvedAt;
}
