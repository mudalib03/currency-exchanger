import React from "react";
import PropTypes from "prop-types";

const ConversionResult = ({ amount, fromCurrency, toCurrency, exchangeRate }) => {
  if (!exchangeRate) {
    return (
      <p
        className="text-red-500 text-center"
        role="alert"
        aria-live="assertive"
      >
        Unable to fetch exchange rate. Please try again later.
      </p>
    );
  }

  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return (
    <div
      className="mt-8 text-center bg-gray-100 p-6 rounded-lg shadow-md"
      aria-label={`Conversion result: ${amount} ${fromCurrency} equals ${convertedAmount} ${toCurrency}`}
    >
      <h3 className="text-2xl font-bold text-gray-800">
        {amount}{" "}
        <span className="text-indigo-600">
          {fromCurrency}
        </span>{" "}
        =
      </h3>
      <p className="text-3xl font-extrabold text-indigo-700 mt-2">
        {convertedAmount} {toCurrency}
      </p>
    </div>
  );
};

ConversionResult.propTypes = {
  amount: PropTypes.number.isRequired,
  fromCurrency: PropTypes.string.isRequired,
  toCurrency: PropTypes.string.isRequired,
  exchangeRate: PropTypes.number,
};

export default ConversionResult;