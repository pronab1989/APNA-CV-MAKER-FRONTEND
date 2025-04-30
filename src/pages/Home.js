import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import Footer from '../components/Footer';
import './Home.css';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Navbar />
      
      {/* Google AdSense Script */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="header-title">Apna CV Maker</h1>
            <nav className="header-nav">
              <Link to="/vision" className="nav-link">Our Vision</Link>
              <Link to="/blog" className="nav-link">Blog</Link>
              <Link to="/careers" className="nav-link">Careers</Link>
              <Link to="/products" className="nav-link">Our Products</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="hero-title">Create Your Professional Resume in Minutes</h1>
              <p className="hero-description">
                Stand out from the crowd with a professionally designed resume that highlights your skills and experience.
                Our easy-to-use platform helps you create a perfect resume that gets noticed by employers.
              </p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/auth')}
              >
                Choose Your Template <FaArrowRight className="ms-2" />
              </button>
            </div>
            <div className="col-md-6">
              <img 
                src="/resume-illustration.svg" 
                alt="Resume Creation" 
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <h3>Professional Templates</h3>
                <p>Choose from a variety of professionally designed templates that suit your industry and experience level.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <h3>Easy to Use</h3>
                <p>Our intuitive interface makes it simple to create and customize your resume in minutes.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <h3>Download as PDF</h3>
                <p>Download your resume in PDF format, ready to share with potential employers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="container text-center">
          <h2>Ready to Create Your Resume?</h2>
          <p>Join thousands of professionals who have created their resumes with Apna CV Maker</p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/auth')}
          >
            Get Started Now <FaArrowRight className="ms-2" />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home; 