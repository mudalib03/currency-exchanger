import React from "react";
import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";

const LoadingScreen = ({ darkMode, loading }) => {
  if (!loading) return null;

  return (
    <div className="loader">
      <ClipLoader
        color={darkMode ? "#e2e8f0" : "#4f46e5"}
        loading={loading}
        size={50}
      />
    </div>
  );
};

LoadingScreen.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoadingScreen;
