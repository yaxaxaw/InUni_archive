package com.inuni.backend.controller;

import com.inuni.backend.dto.AuthResponse;
import com.inuni.backend.dto.LoginRequest;
import com.inuni.backend.dto.RegisterRequest;
import com.inuni.backend.entity.User;
import com.inuni.backend.service.AuthService;
import com.inuni.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}

