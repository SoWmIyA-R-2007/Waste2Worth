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
@Document(collection = "certificates")
public class Certificate {
    @Id
    private String id;

    @Indexed(unique = true)
    private String certificateNumber; // e.g., W2W-CERT-489102

    @Indexed
    private String ewasteId;

    @Indexed
    private String userId;

    @Indexed
    private String recyclerId;

    private String processingId;

    private String deviceCategory;
    private String deviceBrand;
    private String deviceModel;
    private double weightKg;
    private int ecoPointsEarned;

    @Builder.Default
    private String status = "ISSUED"; // ISSUED, REVOKED, VERIFIED

    // Tamper-evident cryptographic verification fields
    private String hash;         // SHA-256(certificateNumber + ewasteId + userId + recyclerId + weight + processingDate + previousHash)
    private String previousHash; // Chained hash of the previous certificate or genesis hash

    @Builder.Default
    private LocalDateTime issuedAt = LocalDateTime.now();
}
