import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Startup Marketplace</h3>
            <p style={{ color: 'var(--secondary-text)', marginBottom: '1rem' }}>
              Connecting startup founders with entrepreneurs and investors for seamless acquisitions and investments.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" className="footer-link">Twitter</a>
              <a href="#" className="footer-link">LinkedIn</a>
              <a href="#" className="footer-link">GitHub</a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Platform</h3>
            <ul className="footer-links">
              <li><Link to="/explore" className="footer-link">Browse Startups</Link></li>
              <li><Link to="/how-it-works" className="footer-link">How It Works</Link></li>
              <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
              <li><Link to="/register" className="footer-link">Get Started</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Company</h3>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
              <li><a href="#" className="footer-link">Cookie Policy</a></li>
              <li><a href="#" className="footer-link">GDPR</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Startup Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;