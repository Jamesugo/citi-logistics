import React from 'react';
import { Search, ArrowRightLeft, CheckCircle } from 'lucide-react';
import './HowItWorks.css';

const steps = [
  {
    icon: <Search size={40} />,
    title: 'Search',
    description: 'Enter your pickup and delivery locations to see available providers.'
  },
  {
    icon: <ArrowRightLeft size={40} />,
    title: 'Compare',
    description: 'Filter by price, delivery speed, and customer ratings to find the perfect match.'
  },
  {
    icon: <CheckCircle size={40} />,
    title: 'Book',
    description: 'Submit your request and get instant confirmation from your chosen provider.'
  }
];

const HowItWorks = () => {
  return (
    <section className="section how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Get your items delivered in three simple steps.</p>
        </div>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-icon">{step.icon}</div>
              <div className="step-number">{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
