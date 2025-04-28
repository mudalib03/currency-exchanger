import React from "react";

const TransactionHistory = ({ transactions }) => {
  if (transactions.length === 0) {
    return <p>No transactions yet.</p>;
  }

  return (
    <div className="transaction-history">
      <h3>📜 Transaction History</h3>
      <ul>
        {transactions.map((txn, index) => (
          <li key={index}>
            {txn.type}: ${txn.amount.toFixed(2)} ({txn.date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
