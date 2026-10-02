package com.waste2worth.repository;

import com.waste2worth.entity.RecoveredMaterial;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecoveredMaterialRepository extends MongoRepository<RecoveredMaterial, String> {
    List<RecoveredMaterial> findByRecyclerIdOrderByRecoveredAtDesc(String recyclerId);
    List<RecoveredMaterial> findByProcessingId(String processingId);
    List<RecoveredMaterial> findByMaterialType(String materialType);
}
