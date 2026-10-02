package com.waste2worth.service;

import com.waste2worth.entity.SecurityAlert;
import com.waste2worth.repository.SecurityAlertRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SecurityAlertService {

    private final SecurityAlertRepository securityAlertRepository;

    public SecurityAlertService(SecurityAlertRepository securityAlertRepository) {
        this.securityAlertRepository = securityAlertRepository;
    }

    public SecurityAlert createAlert(String userId, String ewasteId, String ruleCode, String severity, String message) {
        SecurityAlert alert = SecurityAlert.builder()
                .userId(userId)
                .ewasteId(ewasteId)
                .ruleCode(ruleCode)
                .severity(severity)
                .message(message)
                .status("OPEN")
                .createdAt(LocalDateTime.now())
                .build();

        return securityAlertRepository.save(alert);
    }

    public List<SecurityAlert> getAllAlerts() {
        return securityAlertRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<SecurityAlert> getOpenAlerts() {
        return securityAlertRepository.findByStatusOrderByCreatedAtDesc("OPEN");
    }

    public SecurityAlert resolveAlert(String id) {
        SecurityAlert alert = securityAlertRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alert not found: " + id));
        alert.setStatus("RESOLVED");
        alert.setResolvedAt(LocalDateTime.now());
        return securityAlertRepository.save(alert);
    }
}
