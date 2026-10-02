package com.waste2worth.service;

import com.waste2worth.entity.Inventory;
import com.waste2worth.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<Inventory> getRecyclerInventory(String recyclerId) {
        return inventoryRepository.findByRecyclerId(recyclerId);
    }

    public Inventory addOrUpdateInventory(String recyclerId, String category, int quantity, double weightKg) {
        Inventory inv = inventoryRepository.findByRecyclerIdAndCategory(recyclerId, category)
                .orElse(Inventory.builder()
                        .recyclerId(recyclerId)
                        .category(category)
                        .quantity(0)
                        .totalWeightKg(0.0)
                        .status("AVAILABLE")
                        .build());

        inv.setQuantity(inv.getQuantity() + quantity);
        inv.setTotalWeightKg(Math.round((inv.getTotalWeightKg() + weightKg) * 100.0) / 100.0);
        inv.setLastUpdated(LocalDateTime.now());

        return inventoryRepository.save(inv);
    }

    public Map<String, Object> getInventorySummary(String recyclerId) {
        List<Inventory> list = getRecyclerInventory(recyclerId);
        int totalItems = list.stream().mapToInt(Inventory::getQuantity).sum();
        double totalWeightKg = list.stream().mapToDouble(Inventory::getTotalWeightKg).sum();

        Map<String, Object> summary = new HashMap<>();
        summary.put("recyclerId", recyclerId);
        summary.put("totalItems", totalItems);
        summary.put("totalWeightKg", Math.round(totalWeightKg * 100.0) / 100.0);
        summary.put("items", list);
        return summary;
    }
}
