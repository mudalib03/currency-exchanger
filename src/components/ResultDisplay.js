import React from "react";

const ResultDisplay = ({ amount, fromCurrency, toCurrency, exchangeRate }) => (
  <div className="result">
    <h2>
      {amount} {fromCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}
    </h2>
  </div>
);

export default ResultDisplay;
