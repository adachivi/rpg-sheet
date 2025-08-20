package com.rpgsheet.backend.repositories;

import com.rpgsheet.backend.models.Sheet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// Inherits from JpaRepository (gets findAll(), findById, save(), etc. from it)
public interface SheetRepository extends JpaRepository<Sheet, Long> {

    // Custom methods
    
    // Derived Query Methods (Spring Data JPA)
    Optional<Sheet> findByPlayerNameAndSheetKey(String playerName, String sheetKey);
    // (DEBUG)
    void deleteByPlayerNameAndSheetKey(String playerName, String sheetKey);

}