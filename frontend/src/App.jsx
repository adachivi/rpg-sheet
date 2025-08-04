import React, { useState } from "react";
import { createSearchParams, Link, Route, Routes, useNavigate } from "react-router-dom";
import api from "./services/api";
// Pages
import Home from "./pages/Home";
import CreateNewSheet from "./pages/CreateNewSheet";
import Sheet from "./pages/Sheet";

const App = () => {
  // Input for sheet's access
  const [input, setInput] = useState({
    playerNameInput: "",
    sheetKeyInput: ""
  });

  const navigate = useNavigate();

  // View
  return (
    <div>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/newsheet">Create new sheet</Link>

        {/* Go to existing sheet */}
        <form>
          <div id="form-text">Access sheet</div>
          <div id="form-input-and-button">
          <div id="form-inputs">
            <input
              type="text"
              placeholder="Name"
              onChange={
                (event) => setInput((prev) => ({...prev, playerNameInput: event.target.value}))
              }
            />
            <input
              type="text"
              placeholder="Sheet key"
              onChange={
                (event) => setInput((prev) => ({...prev, sheetKeyInput: event.target.value}))
              }
            />
          </div>
          <button onClick={(event) => {
            event.preventDefault();
            api.get(`/sheet?playerName=${input.playerNameInput}&sheetKey=${input.sheetKeyInput}`)
              .then(response => {
                navigate({
                  pathname: "/sheet",
                  search: createSearchParams({
                    playerName: input.playerNameInput,
                    sheetKey: input.sheetKeyInput
                  }).toString()
                })
              })
              .catch(error => {
                console.error("Error: Sheet's data not found:", error);
              });
            }}
          >Submit</button>
          </div>
        </form>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/newsheet" element={<CreateNewSheet/>} />
        <Route path="/sheet" element={<Sheet input={input} setInput={setInput} />} />
        <Route path="*" element={<p style={{ padding: "2rem" }}>Error 404: Page not found.</p>} />
      </Routes>
    </div>
  );
};

export default App;