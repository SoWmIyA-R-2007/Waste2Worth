package com.waste2worth.repository;

import com.waste2worth.entity.ProcessingRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProcessingRecordRepository extends MongoRepository<ProcessingRecord, String> {
    Optional<ProcessingRecord> findByEwasteId(String ewasteId);
    List<ProcessingRecord> findByRecyclerIdOrderByProcessingDateDesc(String recyclerId);
    List<ProcessingRecord> findByCompleted(boolean completed);
}
