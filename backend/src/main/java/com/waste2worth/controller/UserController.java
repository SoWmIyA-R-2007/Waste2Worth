package com.waste2worth.controller;

import com.waste2worth.dto.UserDto;
import com.waste2worth.entity.EWasteItem;
import com.waste2worth.entity.Reward;
import com.waste2worth.entity.User;
import com.waste2worth.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<List<EWasteItem>> getUserHistory(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserHistory(id));
    }

    @GetMapping("/{id}/rewards")
    public ResponseEntity<List<Reward>> getUserRewards(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserRewards(id));
    }
}
