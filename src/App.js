import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "/home/reagan/Desktop/PHASE -2/currency-exchanger/src/navbar.js";
import Homepage from "./components/homepage";
import About from "./components/About";
import Services from "./components/services";
import Contact from "/home/reagan/Desktop/PHASE -2/currency-exchanger/src/components/Contact.js";
import CurrencyConverter from "./CurrencyConverter";
import "/home/reagan/Desktop/PHASE -2/currency-exchanger/src/CurrencyConverter.css";
import "/home/reagan/Desktop/PHASE -2/currency-exchanger/src/components/homepage.css"; // Import your CSS file

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <CurrencyConverter />
    </Router>
  );
}

export default App;
