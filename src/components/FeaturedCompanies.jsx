import React from 'react';
import { Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCompanies } from '../data/companies';
import './FeaturedCompanies.css';

const FeaturedCompanies = () => {
  // Just show the first 3 for the "featured" section
  const featured = getCompanies().slice(0, 3);


  return (
    <section className="section featured-section">
      <div className="container">
        <div className="section-header">
          <div className="header-badge">Top Rated</div>
          <h2>Partnered with the Best</h2>
          <p>We work with vetted logistics providers to ensure your delivery is handled with care.</p>
        </div>
        
        <div className="company-grid">
          {featured.map((company, index) => (
            <div key={company.id} className="company-card card animate-slide" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="company-badge-top">
                <ShieldCheck size={14} />
                <span>Verified</span>
              </div>
              
              <div className="card-body">
                <div className="logo-circle">
                  <img src={company.logo} alt={company.name} />
                </div>
                <h3>{company.name}</h3>
                <div className="company-rating">
                  <Star size={14} fill="#fbbf24" color="#fbbf24" />
                  <strong>{company.rating}</strong>
                  <span>(1.2k+ reviews)</span>
                </div>
                <div className="company-tags">
                  {company.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="card-footer">
                <div className="price-tag">
                  From <strong>₦{company.price.toLocaleString()}</strong>
                </div>

                <div className="card-actions-row">
                  <Link to={`/company/${company.id}`} className="view-btn">
                    Details
                  </Link>
                  <a 
                    href={`https://wa.me/${(company.whatsapp || '+2348000000000').replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-xs"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer">
          <Link to="/search" className="btn btn-primary">
            <span>Explore All 500+ Providers</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;
