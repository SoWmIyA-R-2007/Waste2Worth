package com.waste2worth.controller;

import com.waste2worth.entity.Reward;
import com.waste2worth.service.RewardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rewards")
@CrossOrigin(origins = "*")
public class RewardController {

    private final RewardService rewardService;

    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reward>> getUserRewards(@PathVariable String userId) {
        return ResponseEntity.ok(rewardService.getUserRewards(userId));
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<Map<String, Object>>> getLeaderboard() {
        return ResponseEntity.ok(rewardService.getLeaderboard());
    }
}
