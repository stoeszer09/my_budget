import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <LoginButton />
        <LogoutButton />
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
