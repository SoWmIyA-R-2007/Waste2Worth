package com.waste2worth.repository;

import com.waste2worth.entity.SecurityAlert;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecurityAlertRepository extends MongoRepository<SecurityAlert, String> {
    List<SecurityAlert> findByStatusOrderByCreatedAtDesc(String status);
    List<SecurityAlert> findByUserIdOrderByCreatedAtDesc(String userId);
    List<SecurityAlert> findBySeverityOrderByCreatedAtDesc(String severity);
    List<SecurityAlert> findAllByOrderByCreatedAtDesc();
}
