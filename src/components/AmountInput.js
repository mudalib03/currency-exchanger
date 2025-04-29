import React from "react";

const AmountInput = ({ amount, setAmount }) => (
  <div>
    <label>Amount:</label>
    <input
      type="number"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
  </div>
);

export default AmountInput;
