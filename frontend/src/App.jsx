import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewSheet from './pages/NewSheet';

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/newsheet">Create a new sheet</Link>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/newsheet" element={<NewSheet/>} />
        <Route path="*" element={<p style={{ padding: '2rem' }}>Página não encontrada.</p>} />
      </Routes>
    </div>
  );
};

export default App;