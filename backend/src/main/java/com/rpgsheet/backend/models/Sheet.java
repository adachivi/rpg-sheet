package com.rpgsheet.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data // Generate getters, setters, etc. automatically
public class Sheet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String characterName;
    String playerName;
    String concept;
    String sheetKey;

    // Attributes
    // Physical
    int strength;
    int dexterity;
    int stamina;
    // Social
    int charisma;
    int manipulation;
    int composure;
    //Mental
    int intelligence;
    int wits;
    int resolve;

}