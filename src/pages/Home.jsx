import React from 'react';
import Hero from '../components/Hero';
import FeaturedCompanies from '../components/FeaturedCompanies';
import HowItWorks from '../components/HowItWorks';
import { MapPin, Navigation, Quote } from 'lucide-react';
import './Home.css';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('shipway_user'));

  return (
    <div className="home-page">
      <Hero />
      
      {user ? (
        /* LOGGED IN VIEW */
        <>
          <section className="section quick-stats animate-fade">
            <div className="container">
              <div className="stats-header">
                <h2>Account Overview</h2>
                <p>Quick glance at your logistics activity.</p>
              </div>
              <div className="grid home-stats-grid">
                <div className="card home-stat-card">
                  <h3>12</h3>
                  <span>Active Deliveries</span>
                </div>
                <div className="card home-stat-card">
                  <h3>08</h3>
                  <span>Pending Quotes</span>
                </div>
                <div className="card home-stat-card">
                  <h3>{user.role === 'provider' ? '128' : '₦25k'}</h3>
                  <span>{user.role === 'provider' ? 'Total Jobs' : 'Total Spent'}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="section recent-activity">
            <div className="container">
              <div className="section-header">
                <h2>Recent Activity</h2>
                <p>Track your latest delivery requests.</p>
              </div>
              <div className="card activity-summary-card">
                <div className="activity-item">
                  <div className="activity-info">
                    <strong>ORD-7721</strong>
                    <span>London → Manchester</span>
                  </div>
                  <span className="status-tag in-transit">In Transit</span>
                </div>
                <div className="activity-item">
                  <div className="activity-info">
                    <strong>ORD-7720</strong>
                    <span>New York → Chicago</span>
                  </div>
                  <span className="status-tag delivered">Delivered</span>
                </div>
                <div className="activity-item">
                  <div className="activity-info">
                    <strong>ORD-7719</strong>
                    <span>Lagos → Abuja</span>
                  </div>
                  <span className="status-tag pending">Pending</span>
                </div>
              </div>
            </div>
          </section>

          <section className="section explore-providers">
            <div className="container">
              <div className="section-header">
                <h2>Top Providers for You</h2>
                <p>Based on your recent activity and location.</p>
              </div>
              <FeaturedCompanies />
            </div>
          </section>
        </>
      ) : (
        /* GUEST VIEW */
        <>
          <HowItWorks />
          
          <FeaturedCompanies />
          
          <section className="section routes-section">
            <div className="container">
              <div className="section-header">
                <h2>Popular Delivery Routes</h2>
                <p>Most frequently used routes by our customers.</p>
              </div>
              
              <div className="grid routes-grid">
                {['London - Manchester', 'New York - Chicago', 'Lagos - Abuja', 'Berlin - Munich'].map((route, i) => (
                  <div key={i} className="route-pill">
                    <Navigation size={18} className="route-icon" />
                    <span>{route}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section testimonials">
            <div className="container">
              <div className="section-header">
                <h2>What Our Users Say</h2>
              </div>
              
              <div className="grid testimonial-grid">
                <div className="card testimonial-card">
                  <Quote size={40} className="quote-icon" />
                  <p>"ShipWay made it so easy to find a provider for my cross-country move. Saved me 30% on costs!"</p>
                  <div className="user-info">
                    <strong>Sarah Johnson</strong>
                    <span>Small Business Owner</span>
                  </div>
                </div>
                <div className="card testimonial-card">
                  <Quote size={40} className="quote-icon" />
                  <p>"The real-time updates and multiple quotes helped me choose the fastest option for my urgent delivery."</p>
                  <div className="user-info">
                    <strong>Michael Chen</strong>
                    <span>E-commerce Vendor</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );

};

export default Home;
