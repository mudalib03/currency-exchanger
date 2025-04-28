import React from "react";

const SwapButton = ({ onSwap }) => (
  <button onClick={onSwap} style={{ marginTop: "10px", marginBottom: "20px" }}>
    🔄 Swap Currencies
  </button>
);

export default SwapButton;
