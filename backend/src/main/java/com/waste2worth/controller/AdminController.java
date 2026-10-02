package com.waste2worth.controller;

import com.waste2worth.dto.UserDto;
import com.waste2worth.entity.EWasteItem;
import com.waste2worth.entity.RecyclerCenter;
import com.waste2worth.entity.SecurityAlert;
import com.waste2worth.repository.EWasteRepository;
import com.waste2worth.repository.RecyclerRepository;
import com.waste2worth.service.AnalyticsService;
import com.waste2worth.service.SecurityAlertService;
import com.waste2worth.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AnalyticsService analyticsService;
    private final UserService userService;
    private final EWasteRepository eWasteRepository;
    private final RecyclerRepository recyclerRepository;
    private final SecurityAlertService securityAlertService;

    public AdminController(
            AnalyticsService analyticsService,
            UserService userService,
            EWasteRepository eWasteRepository,
            RecyclerRepository recyclerRepository,
            SecurityAlertService securityAlertService) {
        this.analyticsService = analyticsService;
        this.userService = userService;
        this.eWasteRepository = eWasteRepository;
        this.recyclerRepository = recyclerRepository;
        this.securityAlertService = securityAlertService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardData() {
        return ResponseEntity.ok(analyticsService.getAdminDashboardData());
    }

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        return ResponseEntity.ok(analyticsService.getAdminDashboardData());
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/requests")
    public ResponseEntity<List<EWasteItem>> getRequests() {
        return ResponseEntity.ok(eWasteRepository.findAll());
    }

    @GetMapping("/recyclers")
    public ResponseEntity<List<RecyclerCenter>> getRecyclers() {
        return ResponseEntity.ok(recyclerRepository.findAll());
    }

    @GetMapping("/alerts")
    public ResponseEntity<List<SecurityAlert>> getAlerts() {
        return ResponseEntity.ok(securityAlertService.getAllAlerts());
    }

    @PutMapping("/alerts/{id}/resolve")
    public ResponseEntity<SecurityAlert> resolveAlert(@PathVariable String id) {
        return ResponseEntity.ok(securityAlertService.resolveAlert(id));
    }
}
