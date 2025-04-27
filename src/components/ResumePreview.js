import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useLocation, useNavigate } from 'react-router-dom';
import ResumePDFView from './ResumePDFView';

const ResumePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, resumeId } = location.state || {};
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

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

  const formatDate = (date) => {
    if (!date) return 'Present';
    return date instanceof Date
      ? date.toLocaleDateString()
      : new Date(date).toLocaleDateString();
  };

  function formatDateDMY(date) {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
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
      // Render ResumePDFView to string
      const container = document.createElement('div');
      document.body.appendChild(container);
      import('react-dom/server').then(ReactDOMServer => {
        const htmlString = ReactDOMServer.renderToString(<ResumePDFView formData={formData} />);
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

  // Razorpay payment handler
  const handleRazorpayPayment = () => {
    const options = {
      key: 'rzp_test_3uGujCsLHHfkvt', // Updated with your Razorpay test key
      amount: 2700, // 27 INR in paise
      currency: 'INR',
      name: 'Buy me a coffee',
      description: 'Please appreciate my work, buy a cup of coffee for me',
      handler: function (response) {
        setShowPaymentModal(false);
        setIsPaymentSuccess(true);
        setTimeout(() => {
          generatePDF();
          setIsPaymentSuccess(false);
        }, 500);
      },
      prefill: {
        name: '',
        email: '',
      },
      theme: {
        color: '#0d6efd',
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Resume Preview</h2>
        <div>
          <button 
            className="btn btn-primary me-2"
            onClick={() => setShowPaymentModal(true)}
          >
            Download Modern PDF
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={() => navigate('/form')}
          >
            Back to Form
          </button>
        </div>
      </div>
      {/* PDF Preview */}
      <ResumePDFView formData={formData} />
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Support My Work</h5>
                <button type="button" className="btn-close" onClick={() => setShowPaymentModal(false)}></button>
              </div>
              <div className="modal-body text-center">
                <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Ready for your new career adventure? If you appreciate my effort, buy me a coffee and help me keep building great tools! ☕</p>
                <p style={{ fontSize: '1.2rem', color: '#0d6efd' }}>Amount: ₹27 INR</p>
                <button className="btn btn-success" onClick={handleRazorpayPayment}>
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Payment Success Message */}
      {isPaymentSuccess && (
        <div className="alert alert-success text-center mt-3">Payment successful! Your download will start shortly.</div>
      )}
    </div>
  );
};

export default ResumePreview;
