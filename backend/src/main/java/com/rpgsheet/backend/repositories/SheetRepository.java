package com.rpgsheet.backend.repositories;

import com.rpgsheet.backend.models.Sheet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// Inherits from JpaRepository (gets findAll(), findById, save(), etc. from it)
public interface SheetRepository extends JpaRepository<Sheet, Long> {
    // Custom method for finding a sheet by its playerName and sheetKey values
    Optional<Sheet> findByPlayerNameAndSheetKey(String playerName, String sheetKey);
}