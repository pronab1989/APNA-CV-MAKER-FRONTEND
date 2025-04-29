import React from 'react';
import { Link } from 'react-router-dom';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="container py-5">
        <h1>Privacy Policy</h1>
        <div className="content-section">
          <h2>1. Information We Collect</h2>
          <p>We collect information that you provide directly to us when creating your CV, including:</p>
          <ul>
            <li>Personal information (name, contact details)</li>
            <li>Professional information (work history, education)</li>
            <li>Skills and qualifications</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Generate your CV based on your inputs</li>
            <li>Improve our CV templates and services</li>
            <li>Communicate with you about our services</li>
          </ul>

          <h2>3. Information Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

          <h2>4. Data Storage</h2>
          <p>Your data is stored securely on our servers. We retain your information only as long as necessary to provide our services.</p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
          </ul>

          <h2>6. Cookies</h2>
          <p>We use cookies to enhance your experience on our website. You can control cookie settings through your browser.</p>

          <h2>7. Third-Party Services</h2>
          <p>We may use third-party services for analytics and improvement of our services. These services have their own privacy policies.</p>

          <h2>8. Changes to Privacy Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

          <h2>9. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <p>Email: info@boosta.in</p>
          <p>Address: Narendra Nagar, Nagpur, Maharashtra 440015, India</p>
        </div>
        <div className="mt-4">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 