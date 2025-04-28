import React from "react";

const HistoryList = ({ history }) => (
  <div className="history">
    <h3>Conversion History</h3>
    <ul>
      {history.map((item, index) => (
        <li key={index}>
          {item.amount} {item.fromCurrency} ➡ {item.result} {item.toCurrency} ({item.date})
        </li>
      ))}
    </ul>
  </div>
);

export default HistoryList;
