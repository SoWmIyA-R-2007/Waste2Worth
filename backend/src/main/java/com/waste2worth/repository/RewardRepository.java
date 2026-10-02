package com.waste2worth.repository;

import com.waste2worth.entity.Reward;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RewardRepository extends MongoRepository<Reward, String> {
    List<Reward> findByUserIdOrderByCreatedAtDesc(String userId);
    List<Reward> findByEwasteId(String ewasteId);
}
