import React from "react";

const CurrencySelect = ({ label, selectedCurrency, setCurrency, currencies }) => (
  <div>
    <label>{label}:</label>
    <select
      value={selectedCurrency}
      onChange={(e) => setCurrency(e.target.value)}
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  </div>
);

export default CurrencySelect;
