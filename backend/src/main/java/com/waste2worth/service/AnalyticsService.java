package com.waste2worth.service;

import com.waste2worth.entity.*;
import com.waste2worth.repository.*;
import org.springframework.stereotype.Service;

import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    private final UserRepository userRepository;
    private final EWasteRepository eWasteRepository;
    private final RecyclerRepository recyclerRepository;
    private final CertificateRepository certificateRepository;
    private final SecurityAlertRepository securityAlertRepository;

    public AnalyticsService(
            UserRepository userRepository,
            EWasteRepository eWasteRepository,
            RecyclerRepository recyclerRepository,
            CertificateRepository certificateRepository,
            SecurityAlertRepository securityAlertRepository) {
        this.userRepository = userRepository;
        this.eWasteRepository = eWasteRepository;
        this.recyclerRepository = recyclerRepository;
        this.certificateRepository = certificateRepository;
        this.securityAlertRepository = securityAlertRepository;
    }

    public Map<String, Object> getAdminDashboardData() {
        List<User> users = userRepository.findAll();
        List<EWasteItem> items = eWasteRepository.findAll();
        List<RecyclerCenter> recyclers = recyclerRepository.findAll();
        List<Certificate> certs = certificateRepository.findAll();
        List<SecurityAlert> alerts = securityAlertRepository.findAll();

        double totalWeightKg = items.stream().mapToDouble(EWasteItem::getWeightKg).sum();
        double totalValuation = items.stream().mapToDouble(EWasteItem::getEstimatedValue).sum();
        int totalEcoPoints = users.stream().mapToInt(User::getEcoPoints).sum();

        long pendingPickups = items.stream()
                .filter(i -> "REQUESTED".equalsIgnoreCase(i.getStatus()) || "SCHEDULED".equalsIgnoreCase(i.getStatus()) || "ASSIGNED".equalsIgnoreCase(i.getStatus()))
                .count();

        long completedRecyclings = items.stream()
                .filter(i -> "RECYCLED".equalsIgnoreCase(i.getStatus()) || "CERTIFIED".equalsIgnoreCase(i.getStatus()))
                .count();

        long openAlerts = alerts.stream()
                .filter(a -> "OPEN".equalsIgnoreCase(a.getStatus()))
                .count();

        Map<String, Object> kpis = new HashMap<>();
        kpis.put("totalUsers", users.size());
        kpis.put("totalEWasteItems", items.size());
        kpis.put("totalWeightKg", Math.round(totalWeightKg * 100.0) / 100.0);
        kpis.put("totalValuation", Math.round(totalValuation * 100.0) / 100.0);
        kpis.put("totalEcoPoints", totalEcoPoints);
        kpis.put("totalRecyclers", recyclers.size());
        kpis.put("pendingPickups", pendingPickups);
        kpis.put("completedRecyclings", completedRecyclings);
        kpis.put("verifiedCertificates", certs.size());
        kpis.put("openAlerts", openAlerts);
        kpis.put("totalAlerts", alerts.size());

        // Environmental Impact calculations
        // Conversion factors: 1 kg e-waste diverted ≈ 1.44 kg CO2 avoided, 0.90 kg landfill diverted
        Map<String, Object> envImpact = new HashMap<>();
        envImpact.put("co2AvoidedKg", Math.round(totalWeightKg * 1.44 * 10.0) / 10.0);
        envImpact.put("landfillDivertedKg", Math.round(totalWeightKg * 0.90 * 10.0) / 10.0);
        envImpact.put("treesEquivalent", Math.round(totalWeightKg * 0.05 * 10.0) / 10.0);

        Map<String, Object> response = new HashMap<>();
        response.put("kpis", kpis);
        response.put("environmentalImpact", envImpact);
        response.put("categoryDistribution", getCategoryBreakdown(items));
        response.put("monthlyGrowth", getMonthlyCollection(items));

        return response;
    }

    public List<Map<String, Object>> getCategoryBreakdown(List<EWasteItem> items) {
        Map<String, Long> counts = items.stream()
                .collect(Collectors.groupingBy(
                        i -> i.getCategory() != null ? i.getCategory().toUpperCase() : "OTHER",
                        Collectors.counting()
                ));

        List<Map<String, Object>> list = new ArrayList<>();
        String[] colors = {"#059669", "#0284c7", "#7c3aed", "#d97706", "#e11d48", "#10b981", "#6366f1"};
        int cIdx = 0;

        for (Map.Entry<String, Long> entry : counts.entrySet()) {
            Map<String, Object> m = new HashMap<>();
            m.put("name", entry.getKey());
            m.put("value", entry.getValue());
            m.put("color", colors[cIdx % colors.length]);
            list.add(m);
            cIdx++;
        }

        if (list.isEmpty()) {
            list.add(Map.of("name", "SMARTPHONE", "value", 12L, "color", "#059669"));
            list.add(Map.of("name", "LAPTOP", "value", 9L, "color", "#0284c7"));
            list.add(Map.of("name", "BATTERY", "value", 6L, "color", "#d97706"));
        }

        return list;
    }

    public List<Map<String, Object>> getMonthlyCollection(List<EWasteItem> items) {
        Map<String, Double> monthlyKg = new LinkedHashMap<>();

        // Group by month
        for (EWasteItem item : items) {
            if (item.getCreatedAt() != null) {
                String month = item.getCreatedAt().getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
                monthlyKg.put(month, monthlyKg.getOrDefault(month, 0.0) + item.getWeightKg());
            }
        }

        List<Map<String, Object>> chartData = new ArrayList<>();
        if (monthlyKg.isEmpty()) {
            chartData.add(Map.of("month", "Jun", "kg", 180.0));
            chartData.add(Map.of("month", "Jul", "kg", 320.0));
            chartData.add(Map.of("month", "Aug", "kg", 450.0));
            chartData.add(Map.of("month", "Sep", "kg", 680.0));
        } else {
            for (Map.Entry<String, Double> entry : monthlyKg.entrySet()) {
                Map<String, Object> m = new HashMap<>();
                m.put("month", entry.getKey());
                m.put("kg", Math.round(entry.getValue() * 10.0) / 10.0);
                chartData.add(m);
            }
        }

        return chartData;
    }
}
