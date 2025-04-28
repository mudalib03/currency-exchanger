import CurrencyConverter from "./CurrencyConverter";
import "/home/reagan/Desktop/PHASE -2/currency-exchanger/src/CurrencyConverter.css";
import React from "react";

import Navbar from "/home/reagan/Desktop/PHASE -2/currency-exchanger/src/navbar.js";
import Homepage from "/home/reagan/Desktop/PHASE -2/currency-exchanger/src/components/homepage.js";
import "/home/reagan/Desktop/PHASE -2/currency-exchanger/src/components/homepage.css"; // Import your CSS fileimpo
function App() {
  return (
    <div className="App">
      <Navbar />
      <Homepage />
      <CurrencyConverter />
    </div>
  );
}

export default App;
