package com.waste2worth.entity;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public enum LifecycleStatus {
    REQUESTED,
    ASSIGNED,
    SCHEDULED,
    COLLECTED,
    IN_TRANSIT,
    RECEIVED,
    PROCESSING,
    RECYCLED,
    CERTIFIED,
    CANCELLED;

    public static boolean isValidTransition(LifecycleStatus from, LifecycleStatus to) {
        if (from == null || to == null) return false;
        if (from == to) return true;
        if (to == CANCELLED) {
            // Can only cancel before processing starts
            return from == REQUESTED || from == ASSIGNED || from == SCHEDULED;
        }

        return switch (from) {
            case REQUESTED -> to == ASSIGNED || to == SCHEDULED;
            case ASSIGNED -> to == SCHEDULED || to == COLLECTED;
            case SCHEDULED -> to == COLLECTED;
            case COLLECTED -> to == IN_TRANSIT;
            case IN_TRANSIT -> to == RECEIVED;
            case RECEIVED -> to == PROCESSING;
            case PROCESSING -> to == RECYCLED;
            case RECYCLED -> to == CERTIFIED;
            case CERTIFIED, CANCELLED -> false;
        };
    }

    public static List<LifecycleStatus> getLifecycleOrder() {
        return Arrays.asList(
                REQUESTED,
                ASSIGNED,
                SCHEDULED,
                COLLECTED,
                IN_TRANSIT,
                RECEIVED,
                PROCESSING,
                RECYCLED,
                CERTIFIED
        );
    }
}
