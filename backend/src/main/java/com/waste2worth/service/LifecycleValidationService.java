package com.waste2worth.service;

import com.waste2worth.entity.LifecycleStatus;
import org.springframework.stereotype.Service;

@Service
public class LifecycleValidationService {

    public boolean isValidTransition(String currentStatus, String targetStatus) {
        if (currentStatus == null || targetStatus == null) return false;

        LifecycleStatus from;
        LifecycleStatus to;

        try {
            from = LifecycleStatus.valueOf(currentStatus.toUpperCase().trim());
            to = LifecycleStatus.valueOf(targetStatus.toUpperCase().trim());
        } catch (IllegalArgumentException e) {
            return false;
        }

        return LifecycleStatus.isValidTransition(from, to);
    }

    public void validateTransition(String currentStatus, String targetStatus) {
        if (!isValidTransition(currentStatus, targetStatus)) {
            throw new IllegalStateException(
                    String.format("Invalid lifecycle transition from '%s' to '%s'. State machine violation.",
                            currentStatus, targetStatus)
            );
        }
    }
}
