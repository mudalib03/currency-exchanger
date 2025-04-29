
import React from 'react';

const services = [
  {
    title: 'Real-Time Exchange Rates',
    description: 'Get up-to-date currency conversion rates powered by reliable APIs for accurate results every time.',
  },
  {
    title: 'Multi-Currency Support',
    description: 'Convert between dozens of global currencies with ease and speed—perfect for travel, business, or personal use.',
  },
  {
    title: 'User-Friendly Interface',
    description: 'Enjoy a clean and responsive design that works seamlessly across desktops, tablets, and mobile devices.',
  },
  {
    title: 'Secure and Fast',
    description: 'Built with performance and security in mind to ensure your experience is smooth and safe.',
  },
];

const Services = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">Our Services</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div key={index} className="p-6 border rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
