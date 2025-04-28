import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '/home/reagan/Desktop/PHASE -2/currency-exchanger/src/components/homepage.css'; // Import your CSS file
import './homepage.css'; // Import your CSS file
import '/home/reagan/Desktop/PHASE -2/currency-exchanger/src/navbar.js'; 

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo">YourLogo</Link>
          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
            <button className="cta-button">Get Started</button>
          </div>
          <button 
            className="hamburger" 
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to Our Platform</h1>
          <p>Transform your business with our innovative solutions</p>
          <div className="hero-cta">
            <button className="cta-button">Learn More</button>
            <button className="cta-button secondary">Watch Demo</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Innovative Solutions</h3>
              <p>Cutting-edge technology tailored to your needs</p>
            </div>
            <div className="feature-card">
              <h3>Expert Team</h3>
              <p>Experienced professionals dedicated to your success</p>
            </div>
            <div className="feature-card">
              <h3>24/7 Support</h3>
              <p>Round-the-clock assistance whenever you need it</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2023 Your Company. All rights reserved.</p>
          <div className="social-links">
            <a href="/">Twitter</a>
            <a href="/">Facebook</a>
            <a href="/">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;