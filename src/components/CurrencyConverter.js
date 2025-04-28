import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import ConversionResult from "./ConversionResult";
import ConversionHistory from "./ConversionHistory";
import Footer from "./Footer"; // Ensure Footer is imported
import "../components/CurrencyConverter.css";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [history, setHistory] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL || "https://open.er-api.com/v6/latest";

  // Fetch currencies on mount
  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/USD`);
        setCurrencies(Object.keys(response.data.rates));
      } catch {
        setError("Failed to fetch currencies. Please try again later.");
        showToast("Error fetching currencies!", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, [API_URL]);

  // Handle conversion
  const convertCurrency = async () => {
    if (!fromCurrency || !toCurrency) {
      setError("Please select valid currencies.");
      showToast("Invalid currency selection!", "error");
      return;
    }
    if (amount <= 0 || amount === "") {
      setError("Please enter a valid amount.");
      showToast("Invalid amount!", "error");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      if (!rate) {
        throw new Error("Invalid currency pair");
      }
      setExchangeRate(rate);
      showToast("Currency converted successfully!", "success");

      setHistory([
        ...history,
        {
          amount,
          fromCurrency,
          toCurrency,
          convertedAmount: (amount * rate).toFixed(2),
        },
      ]);
    } catch {
      setError("Failed to fetch exchange rate. Please try again.");
      showToast("Error fetching exchange rate!", "error");
    } finally {
      setLoading(false);
    }
  };

  // Show toast notification
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Handle amount input with validation
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setAmount("");
    } else if (value >= 0) {
      setAmount(Number(value));
    }
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>

      <button onClick={toggleDarkMode} className="btn bg-secondary">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="card">
        {error && <p className="error">{error}</p>}

        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          aria-label="Enter amount to convert"
          value={amount}
          onChange={handleAmountChange}
          min="0"
          disabled={loading}
        />

        <label htmlFor="fromCurrency">From:</label>
        <select
          id="fromCurrency"
          aria-label="Select currency to convert from"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          disabled={loading}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <label htmlFor="toCurrency">To:</label>
        <select
          id="toCurrency"
          aria-label="Select currency to convert to"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          disabled={loading}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <div className="button-group">
          <button
            onClick={convertCurrency}
            disabled={loading}
            className="btn bg-secondary"
          >
            Convert
          </button>
          <button
            className="swap-button"
            onClick={() => {
              setFromCurrency(toCurrency);
              setToCurrency(fromCurrency);
            }}
            disabled={loading}
            aria-label="Swap currencies"
          >
            🔄
          </button>
        </div>

        {loading && (
          <div className="loader">
            <ClipLoader color={darkMode ? "#e2e8f0" : "#4f46e5"} loading={loading} size={50} />
          </div>
        )}

        {/* Use ConversionResult component */}
        {exchangeRate && !loading && (
          <ConversionResult
            amount={amount}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            exchangeRate={exchangeRate}
          />
        )}
      </div>

      {toast && (
        <div className={`toast ${toast.type === "success" ? "bg-secondary" : "bg-primary"}`}>
          {toast.message}
        </div>
      )}

      <ConversionHistory history={history} />

      {/* Use Footer component */}
      <Footer />
    </div>
  );
};

export default CurrencyConverter;