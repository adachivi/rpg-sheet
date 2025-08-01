// Page to create (POST) a new (almost) blank character sheet
import React, { useEffect, useId, useState } from "react";
import api from "../services/api";
import { handleTextInputChange, verifyPlayerNameInput } from "../utils/Utils";

const CreateNewSheet = () => {
  // New blank sheet
  const [sheet, setSheet] = useState({
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

  // Sheet key -> used to access it later (GET)
  var generatedValue = useId();
  useEffect(() => {
    setSheet((prev) => ({...prev, sheetKey: generatedValue})); // Update blank sheet with sheet key
  }, [generatedValue]);

  // Create (POST) the new sheet method
  const createSheet = (sheet) => {
    if (verifyPlayerNameInput(sheet.playerName)) {
      api.post("/sheet", sheet, {
        headers: {"Content-type": "application/json"}
      });
    }
    else {
      alert("A name must contain at least two letters.\nPlease, try again.");
    }}

  // View
  return (
    <div className="page-body">
      <div>
        Please, insert your name:
        <input
          type="text"
          value={sheet.playerName}
          onChange={(event) => handleTextInputChange("playerName", event, setSheet)}
        />
      </div>
      <div>Your sheet key: {sheet.sheetKey}</div>
      <div>
        <div><strong>ATTENTION!</strong></div>
        <p>You will need to use your name and sheet key to access your sheet.</p>
        <p>Be sure to save it somewhere.</p>
      </div>
      <div>
        <button onClick={() => createSheet(sheet)}>Create sheet</button>
      </div>
    </div>
  );
};

export default CreateNewSheet;