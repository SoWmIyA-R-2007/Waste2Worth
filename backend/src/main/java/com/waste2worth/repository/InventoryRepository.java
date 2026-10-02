package com.waste2worth.repository;

import com.waste2worth.entity.Inventory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends MongoRepository<Inventory, String> {
    List<Inventory> findByRecyclerId(String recyclerId);
    Optional<Inventory> findByRecyclerIdAndCategory(String recyclerId, String category);
}
