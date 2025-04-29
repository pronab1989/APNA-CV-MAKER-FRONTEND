import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h5>Terms & Conditions</h5>
            <Link to="/terms">View Terms</Link>
          </div>
          <div className="footer-section">
            <h5>Privacy Policy</h5>
            <Link to="/privacy">View Privacy Policy</Link>
          </div>
          <div className="footer-section">
            <h5>Reach Out</h5>
            <p>Narendra Nagar</p>
            <p>Nagpur, Maharashtra 440015</p>
            <p>India</p>
            <a href="mailto:info@boosta.in">info@boosta.in</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Apna CV Maker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 