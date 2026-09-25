package com.waste2worth.repository;

import com.waste2worth.entity.RecyclerCenter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecyclerRepository extends MongoRepository<RecyclerCenter, String> {
    List<RecyclerCenter> findByActiveTrue();
}
