import React from 'react';
import { Link } from 'react-router-dom';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="container py-5">
        <h1>Terms and Conditions</h1>
        <div className="content-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using Apna CV Maker, you accept and agree to be bound by these Terms and Conditions.</p>

          <h2>2. Use of Service</h2>
          <p>Our CV maker service is provided for personal and professional use. You agree to use the service responsibly and legally.</p>

          <h2>3. User Content</h2>
          <p>You retain all rights to the information you provide. You are responsible for the accuracy of information in your CV.</p>

          <h2>4. Service Limitations</h2>
          <ul>
            <li>We provide CV templates and generation tools "as is"</li>
            <li>We do not guarantee employment or interview success</li>
            <li>Service availability may vary and maintenance may be required</li>
          </ul>

          <h2>5. Privacy</h2>
          <p>Your use of our service is also governed by our <Link to="/privacy">Privacy Policy</Link>.</p>

          <h2>6. Modifications</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.</p>

          <h2>7. Intellectual Property</h2>
          <p>Our templates, designs, and platform features are protected by copyright and other intellectual property rights.</p>

          <h2>8. Limitation of Liability</h2>
          <p>We are not liable for any damages arising from the use or inability to use our service.</p>

          <h2>9. Contact</h2>
          <p>For any questions regarding these terms, please contact us at info@boosta.in</p>
        </div>
        <div className="mt-4">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Terms; 