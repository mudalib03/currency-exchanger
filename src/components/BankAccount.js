import React, { useState, useEffect } from "react";
import "../components/BankAccount.css";

const BankAccount = () => {
  // Initialize balance and transactions from localStorage, if available
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance ? JSON.parse(savedBalance) : 1000; // Default to 1000 if not found
  });

  const [transaction, setTransaction] = useState("");
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [voices, setVoices] = useState([]);

  // Fetch available voices on load
  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }, []);

  // Save balance and transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [balance, transactions]);

  // Function to handle voice feedback with custom settings
  const speak = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US"; // Set the language (can be adjusted to "en-GB" for British English, etc.)
    utterance.voice = voices.find((voice) => voice.name === "Google UK English Female") || voices[0]; // Set preferred voice, fallback to the first available one
    utterance.pitch = 1.2; // Adjust pitch (1 is the default)
    utterance.rate = 1; // Adjust rate (1 is the default, 0.5 is slow, 2 is fast)
    utterance.volume = 1; // Set volume (0.0 to 1.0)
    window.speechSynthesis.speak(utterance);
  };

  const handleTransaction = (type) => {
    setIsLoading(true);
    const amount = parseFloat(transaction);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid transaction amount.");
      setIsLoading(false);
      return;
    }

    if (type === "deposit") {
      setBalance((prevBalance) => prevBalance + amount);
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        { type: "Deposit", amount, date: new Date().toLocaleString() },
      ]);

      // AI Voice for Deposit
      speak(`Deposited ${amount} dollars. Your new balance is ${balance + amount} dollars.`);

    } else if (type === "withdraw" && amount <= balance) {
      setBalance((prevBalance) => prevBalance - amount);
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        { type: "Withdraw", amount, date: new Date().toLocaleString() },
      ]);

      // AI Voice for Withdrawal
      speak(`Withdrew ${amount} dollars. Your new balance is ${balance - amount} dollars.`);
      
    } else {
      alert("Insufficient balance for withdrawal.");
    }
    setTransaction(""); // Reset transaction input
    setIsLoading(false);
  };

  return (
    <div className="bank-account">
      <h2>Bank Account</h2>
      <div className="balance">
        <h3>Current Balance: ${balance.toFixed(2)}</h3>
      </div>
      <div className="transaction">
        <input
          type="number"
          value={transaction}
          onChange={(e) => setTransaction(e.target.value)}
          placeholder="Enter amount"
        />
        <button onClick={() => handleTransaction("deposit")}>Deposit</button>
        <button onClick={() => handleTransaction("withdraw")}>Withdraw</button>
      </div>
      {isLoading && <p>Processing...</p>}
      <div className="transaction-history">
        <h3>Transaction History</h3>
        <ul>
          {transactions.length === 0 ? (
            <li>No transactions yet</li>
          ) : (
            transactions.map((txn, index) => (
              <li key={index}>
                {txn.type} ${txn.amount} on {txn.date}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default BankAccount;
