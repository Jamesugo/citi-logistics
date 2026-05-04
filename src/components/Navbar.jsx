import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Truck, LayoutDashboard, LogOut } from 'lucide-react';

import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('shipway_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    else setUser(null);
  }, [pathname]);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('shipway_user');
    setUser(null);
    window.location.href = '/';
  };



  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Companies' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">

        <Link to="/" className="logo">
          <div className="logo-icon-wrapper">
            <Truck className="logo-icon" size={24} />
          </div>
          <span>ShipWay</span>
        </Link>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={pathname === to ? 'nav-link active' : 'nav-link'}
            >
              {label}
            </Link>
          ))}
          <div className="nav-mobile-only">
            {!user ? (
              <>
                <Link to="/login" className="nav-link">Log in</Link>
                <Link to="/signup" className="signup-btn-mobile">Sign up</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="nav-link">Profile</Link>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <button onClick={handleLogout} className="nav-link logout-btn-link">Logout</button>
              </>
            )}
          </div>
        </div>

        <div className="nav-right">
          <div className="nav-actions">
            <Link to="/dashboard" className={`nav-icon-btn ${pathname === '/dashboard' ? 'active' : ''}`} title="Dashboard">
              <LayoutDashboard size={20} />
            </Link>
          </div>
          <div className="nav-divider" />
          
          {!user ? (
            <div className="auth-links">
              <Link to="/login" className="login-link">Log in</Link>
              <Link to="/signup" className="signup-btn">Get Started</Link>
            </div>
          ) : (
            <div className="user-nav-profile">
              <Link to="/profile" className="nav-profile-link">
                <img 
                  src={user.logo || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
                  alt={user.name} 
                  className="nav-avatar"
                />
                <span className="nav-user-name">{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={handleLogout} className="logout-btn" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>
    </nav>
  );
};


export default Navbar;
