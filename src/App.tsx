import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Income from './components/Income';
import Expenses from './components/Expenses';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Income />} />
          <Route path="/income" element={<Expenses />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
