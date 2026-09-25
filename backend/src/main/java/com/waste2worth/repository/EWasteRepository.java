package com.waste2worth.repository;

import com.waste2worth.entity.EWasteItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EWasteRepository extends MongoRepository<EWasteItem, String> {
    List<EWasteItem> findByUserIdOrderByCreatedAtDesc(String userId);
    List<EWasteItem> findByMatchedRecyclerIdOrderByCreatedAtDesc(String recyclerId);
    List<EWasteItem> findByStatus(String status);
    Optional<EWasteItem> findByWasteId(String wasteId);
}
