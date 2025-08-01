package com.rpgsheet.backend.controllers;

import java.util.List;

import com.rpgsheet.backend.models.Sheet;
import com.rpgsheet.backend.repositories.SheetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class SheetController {
    @Autowired
    private SheetRepository repository;

    // CRUD {
    // GET: Homepage (APAGAR)
    @GetMapping(value = "/home")
    public List<Sheet> getHome() {
        return repository.findAll();
    }

    // POST: Create a new sheet
    @PostMapping(value = "/sheet")
    public Sheet createSheet(@RequestBody Sheet newSheet) {
        return repository.save(newSheet);
    }

    // GET: Get a sheet by its playerName and sheetKey values
    @GetMapping(value = "/sheet")
    public Sheet accessSheet(
        @RequestParam String playerName,
        @RequestParam String sheetKey
    ) {
        return repository.findByPlayerNameAndSheetKey(playerName, sheetKey)
            .orElseThrow(() -> new RuntimeException("Sheet not found."));
    }

    // PUT: Save sheet in the database
    @PutMapping(value = "/sheet")
    public Sheet saveSheet(
        @RequestParam String playerName,
        @RequestParam String sheetKey,
        @RequestBody Sheet sheetToSave
    ) {
        return repository.findByPlayerNameAndSheetKey(playerName, sheetKey)
            .map((databaseSheet) -> {
                databaseSheet.setCharacterName(sheetToSave.getCharacterName());
                databaseSheet.setConcept(sheetToSave.getConcept());
                databaseSheet.setStrength(sheetToSave.getStrength());
                databaseSheet.setCharisma(sheetToSave.getCharisma());
                databaseSheet.setIntelligence(sheetToSave.getIntelligence());
                databaseSheet.setDexterity(sheetToSave.getDexterity());
                databaseSheet.setManipulation(sheetToSave.getManipulation());
                databaseSheet.setWits(sheetToSave.getWits());
                databaseSheet.setStamina(sheetToSave.getStamina());
                databaseSheet.setComposure(sheetToSave.getComposure());
                databaseSheet.setResolve(sheetToSave.getResolve());

                return repository.save(databaseSheet);
            })
            .orElseThrow(() -> new RuntimeException("Sheet coudn't be saved in the database: no equivalent sheet found there."));
    }

    // DELETE: Delete a sheet
    @DeleteMapping("/sheet/{id}")
    public void deleteSheet(@PathVariable Long id) {
        repository.deleteById(id);
    }
    // } CRUD
}