import React, { useState } from 'react';
import { 
  Star, MapPin, Truck, ShieldCheck, Globe, Clock, 
  CheckCircle, Zap, Box, ArrowLeft, Mail, Phone, MessageCircle 
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getCompanies } from '../data/companies';
import './CompanyProfile.css';

const CompanyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  
  // Fetch real data
  const allCompanies = getCompanies();
  const company = allCompanies.find(c => String(c.id) === String(id)) || allCompanies[0];

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
            <img src={company.logo || company.image} alt={company.name} className="profile-logo" />
            <div className="profile-info-text">
              <div className="profile-title-row">
                <h1>{company.companyName || company.name}</h1>
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
                  <span>{company.location || 'Nationwide'}</span>
                </div>
                <div className="type-row">
                  <Truck size={18} />
                  <span>{company.type || 'Standard'}</span>
                </div>
              </div>
            </div>
            <div className="contact-actions">
              <a 
                href={`https://wa.me/${(company.whatsapp || '+2348000000000').replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Book Now
              </a>
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
                {company.description || `${company.name} is a leading provider of logistics and delivery solutions. With a commitment to speed, safety, and reliability, we handle everything from small parcels to large freight.`}
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
                    <a 
                      href={`https://wa.me/${(company.whatsapp || '+2348000000000').replace(/\D/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Book Now
                    </a>
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
              <h3>Contact Details</h3>
              <div className="sidebar-stats">
                <div className="sidebar-stat contact-stat">
                  <div className="contact-label-wrapper">
                    <Mail size={16} />
                    <span className="label">Email</span>
                  </div>
                  <strong className="contact-value">{company.email || 'contact@company.com'}</strong>
                </div>
                <div className="sidebar-stat contact-stat">
                  <div className="contact-label-wrapper">
                    <Phone size={16} />
                    <span className="label">Mobile</span>
                  </div>
                  <strong className="contact-value">{company.phone || 'Not provided'}</strong>
                </div>
                {company.whatsapp && (
                  <div className="sidebar-stat contact-stat">
                    <div className="contact-label-wrapper">
                      <MessageCircle size={16} />
                      <span className="label">WhatsApp</span>
                    </div>
                    <strong className="contact-value">{company.whatsapp}</strong>
                  </div>
                )}
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
