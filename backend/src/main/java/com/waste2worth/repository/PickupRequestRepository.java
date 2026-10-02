package com.waste2worth.repository;

import com.waste2worth.entity.PickupRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PickupRequestRepository extends MongoRepository<PickupRequest, String> {
    List<PickupRequest> findByUserIdOrderByCreatedAtDesc(String userId);
    List<PickupRequest> findByRecyclerIdOrderByCreatedAtDesc(String recyclerId);
    List<PickupRequest> findByCollectorIdOrderByCreatedAtDesc(String collectorId);
    List<PickupRequest> findByStatus(String status);
    List<PickupRequest> findByScheduledDate(String scheduledDate);
    Optional<PickupRequest> findByEwasteId(String ewasteId);
}
