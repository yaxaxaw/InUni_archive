package com.inuni.backend.controller;

import com.inuni.backend.dto.RegisterRequest;
import com.inuni.backend.entity.User;
import com.inuni.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }
}