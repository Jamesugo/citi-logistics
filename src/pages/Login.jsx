import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Simulate auth — in production replace with real API call
    setTimeout(() => {
      const userData = {
        name: 'John Doe',
        email: form.email,
        role: form.email.includes('provider') ? 'provider' : 'customer',
        companyName: form.email.includes('provider') ? 'Lagos Fast Freight' : '',
        phone: '+234 800 000 0000',
        whatsapp: '+234 800 000 0000',
        logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=100'
      };
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
          <h2>Connect with 500+ verified logistics providers</h2>
          <p>Find, compare, and book delivery services instantly.</p>
          <div className="auth-features">
            {['Real-time tracking', 'Best price guarantee', '24/7 customer support', 'Insured deliveries'].map(f => (
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
            <h1>Welcome back</h1>
            <p>Sign in to your ShipWay account</p>
          </div>

          <button className="google-btn">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
            Continue with Google
          </button>

          <div className="auth-divider"><span>or continue with email</span></div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label>Email address</label>
              <div className={`field-input ${errors.email ? 'error' : ''}`}>
                <Mail size={18} />
                <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
              </div>
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-field">
              <div className="field-label-row">
                <label>Password</label>
                <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
              </div>
              <div className={`field-input ${errors.password ? 'error' : ''}`}>
                <Lock size={18} />
                <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={set('password')} />
                <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : <>{`Sign In`} <ArrowRight size={18} /></>}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
