import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/home.css"

const Home = () => {

  // View
  return (
  <>
    <div className="main-background">
      <div className="main">
        <h1>RPG Character Sheet Application</h1>
        <div className="line-div"></div>
        <div className="main-section">
          <h2>Welcome!</h2>
          <p>This app was created to make character sheets for a homebrew RPG of mine.</p>
          <p>The code of this app is available at my Github profile down below.</p>
        </div>
        <div className="gray-line-div"></div>
        <div className="main-section">
          <h2>How to use this app</h2>
          <p>Use the navegation bar above to access your sheet or to create a new one.</p>
          <p>With your sheet open, you can save any alteration by clicking the save button.</p>
          <p>By doing so, the data from your sheet will be stored and saved in the database.</p>
          <p>If you run into any problem, please get in touch by my contact links down below.</p>
        </div>
        <div className="note">
          <h3>Note</h3>
          <p>This app uses Render's free deploy. For that reason, the app might take up to 2 minutes to load.</p>
          <p>Thank you for your understanding.</p>
        </div>
      </div>
    </div>

    <div id="footer">
      <p>Made by Victor L. Adachi</p>
      <p>Contact</p>
      <div className="contact-links-div">
        <a href="https://github.com/adachivi">GitHub</a>
        <a href="https://www.linkedin.com/in/v-adachi/">LinkedIn</a>
      </div>
    </div>
  </>
  );

};

export default Home;