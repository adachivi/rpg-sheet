// Sheet page -> see and edit (PUT) sheet's data
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import { handleCheckboxes, handleTextInputChange, initializeCheckboxes } from "../utils/Utils";

const Sheet = () => {
  // Sheet's state
  const [sheet, setSheet] = useState({
    id: null,
    characterName: "",
    playerName: "",
    concept: "",
    sheetKey: "",
    
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

  // Get URL parameters
  const [searchParams] = useSearchParams();
  const playerName = searchParams.get("playerName");
  const sheetKey = searchParams.get("sheetKey");

  // GET: Get sheet's data using URL parameters
  useEffect(() => {
    api.get(`/sheet?playerName=${playerName}&sheetKey=${sheetKey}`)
      .then(response => {
        setSheet(response.data);
      })
      .catch(error => {
        console.error("Error: Sheet's data not found:", error);
      });
  }, []);

  // PUT: Save sheet (submit it to the database)
  const [shouldSaveSheet, setShouldSaveSheet] = useState(false);
  useEffect(() => {
    if (shouldSaveSheet) {
      api.put(`/sheet?playerName=${playerName}&sheetKey=${sheetKey}`, sheet, {
        headers: {"Content-type": "application/json"}
      });
      setShouldSaveSheet(false);
    };
  }, [shouldSaveSheet]);

  // Attribute's checkboxes {
  // State
  const [attrCheckboxes, setAttrCheckboxes] = useState({
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

  // State initialization
  useEffect(() => {
    initializeCheckboxes("strength", sheet.strength, attrCheckboxes, setAttrCheckboxes);
    initializeCheckboxes("charisma", sheet.charisma, attrCheckboxes, setAttrCheckboxes);
    initializeCheckboxes("intelligence", sheet.intelligence, attrCheckboxes, setAttrCheckboxes);
    initializeCheckboxes("dexterity", sheet.dexterity, attrCheckboxes, setAttrCheckboxes);
    initializeCheckboxes("manipulation", sheet.manipulation, attrCheckboxes, setAttrCheckboxes);
    initializeCheckboxes("wits", sheet.wits, attrCheckboxes, setAttrCheckboxes);
    initializeCheckboxes("stamina", sheet.stamina, attrCheckboxes, setAttrCheckboxes);
    initializeCheckboxes("composure", sheet.composure, attrCheckboxes, setAttrCheckboxes);
    initializeCheckboxes("resolve", sheet.resolve, attrCheckboxes, setAttrCheckboxes);
  }, [sheet]);
  // } Attribute's checkboxes

  // Test (delete later)
  useEffect(() => {
    console.log("Sheet:", sheet);
  }, [sheet]);

  // View
  if (sheet.id == null) return (
    <p style={{ padding: '2rem' }}>Carregando...</p>
  );

  return (
    <div className="page-body">
      <div>
        {/* Sheet's access info */}
        <div>
          <div>Player: {sheet.playerName}</div>
          <div>Sheet key: {sheet.sheetKey}</div>
        </div>
        <button type="button" onClick={(event) => {
          event.preventDefault();
          setShouldSaveSheet(true);}}
        >Save</button>
      </div>

      {/* General info */}
      <table className="sheet-table">
        <thead>
          <tr>
            <th>Character</th>
            <th>Concept</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                value={sheet.characterName}
                onChange={(event) => handleTextInputChange("characterName", event, setSheet)}
              />
            </td>
            <td>
              <input
                type="text"
                value={sheet.concept}
                onChange={(event) => handleTextInputChange("concept", event, setSheet)}
              />
            </td>
          </tr>
        </tbody>
      </table>


      {/* Attributes */}
      <div>Attributes</div>
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
            <td> {/* Strength */}
              <div className="checkbox-td">
                Strength {attrCheckboxes.strength.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxes("strength", index, attrCheckboxes, setAttrCheckboxes, setSheet)} />
                ))}
              </div>
            </td>
            <td> {/* Charisma */}
              <div className="checkbox-td">
                Charisma {attrCheckboxes.charisma.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxes("charisma", index, attrCheckboxes, setAttrCheckboxes, setSheet)} />
                ))}
              </div>
            </td>
            <td> {/* Intelligence */}
              <div className="checkbox-td">
                Intelligence {attrCheckboxes.intelligence.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxes("intelligence", index, attrCheckboxes, setAttrCheckboxes, setSheet)} />
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <td> {/* Dexterity */}
              <div className="checkbox-td">
                Dexterity {attrCheckboxes.dexterity.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxes("dexterity", index, attrCheckboxes, setAttrCheckboxes, setSheet)} />
                ))}
              </div>
            </td>
            <td> {/* Manipulation */}
              <div className="checkbox-td">
                Manipulation {attrCheckboxes.manipulation.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxes("manipulation", index, attrCheckboxes, setAttrCheckboxes, setSheet)} />
                ))}
              </div>
            </td>
            <td> {/* Wits */}
              <div className="checkbox-td">
                Wits {attrCheckboxes.wits.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxes("wits", index, attrCheckboxes, setAttrCheckboxes, setSheet)} />
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <td> {/* Stamina */}
              <div className="checkbox-td">
                Stamina {attrCheckboxes.stamina.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxes("stamina", index, attrCheckboxes, setAttrCheckboxes, setSheet)} />
                ))}
              </div>
            </td>
            <td> {/* Composure */}
              <div className="checkbox-td">
                Composure {attrCheckboxes.composure.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxes("composure", index, attrCheckboxes, setAttrCheckboxes, setSheet)} />
                ))}
              </div>
            </td>
            <td> {/* Resolve */}
              <div className="checkbox-td">
                Resolve {attrCheckboxes.resolve.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxes("resolve", index, attrCheckboxes, setAttrCheckboxes, setSheet)} />
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Sheet;