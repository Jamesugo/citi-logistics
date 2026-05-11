import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, MessageCircle, Building2, 
  MapPin, Edit3, Save, X, Camera, Truck, Globe, DollarSign
} from 'lucide-react';
import { updateProvider } from '../data/companies';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('shipway_user');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);
    setFormData(parsedUser);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('shipway_user', JSON.stringify(formData));
      
      if (formData.role === 'provider') {
        updateProvider(formData);
      }
      
      setUser(formData);
      setIsEditing(false);
      setLoading(false);
    }, 800);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  if (!user) return <div className="profile-loading">Loading profile...</div>;

  const isProvider = user.role === 'provider';

  return (
    <div className="profile-page animate-fade">
      <div className="profile-container container">
        <div className="profile-header">
          <div className="profile-cover" />
          <div className="profile-header-content">
            <div className="profile-avatar-wrapper">
              <img 
                src={user.logo || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
                alt={user.name} 
                className="profile-avatar" 
              />
              {isEditing && (
                <button className="change-avatar-btn" title="Change Avatar">
                  <Camera size={18} />
                </button>
              )}
            </div>
            <div className="profile-name-section">
              <h1>{user.name}</h1>
              <p className="profile-role">
                {isProvider ? <><Building2 size={16} /> Logistics Provider</> : <><User size={16} /> Shipper Account</>}
              </p>
            </div>
            <div className="profile-actions">
              {!isEditing ? (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  <Edit3 size={18} />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="btn btn-ghost" onClick={handleCancel} disabled={loading}>
                    <X size={18} />
                    <span>Cancel</span>
                  </button>
                  <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                    {loading ? <span className="spinner-sm" /> : <><Save size={18} /> <span>Save Changes</span></>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-main-card card">
            <div className="card-header">
              <h3>General Information</h3>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <div className={`input-wrapper ${isEditing ? 'editing' : ''}`}>
                  <User size={18} />
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name || ''} 
                    onChange={handleInputChange}
                    readOnly={!isEditing} 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <div className={`input-wrapper ${isEditing ? 'editing' : ''}`}>
                  <Mail size={18} />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email || ''} 
                    onChange={handleInputChange}
                    readOnly={!isEditing} 
                  />
                </div>
              </div>

              {/* Specific fields requested by user */}
              <div className="form-group">
                <label>Contact Phone Number</label>
                <div className={`input-wrapper ${isEditing ? 'editing' : ''}`}>
                  <Phone size={18} />
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="+234 ..."
                    value={formData.phone || ''} 
                    onChange={handleInputChange}
                    readOnly={!isEditing} 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>WhatsApp Contact</label>
                {isEditing ? (
                  <div className="input-wrapper editing">
                    <MessageCircle size={18} />
                    <input 
                      type="tel" 
                      name="whatsapp"
                      placeholder="+234 ..."
                      value={formData.whatsapp || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  formData.whatsapp ? (
                    <a 
                      href={`https://wa.me/${formData.whatsapp.replace(/\D/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="whatsapp-btn-link"
                    >
                      <MessageCircle size={18} />
                      <span>Chat on WhatsApp</span>
                    </a>
                  ) : (
                    <div className="input-wrapper">
                      <MessageCircle size={18} />
                      <span className="text-muted">Not provided</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {isProvider && (
            <div className="profile-side-grid">
              <div className="profile-company-card card">
                <div className="card-header">
                  <h3>Company Details</h3>
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <div className={`input-wrapper ${isEditing ? 'editing' : ''}`}>
                    <Building2 size={18} />
                    <input 
                      type="text" 
                      name="companyName"
                      value={formData.companyName || ''} 
                      onChange={handleInputChange}
                      readOnly={!isEditing} 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Service Type</label>
                  <div className={`input-wrapper ${isEditing ? 'editing' : ''}`}>
                    <Truck size={18} />
                    <select 
                      name="type"
                      value={formData.type || 'Standard'} 
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Express">Express</option>
                      <option value="Same Day">Same Day</option>
                      <option value="Freight">Freight</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Starting Price (₦)</label>
                  <div className={`input-wrapper ${isEditing ? 'editing' : ''}`}>
                    <DollarSign size={18} />
                    <input 
                      type="number" 
                      name="price"
                      value={formData.price || ''} 
                      onChange={handleInputChange}
                      readOnly={!isEditing} 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Brief Description</label>
                  <textarea 
                    name="description"
                    className={isEditing ? 'editing' : ''}
                    value={formData.description || ''} 
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    rows="3"
                  />
                </div>
              </div>

              <div className="profile-stats-card card">
                <div className="card-header">
                  <h3>Performance</h3>
                </div>
                <div className="profile-stat-item">
                  <span className="stat-label">Member Since</span>
                  <span className="stat-value">Oct 2023</span>
                </div>
                <div className="profile-stat-item">
                  <span className="stat-label">Total Deliveries</span>
                  <span className="stat-value">128</span>
                </div>
                <div className="profile-stat-item">
                  <span className="stat-label">Rating</span>
                  <span className="stat-value">⭐ 4.9</span>
                </div>
              </div>
            </div>
          )}

          {!isProvider && (
            <div className="profile-side-grid">
              <div className="profile-address-card card">
                <div className="card-header">
                  <h3>Shipping Address</h3>
                </div>
                <div className="form-group">
                  <label>Default Address</label>
                  <div className={`input-wrapper ${isEditing ? 'editing' : ''}`}>
                    <MapPin size={18} />
                    <textarea 
                      name="address"
                      value={formData.address || 'No address set'} 
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
