package com.rpgsheet.backend.repositories;

import com.rpgsheet.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// Inherits from JpaRepository (gets findAll(), findById, save(), etc. from it)
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom methods

    // Derived Query Methods (Spring Data JPA)
    Optional<User> findByUsername(String username);

}
