// Sheet page -> see (GET), edit (PUT) or delete (DEL) sheet

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import { handleCheckboxClick, handleCheckboxes, handleTextInputChange } from "../utils/Utils";
import "../styles/sheet.css"

const Sheet = () => {

  // Sheet
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

  // Get URL parameters (used in all CRUD methods below)
  const [searchParams] = useSearchParams();
  const playerName = searchParams.get("playerName");
  const sheetKey = searchParams.get("sheetKey");

  // GET: Get sheet
  useEffect(() => {

    api.get(`/sheet?playerName=${playerName}&sheetKey=${sheetKey}`)
      .then(response => {
        setSheet(response.data);
      })
      .catch(error => {
        console.error("Error: Sheet's data not found:", error);
      });

  }, []);

  // PUT: Save sheet
  const [shouldSaveSheet, setShouldSaveSheet] = useState(false);
  useEffect(() => {

    if (shouldSaveSheet) {
      api.put(`/sheet?playerName=${playerName}&sheetKey=${sheetKey}`, sheet, {
        headers: {"Content-type": "application/json"}
      });
      setShouldSaveSheet(false);
    };

  }, [shouldSaveSheet]);

  // DEL: Delete sheet (DEBUG)
  const [shouldDeleteSheet, setShouldDeleteSheet] = useState(false);
  useEffect(() => {

    if (shouldDeleteSheet) {
      api.delete(`/sheet?playerName=${playerName}&sheetKey=${sheetKey}`);
      setShouldDeleteSheet(false);
    };

  }, [shouldDeleteSheet]);

  // Attribute's checkboxes
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

  // Update checkboxes
  useEffect(() => {

    handleCheckboxes("strength", sheet.strength, attrCheckboxes, setAttrCheckboxes);
    handleCheckboxes("charisma", sheet.charisma, attrCheckboxes, setAttrCheckboxes);
    handleCheckboxes("intelligence", sheet.intelligence, attrCheckboxes, setAttrCheckboxes);
    handleCheckboxes("dexterity", sheet.dexterity, attrCheckboxes, setAttrCheckboxes);
    handleCheckboxes("manipulation", sheet.manipulation, attrCheckboxes, setAttrCheckboxes);
    handleCheckboxes("wits", sheet.wits, attrCheckboxes, setAttrCheckboxes);
    handleCheckboxes("stamina", sheet.stamina, attrCheckboxes, setAttrCheckboxes);
    handleCheckboxes("composure", sheet.composure, attrCheckboxes, setAttrCheckboxes);
    handleCheckboxes("resolve", sheet.resolve, attrCheckboxes, setAttrCheckboxes);

  }, [sheet]);

  // (For testing)
  useEffect(() => {

    console.log("Sheet:", sheet);

  }, [sheet]);

  // View
  if (sheet.id == null) return (
    <p style={{ padding: "2rem" }}>Loading...</p>
  );

  return (
    <div className="sheet-main">
      {/* Save button (PUT) */}
      <div className="save-button-div">
        <button type="button" onClick={(event) => {
          event.preventDefault();
          setShouldSaveSheet(true);}}
        >Save</button>
      </div>

      {/* General info */}
      <table id="general-info-table" className="sheet-table">
        <thead>
          <tr>
            <th>Character</th>
            <th>Player</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                className="text-input-td"
                type="text"
                value={sheet.characterName}
                onChange={(event) => handleTextInputChange("characterName", event, setSheet)}
              />
            </td>
            <td>
              <input
                className="text-input-td"
                type="text"
                value={sheet.playerName}
                onChange={(event) => handleTextInputChange("playerName", event, setSheet)}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table className="sheet-table">
        <thead>
          <tr><th>Concept</th></tr>
        </thead>
        <tbody>
          <tr><td>
            <input
                className="text-input-td"
                type="text"
                value={sheet.concept}
                onChange={(event) => handleTextInputChange("concept", event, setSheet)}
              />
          </td></tr>
        </tbody>
      </table>


      {/* Attributes */}
      <h4>Attributes</h4>
      <div className="sheet-line-div"></div>
      <table id="attribute-table" className="sheet-table">
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
                Strength
                <div>
                  {attrCheckboxes.strength.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxClick("strength", index, attrCheckboxes, setSheet)} />
                  ))}
                </div>
              </div>
            </td>
            <td> {/* Charisma */}
              <div className="checkbox-td">
                Charisma
                <div>
                  {attrCheckboxes.charisma.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxClick("charisma", index, attrCheckboxes, setSheet)} />
                  ))}
                </div>
              </div>
            </td>
            <td> {/* Intelligence */}
              <div className="checkbox-td">
                Intelligence
                <div>
                  {attrCheckboxes.intelligence.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxClick("intelligence", index, attrCheckboxes, setSheet)} />
                  ))}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td> {/* Dexterity */}
              <div className="checkbox-td">
                Dexterity
                <div>
                  {attrCheckboxes.dexterity.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxClick("dexterity", index, attrCheckboxes, setSheet)} />
                  ))}
                </div>
              </div>
            </td>
            <td> {/* Manipulation */}
              <div className="checkbox-td">
                Manipulation
                <div>
                  {attrCheckboxes.manipulation.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxClick("manipulation", index, attrCheckboxes, setSheet)} />
                  ))}
                </div>
              </div>
            </td>
            <td> {/* Wits */}
              <div className="checkbox-td">
                Wits
                <div>
                  {attrCheckboxes.wits.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxClick("wits", index, attrCheckboxes, setSheet)} />
                  ))}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td> {/* Stamina */}
              <div className="checkbox-td">
                Stamina
                <div>
                  {attrCheckboxes.stamina.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxClick("stamina", index, attrCheckboxes, setSheet)} />
                  ))}
                </div>
              </div>
            </td>
            <td> {/* Composure */}
              <div className="checkbox-td">
                Composure
                <div>
                  {attrCheckboxes.composure.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxClick("composure", index, attrCheckboxes, setSheet)} />
                  ))}
                </div>
              </div>
            </td>
            <td> {/* Resolve */}
              <div className="checkbox-td">
                Resolve
                <div>
                  {attrCheckboxes.resolve.map((checked, index) => (
                  <input key={index} type="checkbox" checked={checked}
                  onChange={() => handleCheckboxClick("resolve", index, attrCheckboxes, setSheet)} />
                  ))}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Health and Willpower */}
      <div>
      </div>

      <h4>Skills</h4>
      <div className="sheet-line-div"></div>

      <div> {/* DEBUG */}
        <button type="button" onClick={(event) => {
          event.preventDefault();
          setShouldDeleteSheet(true);}}
        >Delete sheet</button>
      </div>
    </div>
  );
};

export default Sheet;