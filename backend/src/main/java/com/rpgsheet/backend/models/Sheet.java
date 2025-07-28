package com.rpgsheet.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data // Generate getters, setters, etc. automatically
public class Sheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String characterName;
    private String playerName;
    private String concept;

    // Attributes {
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
    // }
}