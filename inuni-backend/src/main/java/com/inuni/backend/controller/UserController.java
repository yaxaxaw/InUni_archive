package com.inuni.backend.controller;

import com.inuni.backend.dto.RegisterRequest;
import com.inuni.backend.dto.UserResponseDto;
import com.inuni.backend.entity.User;
import com.inuni.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public UserResponseDto getCurrentUser(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return new UserResponseDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
        );
    }

    @PostMapping
    public User createUser(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }
}

