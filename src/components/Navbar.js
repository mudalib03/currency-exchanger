// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // For routing to different pages
import './Navbar.css'; // Importing Navbar CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Currency Exchanger</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/currency-converter" className="navbar-link">
            Currency Converter
          </Link>
        </li>
        <li>
          <Link to="/bank" className="navbar-link">
            Personal Bank
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
