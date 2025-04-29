// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CurrencyConverter from './components/CurrencyConverter';
import BankAccount from './components/BankAccount';
import Services from './components/Service';
import Contact from './components/Contacts';
import About from './components/About';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/" element={<CurrencyConverter />} />
          <Route path="/currency-converter" element={<CurrencyConverter />} />
          <Route path="/bank" element={<BankAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
