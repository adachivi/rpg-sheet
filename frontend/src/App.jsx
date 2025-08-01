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
        <Link to="/sheet/new">Create new sheet</Link>

        {/* Go to existing sheet */}
        <form>
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
        </form>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/sheet/new" element={<CreateNewSheet/>} />
        <Route path="/sheet" element={<Sheet/>} />
        <Route path="*" element={<p style={{ padding: "2rem" }}>Página não encontrada.</p>} />
      </Routes>
    </div>
  );
};

export default App;