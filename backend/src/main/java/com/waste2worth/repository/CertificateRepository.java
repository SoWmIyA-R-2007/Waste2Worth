package com.waste2worth.repository;

import com.waste2worth.entity.Certificate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepository extends MongoRepository<Certificate, String> {
    Optional<Certificate> findByCertificateNumber(String certificateNumber);
    Optional<Certificate> findByEwasteId(String ewasteId);
    List<Certificate> findByUserIdOrderByIssuedAtDesc(String userId);
    List<Certificate> findByRecyclerIdOrderByIssuedAtDesc(String recyclerId);
    Optional<Certificate> findTopByOrderByIssuedAtDesc();
}
