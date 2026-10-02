package com.waste2worth.service;

import com.waste2worth.dto.UserDto;
import com.waste2worth.entity.EWasteItem;
import com.waste2worth.entity.Reward;
import com.waste2worth.entity.User;
import com.waste2worth.repository.EWasteRepository;
import com.waste2worth.repository.RewardRepository;
import com.waste2worth.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final EWasteRepository eWasteRepository;
    private final RewardRepository rewardRepository;

    public UserService(
            UserRepository userRepository,
            EWasteRepository eWasteRepository,
            RewardRepository rewardRepository) {
        this.userRepository = userRepository;
        this.eWasteRepository = eWasteRepository;
        this.rewardRepository = rewardRepository;
    }

    public UserDto getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return UserDto.fromEntity(user);
    }

    public UserDto updateUser(String id, User updatedData) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (updatedData.getFullName() != null) {
            existing.setFullName(updatedData.getFullName());
            existing.setName(updatedData.getFullName());
        }
        if (updatedData.getPhone() != null) {
            existing.setPhone(updatedData.getPhone());
        }
        if (updatedData.getAddress() != null) {
            existing.setAddress(updatedData.getAddress());
        }
        if (updatedData.getCity() != null) {
            existing.setCity(updatedData.getCity());
        }
        if (updatedData.getLatitude() != 0.0) {
            existing.setLatitude(updatedData.getLatitude());
        }
        if (updatedData.getLongitude() != 0.0) {
            existing.setLongitude(updatedData.getLongitude());
        }
        existing.setUpdatedAt(LocalDateTime.now());

        User saved = userRepository.save(existing);
        return UserDto.fromEntity(saved);
    }

    public List<EWasteItem> getUserHistory(String userId) {
        return eWasteRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Reward> getUserRewards(String userId) {
        return rewardRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDto::fromEntity)
                .collect(Collectors.toList());
    }
}
