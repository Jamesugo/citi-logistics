import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Truck } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <Truck size={24} color="var(--primary-light)" />
            <span>ShipWay</span>
          </div>
          <p>Your trusted marketplace for logistics and delivery services.</p>
          <div className="social-links">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Services</h3>
          <ul>
            <li><a href="#">Same Day Delivery</a></li>
            <li><a href="#">International Shipping</a></li>
            <li><a href="#">Bulk Transport</a></li>
            <li><a href="#">Express Courier</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Join as Provider</a></li>
            <li><a href="#">Success Stories</a></li>
            <li><a href="#">Contact Support</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} ShipWay Logistics Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
