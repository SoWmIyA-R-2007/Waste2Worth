package com.waste2worth.controller;

import com.waste2worth.entity.RecyclerCenter;
import com.waste2worth.repository.RecyclerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recyclers")
@CrossOrigin(origins = "*")
public class RecyclerController {

    private final RecyclerRepository recyclerRepository;

    public RecyclerController(RecyclerRepository recyclerRepository) {
        this.recyclerRepository = recyclerRepository;
    }

    @GetMapping
    public ResponseEntity<List<RecyclerCenter>> getAllRecyclers() {
        return ResponseEntity.ok(recyclerRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecyclerCenter> getRecyclerById(@PathVariable String id) {
        return recyclerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
