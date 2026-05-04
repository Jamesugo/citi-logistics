import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, Mail, Lock, Eye, EyeOff, User, ArrowRight, Building2, Image as ImageIcon, FileText, DollarSign } from 'lucide-react';
import { saveProvider } from '../data/companies';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name: '', email: '', password: '', confirm: '', role: 'customer',
    companyName: '', logo: '', description: '', price: '', deliveryTime: '1-2 Days', type: 'Standard'
  });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    
    if (form.role === 'provider') {
      if (!form.companyName.trim()) e.companyName = 'Company name is required';
      if (!form.description.trim()) e.description = 'Description is required';
      if (!form.price) e.price = 'Price is required';
    }
    
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    
    setLoading(true);
    setTimeout(() => {
      const userData = {
        name: form.name,
        email: form.email,
        role: form.role,
        companyName: form.companyName,
        logo: form.logo || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=100',
        description: form.description,
        price: parseFloat(form.price),
        deliveryTime: form.deliveryTime,
        type: form.type,
        phone: '',
        whatsapp: ''
      };

      if (form.role === 'provider') {
        saveProvider(userData);
      }
      
      localStorage.setItem('shipway_user', JSON.stringify(userData));
      setLoading(false);
      navigate('/');
    }, 1200);
  };

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: '' });
  };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left">
        <Link to="/" className="auth-logo">
          <Truck size={32} />
          <span>ShipWay</span>
        </Link>
        <div className="auth-left-content">
          <h2>{form.role === 'customer' ? 'Join thousands of businesses using ShipWay' : 'Grow your logistics business with ShipWay'}</h2>
          <p>{form.role === 'customer' ? 'Compare logistics providers in minutes' : 'Reach more customers and manage your deliveries in one place'}</p>
          <div className="auth-features">
            {(form.role === 'customer' 
              ? ['Free to join', 'Instant quote comparison', 'Verified providers only', 'Secure payments']
              : ['Access to 10k+ shippers', 'Easy fleet management', 'Automated invoicing', 'Performance analytics']
            ).map(f => (
              <div key={f} className="auth-feature-item">
                <div className="feature-dot" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="auth-left-blob" />
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-box">
          <div className="auth-form-header">
            <h1>{form.role === 'customer' ? 'Create your account' : 'Provider Registration'}</h1>
            <p>{form.role === 'customer' ? 'Start comparing logistics providers in minutes' : 'List your company and start receiving requests'}</p>
          </div>

          {/* Role Selector */}
          <div className="role-selector">
            <button
              type="button"
              className={`role-btn ${form.role === 'customer' ? 'active' : ''}`}
              onClick={() => setForm({ ...form, role: 'customer' })}
            >
              📦 I'm a Shipper
            </button>
            <button
              type="button"
              className={`role-btn ${form.role === 'provider' ? 'active' : ''}`}
              onClick={() => setForm({ ...form, role: 'provider' })}
            >
              🚛 I'm a Provider
            </button>
          </div>

          <div className="auth-divider"><span>Enter your details</span></div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row-half">
              <div className="form-field">
                <label>Contact Name</label>
                <div className={`field-input ${errors.name ? 'error' : ''}`}>
                  <User size={18} />
                  <input type="text" placeholder="John Doe" value={form.name} onChange={set('name')} />
                </div>
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="form-field">
                <label>Email Address</label>
                <div className={`field-input ${errors.email ? 'error' : ''}`}>
                  <Mail size={18} />
                  <input type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} />
                </div>
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
            </div>

            {form.role === 'provider' && (
              <div className="provider-fields animate-fade">
                <div className="form-field">
                  <label>Company Name</label>
                  <div className={`field-input ${errors.companyName ? 'error' : ''}`}>
                    <Building2 size={18} />
                    <input type="text" placeholder="e.g. Lagos Fast Freight" value={form.companyName} onChange={set('companyName')} />
                  </div>
                  {errors.companyName && <span className="field-error">{errors.companyName}</span>}
                </div>

                <div className="form-field">
                  <label>Company Logo URL (Optional)</label>
                  <div className="field-input">
                    <ImageIcon size={18} />
                    <input type="text" placeholder="https://..." value={form.logo} onChange={set('logo')} />
                  </div>
                </div>

                <div className="form-field">
                  <label>Brief Service Description</label>
                  <div className={`field-input ${errors.description ? 'error' : ''}`}>
                    <FileText size={18} />
                    <input type="text" placeholder="What do you specialize in?" value={form.description} onChange={set('description')} />
                  </div>
                  {errors.description && <span className="field-error">{errors.description}</span>}
                </div>

                <div className="form-row-half">
                  <div className="form-field">
                    <label>Starting Price (₦)</label>
                    <div className={`field-input ${errors.price ? 'error' : ''}`}>
                      <DollarSign size={18} />
                      <input type="number" placeholder="5000" value={form.price} onChange={set('price')} />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Delivery Type</label>
                    <div className="field-input">
                      <Truck size={18} />
                      <select value={form.type} onChange={set('type')} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 600 }}>
                        <option value="Standard">Standard</option>
                        <option value="Express">Express</option>
                        <option value="Same Day">Same Day</option>
                        <option value="Freight">Freight</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="form-row-half">
              <div className="form-field">
                <label>Password</label>
                <div className={`field-input ${errors.password ? 'error' : ''}`}>
                  <Lock size={18} />
                  <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={set('password')} />
                  <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              <div className="form-field">
                <label>Confirm</label>
                <div className={`field-input ${errors.confirm ? 'error' : ''}`}>
                  <Lock size={18} />
                  <input type="password" placeholder="••••••••" value={form.confirm} onChange={set('confirm')} />
                </div>
                {errors.confirm && <span className="field-error">{errors.confirm}</span>}
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : <>{form.role === 'customer' ? 'Create Account' : 'Register Company'} <ArrowRight size={18} /></>}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
