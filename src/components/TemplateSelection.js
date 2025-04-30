import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TemplateSelection.css';

const TemplateSelection = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateType, isPaid) => {
    if (isPaid) {
      navigate('/form', { 
        state: { 
          templateType,
          requiresPayment: true,
          price: 27 // Price in INR
        } 
      });
    } else {
      navigate('/form', { 
        state: { 
          templateType,
          requiresPayment: false 
        } 
      });
    }
  };

  return (
    <div className="template-selection-container">
      <h1 className="main-title">Choose Your Professional Template</h1>
      <div className="templates-grid">
        {/* Fresher Template - Free */}
        <div className="template-card">
          <div className="template-image">
            <img src="/classic-template.jpg" alt="Fresher Template" />
          </div>
          <div className="template-info">
            <h2>Fresher Template</h2>
            <p>Perfect for new graduates and entry-level positions</p>
            <span className="price-tag">Free</span>
            <button 
              className="use-template-btn"
              onClick={() => handleTemplateSelect('fresher', false)}
            >
              Use This Template
            </button>
          </div>
        </div>

        {/* Student Template - Free */}
        <div className="template-card">
          <div className="template-image">
            <img src="/minimalist-template.jpg" alt="Student Template" />
          </div>
          <div className="template-info">
            <h2>Student Template</h2>
            <p>Ideal for students and internship applications</p>
            <span className="price-tag">Free</span>
            <button 
              className="use-template-btn"
              onClick={() => handleTemplateSelect('student', false)}
            >
              Use This Template
            </button>
          </div>
        </div>

        {/* Professional Template - Paid */}
        <div className="template-card">
          <div className="template-image">
            <img src="/modern-template.jpg" alt="Professional Template" />
          </div>
          <div className="template-info">
            <h2>Professional Template</h2>
            <p>For experienced professionals with proven track record</p>
            <span className="price-tag">₹27</span>
            <button 
              className="use-template-btn premium"
              onClick={() => handleTemplateSelect('professional', true)}
            >
              Use This Template
            </button>
          </div>
        </div>

        {/* Executive Template - Paid */}
        <div className="template-card">
          <div className="template-image">
            <img src="/modern-template.jpg" alt="Executive Template" />
          </div>
          <div className="template-info">
            <h2>Executive Template</h2>
            <p>Premium design for senior positions and leadership roles</p>
            <span className="price-tag">₹27</span>
            <button 
              className="use-template-btn premium"
              onClick={() => handleTemplateSelect('executive', true)}
            >
              Use This Template
            </button>
          </div>
        </div>

        {/* Creative Template - Paid */}
        <div className="template-card">
          <div className="template-image">
            <img src="/modern-template.jpg" alt="Creative Template" />
          </div>
          <div className="template-info">
            <h2>Creative Modern</h2>
            <p>Stand out with this modern and creative design</p>
            <span className="price-tag">₹27</span>
            <button 
              className="use-template-btn premium"
              onClick={() => handleTemplateSelect('creative', true)}
            >
              Use This Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection; 