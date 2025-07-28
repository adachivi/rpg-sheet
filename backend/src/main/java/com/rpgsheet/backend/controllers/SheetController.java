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
    // GET: Homepage
    @GetMapping(value = "/home")
    public List<Sheet> getHome() {
        return repository.findAll();
    }

    // GET: Get a sheet by its id
    @GetMapping(value = "/sheet/{id}")
    public Sheet getSheet(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Sheet id can't be null."));
    }

    // POST: Create a new sheet
    @PostMapping(value = "/sheet")
    public Sheet createSheet(@RequestBody Sheet newSheet) {
        return repository.save(newSheet);
    }

    // PUT: Edit a sheet
    @PutMapping("/sheet/{id}")
    public Sheet editSheet(@PathVariable Long id, @RequestBody Sheet editedSheet) {
        return repository.findById(id)
            .map(sheet -> {
                sheet.setCharacterName(editedSheet.getCharacterName());
                sheet.setPlayerName(editedSheet.getPlayerName());
                sheet.setConcept(editedSheet.getConcept());
                sheet.setStrength(editedSheet.getStrength());
                sheet.setDexterity(editedSheet.getDexterity());
                sheet.setStamina(editedSheet.getStamina());
                sheet.setCharisma(editedSheet.getCharisma());
                sheet.setManipulation(editedSheet.getManipulation());
                sheet.setComposure(editedSheet.getComposure());
                sheet.setIntelligence(editedSheet.getIntelligence());
                sheet.setWits(editedSheet.getWits());
                sheet.setResolve(editedSheet.getResolve());
                
                return repository.save(sheet);
            })
            .orElseThrow(() -> new RuntimeException("Sheet not found."));
    }
    // DELETE: Delete a sheet
    @DeleteMapping("/sheet/{id}")
    public void deleteSheet(@PathVariable Long id) {
        repository.deleteById(id);
    }
    // } CRUD

    // Business rules
}