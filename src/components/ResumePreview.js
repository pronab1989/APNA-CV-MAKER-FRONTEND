import React from 'react';
import { jsPDF } from 'jspdf';
import { useLocation, useNavigate } from 'react-router-dom';
import FresherTemplate from './templates/FresherTemplate';
import StudentTemplate from './templates/StudentTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';

const ResumePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, templateType, requiresPayment } = location.state || {};

  if (!formData) {
    return (
      <div className="container my-5 text-center">
        <p className="text-danger">No data found. Please fill the form first.</p>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => navigate('/form')}
        >
          Go to Form
        </button>
      </div>
    );
  }

  const generatePDF = async () => {
    try {
      if (!formData) {
        console.error('formData is undefined');
        return;
      }
      // Set jsPDF to A4 size
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const margin = 6.35; // 0.25 inch in mm
      const pageWidth = 210; // A4 width in mm
      // windowWidth: 794px = 210mm at 96dpi
      const windowWidth = 794;
      // Render template to string
      const container = document.createElement('div');
      document.body.appendChild(container);
      import('react-dom/server').then(ReactDOMServer => {
        const Template = getTemplateComponent(templateType);
        const htmlString = ReactDOMServer.renderToString(<Template formData={formData} />);
        doc.html(htmlString, {
          callback: function(doc) {
            doc.save(`resume_${formData.firstName}_${formData.lastName}.pdf`);
            localStorage.removeItem('resumeFormData');
            document.body.removeChild(container);
          },
          x: margin,
          y: margin,
          width: pageWidth - 2 * margin,
          windowWidth: windowWidth
        });
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const getTemplateComponent = (type) => {
    switch (type) {
      case 'fresher':
        return FresherTemplate;
      case 'student':
        return StudentTemplate;
      case 'professional':
      case 'executive':
      case 'creative':
        return ProfessionalTemplate;
      default:
        return FresherTemplate;
    }
  };

  const Template = getTemplateComponent(templateType);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Resume Preview</h2>
        <div>
          <button 
            className="btn btn-primary me-2"
            onClick={generatePDF}
          >
            Download PDF
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={() => navigate('/form')}
          >
            Back to Form
          </button>
        </div>
      </div>
      
      {/* Template Preview */}
      <Template formData={formData} />
    </div>
  );
};

export default ResumePreview;
