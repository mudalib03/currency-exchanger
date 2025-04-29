
import React from 'react';

const About = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">About CurrencyEx</h1>
      <p className="text-lg text-gray-700 mb-4">
        CurrencyEx is a simple and fast currency exchanger app designed to help you convert currencies in real-time using the latest exchange rates. Whether you're a traveler, a business owner, or just curious about global currencies, CurrencyEx makes currency conversion easy and reliable.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Our app supports multiple currencies and updates rates regularly to ensure accuracy. With a clean interface and smooth experience, it's the perfect tool for managing currency exchanges on the go.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Built using React, the app fetches real-time data and delivers instant results, all while maintaining a lightweight and responsive design.
      </p>
      <p className="text-sm text-gray-500">— The CurrencyEx Team</p>
    </div>
  );
};

export default About;
