import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Income from './components/Income';
import Expenses from './components/Expenses';

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/expenses" Component={Income}/>
          <Route path="/income" Component={Expenses}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
