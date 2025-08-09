import React, { useEffect, useState } from "react";
import { createSearchParams, Link, Route, Routes, useNavigate } from "react-router-dom";
import api from "./services/api";
// Pages
import Home from "./pages/Home";
import CreateNewSheet from "./pages/CreateNewSheet";
import Sheet from "./pages/Sheet";
import LoadingModal from "./utils/LoadingModal";
import LoadingCompleteModal from "./utils/LoadingCompleteModal";

const App = () => {

  // Activate/deactivate loading data modal (pop-up)
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  // Activate/deactivate loading complete modal (pop-up)
  const [isLoadingCompleteModal, setIsLoadingCompleteModal] = useState(false);

  // Make a request to wake up Render's backend
  useEffect(() => {

    const interval = setInterval(() => {
      api.get("/wakeup-backend")
        .then(response => {
          console.log(response.data);
          setIsLoadingModal(false); // Close the pop-up
          clearInterval(interval); // Ends the loop
        })
        .catch(error => {
          console.error("Waking up backend...");
          if (!isLoadingModal) {
            setIsLoadingModal(true); // Open the pop-up
          }
        });
    }, 10000); // Set the loop to once each 10 seconds

  }, []);

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
        <Link to="/">Home</Link>
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
        <Route path="/" element={<Home />} />
        <Route path="/newsheet" element={<CreateNewSheet/>} />
        <Route path="/sheet" element={<Sheet input={input} setInput={setInput} />} />
        <Route path="*" element={<p style={{ padding: "2rem" }}>Error 404: Page not found.</p>} />
      </Routes>

      <LoadingModal isOpen={isLoadingModal} onClose={() => setIsLoadingCompleteModal(true)}>
        <p>Test</p>
      </LoadingModal>
      <LoadingCompleteModal isOpen={isLoadingCompleteModal} onClose={() => setIsLoadingCompleteModal(false)}>
        <p>Test 2</p>
      </LoadingCompleteModal>
    </div>
  );
};

export default App;