import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, ShieldCheck, Clock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [pickup, setPickup] = useState('');
  const [delivery, setDelivery] = useState('');
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('shipway_user'));

  const handleSearch = (e) => {
    e.preventDefault();
    if (pickup || delivery) {
      navigate(`/search?pickup=${encodeURIComponent(pickup)}&delivery=${encodeURIComponent(delivery)}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="mesh-gradient"></div>
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
      </div>
      
      <div className="container hero-container">
        <div className="hero-content animate-slide">
          <div className="hero-badge">
            <Zap size={14} className="badge-icon" />
            <span>{user ? `Welcome back, ${user.name.split(' ')[0]}!` : 'Trusted by 10,000+ Businesses'}</span>
          </div>
          
          <h1>
            {user ? (
              <>Where are you <br /><span className="text-gradient">Shipping today?</span></>
            ) : (
              <>Logistics for the <br /><span className="text-gradient">Modern World</span></>
            )}
          </h1>
          <p>
            {user ? (
              `Find the best rates for your next delivery. Your saved preferences are ready.`
            ) : (
              `The smartest way to compare and book delivery services. Get instant quotes from hundreds of verified providers.`
            )}
          </p>
          
          <form className="hero-search-card" onSubmit={handleSearch}>
            <div className="search-inputs-grid">
              <div className="search-input-group">
                <div className="input-icon-label">
                  <MapPin size={16} />
                  <label>Pickup</label>
                </div>
                <input 
                  type="text" 
                  placeholder="Lagos, Nigeria" 
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
              </div>
              
              <div className="search-divider">
                <ArrowRight size={20} />
              </div>

              <div className="search-input-group">
                <div className="input-icon-label">
                  <MapPin size={16} />
                  <label>Delivery</label>
                </div>
                <input 
                  type="text" 
                  placeholder="Abuja, Nigeria" 
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                />

              </div>
            </div>
            
            <button type="submit" className="hero-search-btn">
              <span>Find Options</span>
              <ArrowRight size={20} />
            </button>
          </form>
          
          <div className="hero-trust">
            <div className="trust-item">
              <ShieldCheck size={18} />
              <span>Verified Partners</span>
            </div>
            <div className="trust-item">
              <Clock size={18} />
              <span>Real-time Tracking</span>
            </div>
          </div>
        </div>

        <div className="hero-visual animate-fade">
          <div className="visual-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" 
              alt="Logistics Operations" 
              className="main-hero-img"
            />
            <div className="floating-card card-top animate-float">
              <div className="status-dot"></div>
              <span>Package en route to London</span>
            </div>
            <div className="floating-card card-bottom">
              <div className="price-tag">$45.00</div>
              <span>Fastest Quote</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
