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
            <h2>Empowering Career Growth</h2>
            <p>At Apna CV Maker, we envision a world where everyone has access to professional tools that help them showcase their true potential. Our mission is to democratize the resume creation process and help job seekers stand out in today's competitive market.</p>
            
            <h2>Our Mission</h2>
            <p>To provide an intuitive, accessible, and powerful CV creation platform that helps individuals at every stage of their career journey create compelling resumes that highlight their unique skills and experiences.</p>
            
            <h2>Core Values</h2>
            <ul>
              <li>User-Centric Design</li>
              <li>Innovation in Resume Creation</li>
              <li>Accessibility for All</li>
              <li>Continuous Improvement</li>
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