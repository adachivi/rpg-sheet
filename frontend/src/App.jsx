import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateNewSheet from './pages/CreateNewSheet';
import Sheet from './pages/Sheet';

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/sheet/new">Create a new sheet</Link>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/sheet/new" element={<CreateNewSheet/>} />
        <Route path="/sheet" element={<Sheet/>} />
        <Route path="*" element={<p style={{ padding: '2rem' }}>Página não encontrada.</p>} />
      </Routes>
    </div>
  );
};

export default App;