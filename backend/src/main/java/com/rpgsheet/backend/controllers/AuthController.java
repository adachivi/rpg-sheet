package com.rpgsheet.backend.controllers;

import com.rpgsheet.backend.models.User;
import com.rpgsheet.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService service;

    // Constructors

    public AuthController(UserService service) { // Dependency Injection
        this.service = service;
    }

    // Methods

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        try {
            User user = service.register(body.get("username"), body.get("password"));
            return ResponseEntity.ok(user);
        }
        catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        boolean success = service.login(body.get("username"), body.get("password"));
        if (success) {
            return ResponseEntity.ok("Login successful.");
        }
        else {
            return ResponseEntity.status(401).body("Invalid username or password.");
        }
    }

    // For testing
    @GetMapping("/users")
    public ResponseEntity<?> listUsers() {
        return ResponseEntity.ok(service.listUsers());
    }
}
