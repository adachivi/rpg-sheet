package com.rpgsheet.backend.repositories;

import com.rpgsheet.backend.models.Sheet;
import org.springframework.data.jpa.repository.JpaRepository;

// Inherits from JpaRepository (gets findAll(), findById, save(), etc. from it)
public interface SheetRepository extends JpaRepository<Sheet, Long> {}