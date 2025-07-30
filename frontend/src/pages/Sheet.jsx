import React, { useState, useId } from 'react';
import api from '../services/api';

const Sheet = () => {
    const submitSheet = () => {
        const id = useId();
        const characterName = document.getElementById("characterName").value;
        const playerName = document.getElementById("playerName").value;
        const concept = document.getElementById("concept").value;

        const strength = attributesValues.strength;
        const charisma = attributesValues.charisma;
        const intelligence = attributesValues.intelligence;
        const dexterity = attributesValues.dexterity;
        const manipulation = attributesValues.manipulation;
        const wits = attributesValues.wits;
        const stamina = attributesValues.stamina;
        const composure = attributesValues.composure;
        const resolve = attributesValues.resolve;

        let alphabeticalRegex = /[A-Za-z]/;
        if ((alphabeticalRegex.test(characterName) == true)
            && (alphabeticalRegex.test(playerName) == true)) {
          api.post('/sheet', {characterName, playerName, concept, strength, charisma, intelligence, dexterity, manipulation, wits, stamina, composure, resolve});
          alert("Sheet created successfully!");
        }
        else {
          alert("Can't create sheet: character name or player name is missing.");
        }
    };

    // Attribute's checkboxes values (React state)
    const [attributes, setAttributes] = useState({
      strength: [false, false, false, false, false],
      charisma: [false, false, false, false, false],
      intelligence: [false, false, false, false, false],
      dexterity: [false, false, false, false, false],
      manipulation: [false, false, false, false, false],
      wits: [false, false, false, false, false],
      stamina: [false, false, false, false, false],
      composure: [false, false, false, false, false],
      resolve: [false, false, false, false, false]
    });

    // Attribute's numerica values for the database (React state)
    const [attributesValues, setAttributesValues] = useState({
      strength: 0,
      charisma: 0,
      intelligence: 0,
      dexterity: 0,
      manipulation: 0,
      wits: 0,
      stamina: 0,
      composure: 0,
      resolve: 0
    });

    // Autofill the rest of the checkboxes of a attribute based on which one was marked
    // Also updates the attribute's numeric values to send it to the database
    const autofillCheckboxes = (attr, index) => {
      const updatedAttribute = [...attributes[attr]];
      var attrValue;
      for (let i = 0; i < 5; i++) {
        if (i < index) {
          updatedAttribute[i] = true;
        }
        else if (i == index) {
          if (index == 0 && updatedAttribute[0] == true && updatedAttribute[1] != true) {
            updatedAttribute[i] = false;
            attrValue = index;
          }
          else {
            updatedAttribute[i] = true;
            attrValue = index + 1;
          }
        }
        else {
          updatedAttribute[i] = false;
        }
      }

      setAttributes(prev => ({...prev, [attr]: updatedAttribute}));
      setAttributesValues(prev => ({...prev, [attr]: prev[attr] + attrValue}));
    }

    // View
    return (
      <div className="page-body">
        <h1>Create a new sheet</h1>

        {/* General info */}
        <table className="sheet-table">
          <thead>
            <tr>
              <th>Character</th>
              <th>Player</th>
              <th>Concept</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" id="characterName" name="characterName"></input></td>
              <td><input type="text" id="playerName" name="playerName"></input></td>
              <td><input type="text" id="concept" name="concept"></input></td>
            </tr>
          </tbody>
        </table>
        
        {/* Attributes */}
        <h3>Attributes</h3>
        <table className="sheet-table">
          <thead>
            <tr>
              <th>Physical</th>
              <th>Social</th>
              <th>Mental</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="attribute-td-content">
                  <p>Strength</p>
                  {attributes.strength.map((checked, index) => (
                    <input
                      key={index}
                      type="checkbox"
                      checked={checked}
                      onChange={() => autofillCheckboxes("strength", index)}
                    />
                  ))}
                </div>
              </td>
              <td>
                <div className="attribute-td-content">
                  <p>Charisma</p>
                  {attributes.charisma.map((checked, index) => (
                    <input
                      key={index}
                      type="checkbox"
                      checked={checked}
                      onChange={() => autofillCheckboxes("charisma", index)}
                    />
                  ))}
                </div>
              </td>
              <td>
                <div className="attribute-td-content">
                  <p>Intelligence</p>
                  {attributes.intelligence.map((checked, index) => (
                    <input
                      key={index}
                      type="checkbox"
                      checked={checked}
                      onChange={() => autofillCheckboxes("intelligence", index)}
                    />
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="attribute-td-content">
                  <p>Dexterity</p>
                  {attributes.dexterity.map((checked, index) => (
                    <input
                      key={index}
                      type="checkbox"
                      checked={checked}
                      onChange={() => autofillCheckboxes("dexterity", index)}
                    />
                  ))}
                </div>
              </td>
              <td>
                <div className="attribute-td-content">
                  <p>Manipulation</p>
                  {attributes.manipulation.map((checked, index) => (
                    <input
                      key={index}
                      type="checkbox"
                      checked={checked}
                      onChange={() => autofillCheckboxes("manipulation", index)}
                    />
                  ))}
                </div>
              </td>
              <td>
                <div className="attribute-td-content">
                  <p>Wits</p>
                  {attributes.wits.map((checked, index) => (
                    <input
                      key={index}
                      type="checkbox"
                      checked={checked}
                      onChange={() => autofillCheckboxes("wits", index)}
                    />
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="attribute-td-content">
                  <p>Stamina</p>
                  {attributes.stamina.map((checked, index) => (
                    <input
                      key={index}
                      type="checkbox"
                      checked={checked}
                      onChange={() => autofillCheckboxes("stamina", index)}
                    />
                  ))}
                </div>
              </td>
              <td>
                <div className="attribute-td-content">
                  <p>Composure</p>
                  {attributes.composure.map((checked, index) => (
                    <input
                      key={index}
                      type="checkbox"
                      checked={checked}
                      onChange={() => autofillCheckboxes("composure", index)}
                    />
                  ))}
                </div>
              </td>
              <td>
                <div className="attribute-td-content">
                  <p>Resolve</p>
                  {attributes.resolve.map((checked, index) => (
                    <input
                      key={index}
                      type="checkbox"
                      checked={checked}
                      onChange={() => autofillCheckboxes("resolve", index)}
                    />
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <button type="button" onClick={submitSheet}>Submit</button>
      
      </div>
    );
};

export default Sheet;