import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowRight } from 'react-icons/fa6';
import './Home.css'; // Import the CSS file

const Home = () => {
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const templates = [
    {
      id: 1,
      name: 'Professional Classic',
      description: 'Clean and traditional design perfect for all industries',
      image: '/templates/classic.png'
    },
    {
      id: 2,
      name: 'Modern Creative',
      description: 'Contemporary design with creative elements',
      image: '/templates/modern.png'
    },
    {
      id: 3,
      name: 'Minimalist',
      description: 'Simple and elegant design focusing on content',
      image: '/templates/minimal.png'
    }
  ];

  const handleTemplateSelect = (template) => {
    navigate('/form', { state: { template } });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:info@boosta.in?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(
      `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\n${contactForm.message}`
    )}`;
    window.location.href = mailtoLink;
    setShowContactModal(false);
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const faqs = [
    {
      question: "How do I create my resume?",
      answer: "Simply click on 'Create Resume' and fill out the form with your personal information, education, experience, and skills. Our system will generate a professional resume for you."
    },
    {
      question: "Can I download my resume in different formats?",
      answer: "Yes, you can download your resume in PDF format. We're working on adding more format options in the future."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! We take data security seriously. Your information is encrypted and stored securely. We never share your data with third parties."
    },
    {
      question: "Can I edit my resume after creating it?",
      answer: "Yes, you can edit your resume at any time. Just log in to your account and make the necessary changes."
    },
    {
      question: "Do you offer resume templates?",
      answer: "Yes, we offer multiple professional templates to choose from. You can select the one that best suits your needs."
    }
  ];

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1 className="header-title">Apna CV Maker</h1>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="hero-title">Create Your Professional Resume in Minutes</h1>
              <p className="hero-description">Stand out from the crowd with a professionally designed resume that highlights your skills and experience.</p>
              <button 
                className="btn btn-primary btn-lg me-3"
                onClick={() => navigate('/form')}
              >
                Create Resume <FaArrowRight className="ms-2" />
              </button>
              <button 
                className="btn btn-outline-primary btn-lg"
                onClick={() => setShowContactModal(true)}
              >
                Contact Us <FaEnvelope className="ms-2" />
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

      {/* Templates Section */}
      <div className="templates-section">
        <div className="container">
          <h2 className="section-title">Choose Your Professional Template</h2>
          <div className="row">
            {templates.map((template) => (
              <div className="col-md-4 mb-4" key={template.id}>
                <div className="template-card">
                  <div className="template-preview">
                    <img 
                      src={template.image} 
                      alt={template.name}
                      className="template-image"
                    />
                  </div>
                  <div className="template-info">
                    <h3 className="template-title">{template.name}</h3>
                    <p className="template-description">{template.description}</p>
                    <button 
                      className="btn btn-primary w-100"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      Use This Template
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Frequently Asked Questions</h2>
          <div className="accordion" id="faqAccordion">
            {faqs.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h3 className="accordion-header">
                  <button 
                    className="accordion-button collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target={`#faq${index}`}
                  >
                    {faq.question}
                  </button>
                </h3>
                <div 
                  id={`faq${index}`} 
                  className="accordion-collapse collapse" 
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contact Us</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowContactModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleContactSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Subject</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea 
                      className="form-control" 
                      rows="4"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 