import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, MapPin, Calendar, CheckCircle, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import './DeliveryRequest.css';

const DeliveryRequest = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    pickup: '',
    delivery: '',
    date: '',
    weight: '',
    packageType: 'Box',
    notes: ''
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="request-page container">
        <div className="success-card card animate-in">
          <div className="success-icon-wrapper">
            <CheckCircle size={60} color="var(--success)" />
          </div>
          <h2>Request Submitted Successfully!</h2>
          <p>Your request has been sent to the providers. You will receive notifications in your dashboard shortly.</p>
          <div className="success-actions">
            <Link to="/dashboard" className="primary-btn">Go to Dashboard</Link>
            <Link to="/" className="secondary-btn">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="request-page">
      <div className="container narrow-container">
        <div className="request-header">
          <h1>Request a Delivery</h1>
          <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
          </div>
        </div>

        <form className="card request-form animate-in" onSubmit={handleSubmit}>
          {step === 1 ? (
            <div className="form-step">
              <h3>Locations & Details</h3>
              <div className="form-group">
                <label>Pickup Location</label>
                <div className="input-icon-wrapper">
                  <MapPin size={18} />
                  <input 
                    type="text" 
                    placeholder="Street address, city, zip" 
                    value={formData.pickup}
                    onChange={(e) => setFormData({...formData, pickup: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Delivery Location</label>
                <div className="input-icon-wrapper">
                  <MapPin size={18} />
                  <input 
                    type="text" 
                    placeholder="Street address, city, zip" 
                    value={formData.delivery}
                    onChange={(e) => setFormData({...formData, delivery: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Pickup Date</label>
                  <div className="input-icon-wrapper">
                    <Calendar size={18} />
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <div className="input-icon-wrapper">
                    <Package size={18} />
                    <input 
                      type="number" 
                      placeholder="e.g. 10" 
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
              <button type="button" className="primary-btn-full" onClick={handleNext}>
                Next Step <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="form-step">
              <h3>Package Type & Notes</h3>
              <div className="form-group">
                <label>Package Type</label>
                <select 
                  className="form-select"
                  value={formData.packageType}
                  onChange={(e) => setFormData({...formData, packageType: e.target.value})}
                >
                  <option>Box</option>
                  <option>Pallet</option>
                  <option>Document</option>
                  <option>Furniture</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Additional Notes</label>
                <textarea 
                  className="form-textarea"
                  placeholder="Fragile items, specific pickup instructions, etc." 
                  rows="4"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                ></textarea>
              </div>
              <div className="form-actions-row">
                <button type="button" className="secondary-btn" onClick={handleBack}>
                  <ArrowLeft size={18} /> Back
                </button>
                <button type="submit" className="primary-btn">
                  Submit Request
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="request-privacy-footer">
          <ShieldCheck size={18} />
          <span>Your data is protected and encrypted.</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryRequest;
