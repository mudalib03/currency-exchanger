import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CurrencyConverter.css"; 

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  const API_URL = "https://open.er-api.com/v6/latest";

  useEffect(() => {
    axios.get(`${API_URL}/USD`).then((response) => {
      setCurrencies(Object.keys(response.data.rates));
    });
  }, []);

  const convertCurrency = () => {
    axios.get(`${API_URL}/${fromCurrency}`).then((response) => {
      const rate = response.data.rates[toCurrency];
      setExchangeRate(rate);
    });
  };

  const getFlagUrl = (currency) => {
    const countryCode = currency.slice(0, 2).toUpperCase();
    return `https://flagsapi.com/${countryCode}/flat/32.png`;
  };

  return (
    <div className="currency-converter">
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>From:</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>To:</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button onClick={convertCurrency}>Convert</button>
      {exchangeRate && (
        <div className="result">
          <h2>
            {amount} {fromCurrency} = {(amount * exchangeRate).toFixed(2)}{" "}
            {toCurrency}
          </h2>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
