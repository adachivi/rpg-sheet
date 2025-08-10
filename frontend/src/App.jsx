import React, { useEffect, useState } from "react";
import { createSearchParams, Link, Route, Routes, useNavigate } from "react-router-dom";
import api from "./services/api";
// Pages
import Home from "./pages/Home";
import CreateNewSheet from "./pages/CreateNewSheet";
import Sheet from "./pages/Sheet";
import LoadingPopup from "./modals/LoadingPopup";

const App = () => {

  // Loading data pop-up control
  const [loadingDataPopup, setLoadingDataPopup] = useState(true);

  // Make a request to wake up Render's backend
  useEffect(() => {

    const interval = setInterval(() => {
      api.get("/wakeup-backend")
        .then(response => {
          console.log(response.data);
          setLoadingDataPopup(false); // Close loading pop-up
          clearInterval(interval); // Ends the loop
        })
        .catch(error => {
          console.error("Waking up backend...");
          if (!loadingDataPopup) {
            setLoadingDataPopup(true); // Open loading pop-up
          }
        });
    }, 10000); // Set the loop to once each 10 seconds

  }, []);

  // Disables navbar links while backend is as sleep
  let homeLink;
  let newSheetLink;
  if (loadingDataPopup) {
    homeLink = <span className="disabled-link">Home</span>;
    newSheetLink = <span className="disabled-link">Create new sheet</span>;
  }
  else {
    homeLink = <Link to="/">Home</Link>;
    newSheetLink = <Link to="/newsheet">Create new sheet</Link>;
  }

  // Input for sheet's access
  const [input, setInput] = useState({
    playerNameInput: "",
    sheetKeyInput: ""
  });

  const navigate = useNavigate();

  // View
  return (
    <>
      <nav>
        {homeLink}
        {newSheetLink}

        {/* Go to existing sheet */}
        <form>
          <fieldset disabled={loadingDataPopup}> {/* Disable form while backend is as sleep */}
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
          </fieldset>
        </form>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newsheet" element={<CreateNewSheet/>} />
        <Route path="/sheet" element={<Sheet input={input} setInput={setInput} />} />
        <Route path="*" element={<p style={{ padding: "2rem" }}>Error 404: Page not found.</p>} />
      </Routes>

      {/* Pop-ups */}

      <LoadingPopup isOpen={loadingDataPopup}>
        <p>Conecting to the database.</p>
        <p>Please wait.</p>
      </LoadingPopup>
    </>
  );
};

export default App;