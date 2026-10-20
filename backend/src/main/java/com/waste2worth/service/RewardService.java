package com.waste2worth.service;

import com.waste2worth.entity.Reward;
import com.waste2worth.entity.RewardType;
import com.waste2worth.entity.User;
import com.waste2worth.repository.RewardRepository;
import com.waste2worth.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class RewardService {

    private final RewardRepository rewardRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public RewardService(
            RewardRepository rewardRepository,
            UserRepository userRepository,
            NotificationService notificationService) {
        this.rewardRepository = rewardRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    public Reward awardPoints(String userId, String ewasteId, RewardType type, int points, String description) {
        if (userId == null) return null;

        Reward reward = Reward.builder()
                .userId(userId)
                .ewasteId(ewasteId)
                .type(type)
                .points(points)
                .description(description)
                .createdAt(LocalDateTime.now())
                .build();

        Reward saved = rewardRepository.save(reward);

        // Update user points
        userRepository.findById(userId).ifPresent(u -> {
            u.setEcoPoints(u.getEcoPoints() + points);
            userRepository.save(u);
        });

        // Notify user
        notificationService.sendNotification(
                userId,
                com.waste2worth.entity.NotificationType.REWARD_EARNED,
                "EcoPoints Earned! +" + points,
                description,
                "/rewards"
        );

        return saved;
    }

    public List<Reward> getUserRewards(String userId) {
        return rewardRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Map<String, Object>> getLeaderboard() {
        List<User> users = userRepository.findAll();
        users.sort(Comparator.comparingInt(User::getEcoPoints).reversed());

        List<Map<String, Object>> leaderboard = new ArrayList<>();
        int rank = 1;

        for (User u : users) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("rank", rank++);
            entry.put("userId", u.getId());
            entry.put("name", u.getFullName());
            entry.put("email", u.getEmail());
            entry.put("ecoPoints", u.getEcoPoints());
            entry.put("wasteRecycledKg", Math.round(u.getTotalWasteRecycledKg() * 10.0) / 10.0);
            entry.put("level", calculateEcoLevel(u.getEcoPoints()));
            leaderboard.add(entry);
        }

        return leaderboard;
    }

    private String calculateEcoLevel(int points) {
        if (points >= 5000) return "Eco Hero";
        if (points >= 2500) return "Eco Champion";
        if (points >= 1000) return "Eco Guardian";
        if (points >= 300) return "Eco Contributor";
        return "Eco Starter";
    }
}
