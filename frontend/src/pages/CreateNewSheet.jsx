// Page to create (POST) a new (almost) blank character sheet

import React, { useEffect, useState } from "react";
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
  useEffect(() => {

    var generatedValue = Date.now().toString();
    setSheet((prev) => ({...prev, sheetKey: generatedValue})); // Update blank sheet with sheet key

  }, []);

  // POST: Create a new sheet
  const createSheet = (sheet) => {

    if (verifyPlayerNameInput(sheet.playerName)) {
      api.post("/sheet", sheet, {
        headers: {"Content-type": "application/json"}
      });
    }
    else {
      alert("A name must contain at least two letters.\nPlease, try again.");
    }

  }

  // View
  return (
    <div className="page-body" style={{display: "flex", justifyContent: "center"}}>
      <div>
        <h2 style={{textAlign: "center", marginTop: "0px"}}>Create new sheet</h2>
        <div style={{display: "flex", columnGap: "10px", justifyContent: "center", flexWrap: "wrap"}}>
          <div>Please, insert your name:</div>
          <input
            type="text"
            value={sheet.playerName}
            onChange={(event) => handleTextInputChange("playerName", event, setSheet)}
          />
        </div>
        <div style={{marginTop: "10px" ,textAlign: "center"}}>
          Your sheet key: {sheet.sheetKey}
        </div>
        <div style={{textAlign: "center"}}>
          <h3>ATTENTION!</h3>
          <p>You will need your name and key to access your sheet.</p>
          <p>Be sure to save it somewhere.</p>
          <br />
          <button onClick={() => createSheet(sheet)}>Create sheet</button>
        </div>
        </div>
    </div>
  );

};

export default CreateNewSheet;