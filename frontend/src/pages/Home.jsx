import React, { useEffect, useState } from "react";
import api from "../services/api";

const Home = () => {

  // View
  return (
  <>
    <div className="main">
      <h1>RPG Character Sheet Application</h1>
      <div className="line-div"></div>
      <div className="welcome-div">
        <h2>Welcome!</h2>
        <p>This app was created to make character sheets for a homebrew RPG of mine.</p>
        <p>The code of this app is available at my Github profile down below.</p>
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