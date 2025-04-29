import React, { useState, useEffect } from "react";
import axios from "axios";
import AmountInput from "./AmountInput";
import CurrencySelect from "./CurrencySelect";
import ConvertButton from "./ConvertButton";
import ResultDisplay from "./ResultDisplay";
import SwapButton from "./SwapButton";
import HistoryList from "./HistoryList";
import "../components/CurrencyConverter.css";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(() => {
    const savedAmount = localStorage.getItem("amount");
    return savedAmount ? JSON.parse(savedAmount) : 1;
  });

  const [fromCurrency, setFromCurrency] = useState(() => {
    const savedFromCurrency = localStorage.getItem("fromCurrency");
    return savedFromCurrency ? savedFromCurrency : "USD";
  });

  const [toCurrency, setToCurrency] = useState(() => {
    const savedToCurrency = localStorage.getItem("toCurrency");
    return savedToCurrency ? savedToCurrency : "EUR";
  });

  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("history");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const API_URL = "https://open.er-api.com/v6/latest";

  useEffect(() => {
    axios.get(`${API_URL}/USD`).then((response) => {
      setCurrencies(Object.keys(response.data.rates));
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("amount", JSON.stringify(amount));
    localStorage.setItem("fromCurrency", fromCurrency);
    localStorage.setItem("toCurrency", toCurrency);
    localStorage.setItem("history", JSON.stringify(history));
  }, [amount, fromCurrency, toCurrency, history]);

  const convertCurrency = () => {
    setIsLoading(true);
    axios.get(`${API_URL}/${fromCurrency}`).then((response) => {
      const rate = response.data.rates[toCurrency];
      setExchangeRate(rate);
      setIsLoading(false);

      const newConversion = {
        amount,
        fromCurrency,
        toCurrency,
        result: (amount * rate).toFixed(2),
        date: new Date().toLocaleString(),
      };
      const updatedHistory = [newConversion, ...history.slice(0, 4)];
      setHistory(updatedHistory);
    });
  };

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleResetConverter = () => {
    if (window.confirm("Reset all converter data?")) {
      setAmount(1);
      setFromCurrency("USD");
      setToCurrency("EUR");
      setExchangeRate(null);
      setHistory([]);
      localStorage.removeItem("amount");
      localStorage.removeItem("fromCurrency");
      localStorage.removeItem("toCurrency");
      localStorage.removeItem("history");
    }
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <AmountInput amount={amount} setAmount={setAmount} />
      <CurrencySelect
        label="From"
        selectedCurrency={fromCurrency}
        setCurrency={setFromCurrency}
        currencies={currencies}
      />
      <CurrencySelect
        label="To"
        selectedCurrency={toCurrency}
        setCurrency={setToCurrency}
        currencies={currencies}
      />
      <SwapButton onSwap={handleSwapCurrencies} />
      <ConvertButton onConvert={convertCurrency} />
      {isLoading && <p>Loading...</p>}
      {exchangeRate && (
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
    </div>
  );
};

export default CurrencyConverter;
