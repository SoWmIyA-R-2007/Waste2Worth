package com.waste2worth.repository;

import com.waste2worth.entity.PickupRoute;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PickupRouteRepository extends MongoRepository<PickupRoute, String> {
    List<PickupRoute> findByRecyclerIdOrderByCreatedAtDesc(String recyclerId);
    List<PickupRoute> findByCollectorIdOrderByCreatedAtDesc(String collectorId);
    List<PickupRoute> findByRouteDate(String routeDate);
    List<PickupRoute> findByStatus(String status);
}
