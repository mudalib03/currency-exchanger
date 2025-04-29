import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// filepath: /home/reagan/Desktop/PHASE -2/currency-exchanger/src/App.js
import react from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "/home/reagan/Desktop/PHASE -2/currency-exchanger/src/navbar.js";
import Homepage from "./components/homepage";
import About from "./components/About";
import Services from "./components/services";
import Contact from "/home/reagan/Desktop/PHASE -2/currency-exchanger/src/components/Contact.js";
import CurrencyConverter from "./CurrencyConverter";
import "./components/homepage.css";

function app() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <CurrencyConverter />
    </div>
  );
}

export default App;
