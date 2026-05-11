import React, { useState, useMemo, useEffect } from 'react';
import { Star, Clock, DollarSign, Filter, Search as SearchIcon, MapPin, ArrowRight, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { getCompanies } from '../data/companies';
import './SearchResults.css';

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pickup = searchParams.get('pickup') || '';
  const delivery = searchParams.get('delivery') || '';

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    price: 50000,
    types: [],
    rating: 0
  });

  const allCompanies = useMemo(() => getCompanies(), []);

  const filteredResults = useMemo(() => {
    return allCompanies.filter(result => {
      const priceMatch = result.price <= filters.price;
      const typeMatch = filters.types.length === 0 || filters.types.includes(result.type);
      const ratingMatch = result.rating >= filters.rating;
      return priceMatch && typeMatch && ratingMatch;
    });
  }, [filters, allCompanies]);

  const toggleType = (type) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type) 
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
  };

  return (
    <div className="search-page">
      <div className="search-header-strip">
        <div className="container strip-container">
          <div className="search-summary">
            <div className="summary-loc">
              <MapPin size={16} />
              <span>{pickup || 'Anywhere'}</span>
            </div>
            <ArrowRight size={16} className="summary-arrow" />
            <div className="summary-loc">
              <MapPin size={16} />
              <span>{delivery || 'Anywhere'}</span>
            </div>
          </div>
          <button className="mobile-filter-toggle" onClick={() => setShowMobileFilters(true)}>
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="search-layout container">
        <aside className={`filters-sidebar ${showMobileFilters ? 'mobile-active' : ''}`}>
          <div className="filters-card card">
            <div className="filters-header">
              <h3>Filters</h3>
              <button className="clear-all" onClick={() => setFilters({ price: 50000, types: [], rating: 0 })}>Reset</button>
              <button className="mobile-close" onClick={() => setShowMobileFilters(false)}>Done</button>
            </div>

            
            <div className="filter-section">
              <div className="section-title">
                <DollarSign size={16} />
                <span>Max Budget</span>
              </div>
              <div className="price-display">₦{filters.price.toLocaleString()}</div>
              <input 
                type="range" 
                min="500" 
                max="50000" 
                step="500"
                value={filters.price} 
                onChange={(e) => setFilters({...filters, price: parseInt(e.target.value)})} 
                className="custom-range"
              />
              <div className="range-labels">
                <span>₦500</span>
                <span>₦50k+</span>
              </div>
            </div>


            <div className="filter-divider"></div>

            <div className="filter-section">
              <div className="section-title">
                <Star size={16} />
                <span>Min Rating</span>
              </div>
              <div className="rating-options">
                {[4.5, 4.0, 3.5, 0].map(r => (
                  <button 
                    key={r}
                    className={`rating-btn ${filters.rating === r ? 'active' : ''}`}
                    onClick={() => setFilters({...filters, rating: r})}
                  >
                    {r === 0 ? 'Any' : `${r}+`}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-divider"></div>

            <div className="filter-section">
              <div className="section-title">
                <Filter size={16} />
                <span>Service Type</span>
              </div>
              <div className="type-list">
                {['Standard', 'Express', 'Freight', 'International', 'Same Day'].map(type => (
                  <label key={type} className="custom-checkbox">
                    <input 
                      type="checkbox" 
                      checked={filters.types.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    <span className="checkmark"></span>
                    <span className="type-label">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="results-container">
          <div className="results-info">
            <h2>{filteredResults.length} Available Services</h2>
            <div className="results-sort">
              <span>Sort by:</span>
              <button className="sort-btn">
                Best Match
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
          
          <div className="results-grid">
            {filteredResults.length > 0 ? (
              filteredResults.map(result => (
                <div 
                  key={result.id} 
                  className="result-card card animate-slide clickable-card"
                  onClick={() => navigate(`/company/${result.id}`)}
                >
                  <div className="result-top">
                    <div className="company-info">
                      <div className="logo-box">
                        <img src={result.logo} alt={result.name} />
                      </div>
                      <div className="name-box">
                        <h3>{result.name}</h3>
                        <div className="rating-tag">
                          <Star size={12} fill="currentColor" />
                          <span>{result.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="price-box">
                      <span className="price-label">Starts from</span>
                      <span className="price-value">₦{result.price.toLocaleString()}</span>
                    </div>

                  </div>
                  
                  <p className="result-desc">{result.description}</p>
                  
                  <div className="result-features">
                    <div className="feature">
                      <Clock size={14} />
                      <span>{result.deliveryTime}</span>
                    </div>
                    <div className="feature">
                      <ShieldCheckIcon size={14} />
                      <span className="type-tag-small">{result.type}</span>
                    </div>
                  </div>
                  
                  <div className="result-footer" onClick={(e) => e.stopPropagation()}>
                    <a 
                      href={`https://wa.me/${(result.whatsapp || '+2348000000000').replace(/\D/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-results card">
                <SearchIcon size={48} />
                <h3>No matches found</h3>
                <p>We couldn't find any services matching your current filters.</p>
                <button className="btn btn-primary" onClick={() => setFilters({ price: 50000, types: [], rating: 0 })}>
                  Clear All Filters
                </button>
              </div>

            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const ShieldCheckIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default SearchResults;
