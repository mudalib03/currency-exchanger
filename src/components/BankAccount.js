import React, { useState, useEffect } from "react";
import "../components/BankAccount.css";

const BankAccount = () => {
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance ? JSON.parse(savedBalance) : 1000;
  });

  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }, []);

  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [balance, transactions]);

  const speak = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    utterance.voice = voices.find((voice) => voice.name.includes("English")) || voices[0];
    utterance.pitch = 1.2;
    utterance.rate = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleTransaction = (type) => {
    setIsLoading(true);
    const amount = parseFloat(transactionAmount);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      setIsLoading(false);
      return;
    }

    if (type === "deposit") {
      const newBalance = balance + amount;
      setBalance(newBalance);
      addTransaction("Deposit", amount);
      speak(`Deposited ${amount} dollars. New balance is ${newBalance} dollars.`);
    } 
    else if (type === "withdraw") {
      if (amount > balance) {
        alert("Insufficient balance.");
        setIsLoading(false);
        return;
      }
      const newBalance = balance - amount;
      setBalance(newBalance);
      addTransaction("Withdraw", amount);
      speak(`Withdrew ${amount} dollars. New balance is ${newBalance} dollars.`);
    }

    setTransactionAmount("");
    setIsLoading(false);
  };

  const addTransaction = (type, amount) => {
    const newTransaction = {
      type,
      amount,
      date: new Date().toLocaleString(),
    };

    setTransactions((prev) => [newTransaction, ...prev.slice(0, 9)]); // Keep last 10
  };

  const handleClearAccount = () => {
    if (window.confirm("Are you sure you want to reset your bank account?")) {
      setBalance(1000);
      setTransactions([]);
      localStorage.removeItem("balance");
      localStorage.removeItem("transactions");
      speak("Bank account has been reset.");
    }
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
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <button onClick={() => handleTransaction("deposit")}>Deposit</button>
        <button onClick={() => handleTransaction("withdraw")}>Withdraw</button>
      </div>

      {isLoading && <p>Processing transaction...</p>}

      <div className="transaction-history">
        <h3>Transaction History</h3>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul>
            {transactions.map((txn, index) => (
              <li
                key={index}
                className={txn.type === "Deposit" ? "deposit" : "withdraw"}
              >
                {txn.type} ${txn.amount} on {txn.date}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="reset-account">
        <button className="reset-button" onClick={handleClearAccount}>
          Reset Bank Account
        </button>
      </div>
    </div>
  );
};

export default BankAccount;
