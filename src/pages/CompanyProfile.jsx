import React, { useState } from 'react';
import { Star, MapPin, Truck, ShieldCheck, Globe, Clock, CheckCircle, Zap, Box, ArrowLeft } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './CompanyProfile.css';

const CompanyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  
  // Mock companies for the profile
  const companies = {
    "1": { name: 'Swift Logistics', rating: 4.9, location: 'UK-Wide', image: 'https://images.unsplash.com/photo-1598128558393-70ff21433be0' },
    "2": { name: 'Global Express', rating: 4.7, location: 'International', image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8' },
    "default": { name: 'FastShip Logistics', rating: 4.8, location: 'North America', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d' }
  };

  const company = companies[id] || companies["default"];

  return (
    <div className="profile-page animate-fade">
      <div className="profile-breadcrumb container">
        <Link to="/search" className="back-link">
          <ArrowLeft size={18} />
          Back to results
        </Link>
      </div>
      
      <header className="profile-header container">
        <div className="profile-header-card card">
          <div className="profile-header-main">
            <img src={`${company.image}?auto=format&fit=crop&q=80&w=200`} alt={company.name} className="profile-logo" />
            <div className="profile-info-text">
              <div className="profile-title-row">
                <h1>{company.name}</h1>
                <div className="verified-tag">
                  <ShieldCheck size={16} fill="#10b981" color="white" />
                  <span>Verified</span>
                </div>
              </div>
              <div className="profile-meta-row">
                <div className="rating-row">
                  <Star size={18} fill="#fbbf24" color="#fbbf24" />
                  <strong>{company.rating}</strong>
                  <span>(1,264 Reviews)</span>
                </div>
                <div className="location-row">
                  <MapPin size={18} />
                  <span>{company.location}</span>
                </div>
              </div>
            </div>
            <div className="profile-header-actions">
              <button className="request-btn" onClick={() => navigate('/request')}>
                Request Quote
              </button>
            </div>
          </div>
          
          <div className="profile-tabs">
            {['Overview', 'Coverage', 'Services', 'Reviews'].map(tab => (
              <button 
                key={tab} 
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container profile-main-content">
        <div className="profile-grid">
          <div className="profile-main-column">
            <section className="profile-section card">
              <h2>About {company.name}</h2>
              <p className="about-text">
                {company.name} is a leading provider of logistics and delivery solutions. 
                With a commitment to speed, safety, and reliability, we handle everything 
                from small parcels to large freight. Our global network ensures that your 
                items reach their destination across {company.location} with real-time tracking 
                and dedicated support.
              </p>
              <div className="feature-grid">
                <div className="feature-item">
                  <CheckCircle size={20} color="#10b981" />
                  <span>Insurance Included</span>
                </div>
                <div className="feature-item">
                  <CheckCircle size={20} color="#10b981" />
                  <span>Real-time Tracking</span>
                </div>
                <div className="feature-item">
                  <CheckCircle size={20} color="#10b981" />
                  <span>24/7 Support</span>
                </div>
                <div className="feature-item">
                  <CheckCircle size={20} color="#10b981" />
                  <span>Eco-friendly Shipping</span>
                </div>
              </div>
            </section>

            <section className="profile-section card">
              <h2>Popular Services</h2>
              <div className="services-list">
                {[
                  { name: 'Same Day Delivery', icon: <Zap size={24} />, desc: 'Local delivery within 24 hours.' },
                  { name: 'Standard Shipping', icon: <Truck size={24} />, desc: 'Reliable 3-5 day delivery service.' },
                  { name: 'Fragile Care', icon: <ShieldCheck size={24} />, desc: 'Special handling for delicate items.' }
                ].map((s, i) => (
                  <div key={i} className="service-item-row">
                    <div className="service-icon-bg">{s.icon}</div>
                    <div className="service-info">
                      <strong>{s.name}</strong>
                      <p>{s.desc}</p>
                    </div>
                    <button className="get-quote-sm">Get Quote</button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="profile-sidebar-column">
            <section className="sidebar-card card">
              <h3>Quick Stats</h3>
              <div className="sidebar-stats">
                <div className="sidebar-stat">
                  <span className="label">Delivery Rate</span>
                  <strong>99.8%</strong>
                </div>
                <div className="sidebar-stat">
                  <span className="label">Active Jobs</span>
                  <strong>124</strong>
                </div>
                <div className="sidebar-stat">
                  <span className="label">Response Time</span>
                  <strong>{'< 30 mins'}</strong>
                </div>
              </div>
            </section>

            <section className="sidebar-card card">
              <h3>Customer Feedback</h3>
              <div className="mini-reviews">
                {[
                  { user: 'Sarah M.', text: 'Fast and reliable!', rating: 5 },
                  { user: 'James K.', text: 'Good communication.', rating: 4 }
                ].map((r, i) => (
                  <div key={i} className="mini-review">
                    <div className="mini-review-stars">
                      {[...Array(r.rating)].map((_, j) => <Star key={j} size={12} fill="#fbbf24" color="#fbbf24" />)}
                    </div>
                    <p>"{r.text}"</p>
                    <span>- {r.user}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CompanyProfile;
