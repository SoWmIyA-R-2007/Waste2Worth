package com.waste2worth.algorithm;

import com.waste2worth.service.LifecycleValidationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class LifecycleValidationTest {

    private LifecycleValidationService validationService;

    @BeforeEach
    void setUp() {
        validationService = new LifecycleValidationService();
    }

    @Test
    void testValidProgression() {
        assertTrue(validationService.isValidTransition("REQUESTED", "ASSIGNED"));
        assertTrue(validationService.isValidTransition("ASSIGNED", "SCHEDULED"));
        assertTrue(validationService.isValidTransition("SCHEDULED", "COLLECTED"));
        assertTrue(validationService.isValidTransition("COLLECTED", "IN_TRANSIT"));
        assertTrue(validationService.isValidTransition("IN_TRANSIT", "RECEIVED"));
        assertTrue(validationService.isValidTransition("RECEIVED", "PROCESSING"));
        assertTrue(validationService.isValidTransition("PROCESSING", "RECYCLED"));
        assertTrue(validationService.isValidTransition("RECYCLED", "CERTIFIED"));
    }

    @Test
    void testInvalidTransitionsRejected() {
        // Skipping steps is disallowed
        assertFalse(validationService.isValidTransition("REQUESTED", "CERTIFIED"));
        assertFalse(validationService.isValidTransition("COLLECTED", "RECYCLED"));
        assertFalse(validationService.isValidTransition("CERTIFIED", "REQUESTED"));
    }

    @Test
    void testCancellationWindow() {
        // Can cancel in early stages
        assertTrue(validationService.isValidTransition("REQUESTED", "CANCELLED"));
        assertTrue(validationService.isValidTransition("SCHEDULED", "CANCELLED"));
        // Cannot cancel once processing or completed
        assertFalse(validationService.isValidTransition("PROCESSING", "CANCELLED"));
        assertFalse(validationService.isValidTransition("RECYCLED", "CANCELLED"));
    }
}
