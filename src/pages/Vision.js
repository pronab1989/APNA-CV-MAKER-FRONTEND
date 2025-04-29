import React from 'react';
import { Link } from 'react-router-dom';
import './Vision.css';

const Vision = () => {
  return (
    <div className="vision-page">
      <div className="container py-5">
        <h1>Our Vision</h1>
        <div className="content-section">
          <div className="vision-content">
            <h2>🌟 Empowering India’s Youth to Dream Bigger</h2>
            <p>At Apna CV Maker, At Apna CV Maker, we believe that talent should never be limited by tools. 
              In a world where opportunity often depends on presentation, we stand for every student, fresher, and dreamer who dares to take the first step toward their career.
Built for the youth of India, our platform is more than just a resume builder — it’s a movement. We’re here to break barriers, to ensure that no one has to spend hundreds of rupees just to create a resume. Whether you're in a metro city or a remote town, 
Apna CV Maker brings professional CV building to your fingertips — mobile-friendly, budget-free, and always accessible.</p>
            
        <h2>Our Mission</h2>
            <p>To empower every aspiring professional — regardless of background or income — with a powerful, intuitive, and affordable CV creation tool that helps them shine in any job market.</p>
            
            <h2>Core Values</h2>
            <ul>
              <li>Designed for Real People: A smooth, mobile-first experience for users across all devices.</li>
              <li>Innovation with Purpose: Smart resume features that adapt to your needs.</li>
              <li>Accessible to All: Always free, always open — because no one should pay to chase opportunity.</li>
              <li>Uplifting the Underserved: Helping those who can’t afford premium services get world-class tools for free.</li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Vision; 