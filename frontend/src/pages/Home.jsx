import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Home = () => {
  // View
  return (
    <div className="page-body" style={{display: "flex", justifyContent: "center"}}>
      <div>
        <h1>RPG Character Sheet Application</h1>
        <h2>Welcome!</h2>
        <p>This app was created to make character sheets for a homebrew RPG of mine.</p>
        <p>The code of this app is available at my Github profile down below.</p>
        <h2>Contact</h2>
        <a href="https://github.com/adachivi">Github</a>
      </div>
    </div>
  );
};

export default Home;