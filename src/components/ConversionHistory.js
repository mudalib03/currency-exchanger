// filepath: /home/brian/Development/code/phase-2/currency-exchanger/src/components/ConversionHistory.js
import React from "react";
import PropTypes from "prop-types";

const ConversionHistory = ({ history }) => {
  if (!history.length) {
    return <p>No conversion history available.</p>;
  }

  return (
    <div className="conversion-history">
      <h3>Conversion History</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.amount} {item.fromCurrency} = {item.convertedAmount} {item.toCurrency}
          </li>
        ))}
      </ul>
    </div>
  );
};

ConversionHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      fromCurrency: PropTypes.string.isRequired,
      toCurrency: PropTypes.string.isRequired,
      convertedAmount: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ConversionHistory;