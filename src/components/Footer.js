// filepath: /home/brian/Development/code/phase-2/currency-exchanger/src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-white p-4 text-center">
      <p>&copy; {new Date().getFullYear()} Currency Exchanger. All rights reserved.</p>
    </footer>
  );
};

export default Footer;