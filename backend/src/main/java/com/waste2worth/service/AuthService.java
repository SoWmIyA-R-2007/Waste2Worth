package com.waste2worth.service;

import com.waste2worth.dto.AuthResponse;
import com.waste2worth.dto.LoginRequest;
import com.waste2worth.dto.RegisterRequest;
import com.waste2worth.dto.UserDto;
import com.waste2worth.entity.User;
import com.waste2worth.repository.UserRepository;
import com.waste2worth.security.JwtTokenProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email is already in use: " + req.getEmail());
        }

        String rawRole = req.getRole() != null && !req.getRole().isBlank() ? req.getRole().toUpperCase().trim() : "USER";
        if (rawRole.startsWith("ROLE_")) {
            rawRole = rawRole.substring(5);
        }

        Set<String> roles = new HashSet<>();
        roles.add("ROLE_" + rawRole);

        User user = User.builder()
                .fullName(req.getFullName())
                .name(req.getFullName())
                .email(req.getEmail().toLowerCase().trim())
                .password(passwordEncoder.encode(req.getPassword()))
                .phone(req.getPhone())
                .role(rawRole)
                .roles(roles)
                .status("ACTIVE")
                .address(req.getAddress())
                .city(req.getAddress() != null ? req.getAddress().getCity() : null)
                .latitude(req.getLatitude())
                .longitude(req.getLongitude())
                .ecoPoints(0)
                .totalWasteRecycledKg(0.0)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        User savedUser = userRepository.save(user);

        String token = tokenProvider.generateToken(
                savedUser.getId(),
                savedUser.getEmail(),
                new ArrayList<>(savedUser.getRoles())
        );

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(UserDto.fromEntity(savedUser))
                .build();
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        List<String> rolesList = user.getRoles() != null && !user.getRoles().isEmpty() ?
                new ArrayList<>(user.getRoles()) :
                List.of("ROLE_" + (user.getRole() != null ? user.getRole() : "USER"));

        String token = tokenProvider.generateToken(user.getId(), user.getEmail(), rolesList);

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(UserDto.fromEntity(user))
                .build();
    }

    public UserDto getCurrentUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + userId));
        return UserDto.fromEntity(user);
    }
}
