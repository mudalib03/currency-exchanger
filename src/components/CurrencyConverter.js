import React, { useState, useEffect } from "react";
import axios from "axios";
import AmountInput from "./AmountInput";
import CurrencySelect from "./CurrencySelect";
import ConvertButton from "./ConvertButton";
import SwapButton from "./SwapButton";
import ResultDisplay from "./ResultDisplay";
import HistoryList from "./HistoryList";
import LoadingScreen from "./LoadingScreen";
import Footer from "./Footer";
import "./CurrencyConverter.css";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(() => {
    const saved = localStorage.getItem("amount");
    return saved ? JSON.parse(saved) : 1;
  });
  const [fromCurrency, setFromCurrency] = useState(() => localStorage.getItem("fromCurrency") || "USD");
  const [toCurrency, setToCurrency] = useState(() => localStorage.getItem("toCurrency") || "EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  const API_URL = process.env.REACT_APP_API_URL || "https://open.er-api.com/v6/latest";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/USD`)
      .then((res) => {
        setCurrencies(Object.keys(res.data.rates));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        showToast("Error fetching currencies!", "error");
      });
  }, [API_URL]);

  useEffect(() => {
    localStorage.setItem("amount", JSON.stringify(amount));
    localStorage.setItem("fromCurrency", fromCurrency);
    localStorage.setItem("toCurrency", toCurrency);
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("history", JSON.stringify(history));
  }, [amount, fromCurrency, toCurrency, darkMode, history]);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

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
      if (!rate) throw new Error("Invalid currency pair");

      setExchangeRate(rate);
      showToast("Conversion successful!", "success");

      const newEntry = {
        amount,
        fromCurrency,
        toCurrency,
        result: (amount * rate).toFixed(2),
        date: new Date().toLocaleString(),
      };

      setHistory([newEntry, ...history.slice(0, 4)]); // max 5
    } catch {
      setError("Conversion failed.");
      showToast("Error during conversion!", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleResetConverter = () => {
    if (window.confirm("Reset all converter data?")) {
      setAmount(1);
      setFromCurrency("USD");
      setToCurrency("EUR");
      setExchangeRate(null);
      setHistory([]);
      localStorage.clear();
    }
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>

      <button onClick={toggleDarkMode} className="dark-toggle-btn">
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <AmountInput amount={amount} setAmount={setAmount} disabled={loading} />

      <CurrencySelect
        label="From"
        selectedCurrency={fromCurrency}
        setCurrency={setFromCurrency}
        currencies={currencies}
        disabled={loading}
      />
      <CurrencySelect
        label="To"
        selectedCurrency={toCurrency}
        setCurrency={setToCurrency}
        currencies={currencies}
        disabled={loading}
      />

      <SwapButton onSwap={handleSwap} disabled={loading} />
      <ConvertButton onConvert={convertCurrency} disabled={loading} />

      <LoadingScreen darkMode={darkMode} loading={loading} />

      {!loading && exchangeRate && (
        <ResultDisplay
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          exchangeRate={exchangeRate}
        />
      )}

      {history.length > 0 && <HistoryList history={history} />}

      <div className="reset-converter">
        <button onClick={handleResetConverter} className="reset-button">
          Reset Converter
        </button>
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}

      <Footer />
    </div>
  );
};

export default CurrencyConverter;
