// Service component (business logic) of User model

package com.rpgsheet.backend.services;

import com.rpgsheet.backend.models.User;
import com.rpgsheet.backend.repositories.UserRepository;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UserService {

    private final UserRepository repository;

    // Constructors

    public UserService(UserRepository repository) { // Dependency Injection
        this.repository = repository;
    }

    // Methods

    public User register(String username, String password) {
        User newUser = new User(username, password);
        try {
            return repository.save(newUser);
        }
        // Deal with repeated username/email violation
        catch (DataIntegrityViolationException e) {
            throw new RuntimeException("This email is already in use.");
        }
    }

    public boolean login(String username, String password) {
        return repository.findByUsername(username)
                 .map(user -> user.getPassword().equals(password))
                 .orElse(false);
    }

    // For testing
    public List<User> listUsers() {
        return repository.findAll();
    }

}
