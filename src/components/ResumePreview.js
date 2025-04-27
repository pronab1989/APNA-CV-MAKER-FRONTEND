import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useLocation, useNavigate } from 'react-router-dom';

const ResumePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, resumeId } = location.state || {};

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

      const doc = new jsPDF();
      const margin = 12.7; // 0.5 inch in mm
      const pageWidth = doc.internal.pageSize.getWidth();
      const template = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #2c3e50; color: white; padding: 20px; margin: -20px -20px 20px -20px;">
            <h1 style="text-align: center; margin-bottom: 10px; color: white;">${formData.firstName || ''} ${formData.lastName || ''}</h1>
            <div style="text-align: center; color: #ecf0f1;">
              <p style="margin: 5px 0;">${formData.phones?.[0] || ''}</p>
              <p style="margin: 5px 0;">${formData.emails?.[0] || ''}</p>
              <p style="margin: 5px 0;">${formData.dob ? `DOB-${formatDateDMY(formData.dob)}` : ''}</p>
              <p style="margin: 5px 0;">${formData.address || ''}</p>
            </div>
          </div>
          
          <div style="margin-bottom: 20px; background-color: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="border-bottom: 2px solid #3498db; padding-bottom: 5px; color: #2c3e50;">Summary</h2>
            <p style="color: #34495e;">${formData.summary || ''}</p>
          </div>

          <div style="margin-bottom: 20px; background-color: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="border-bottom: 2px solid #3498db; padding-bottom: 5px; color: #2c3e50;">Experience</h2>
            ${(formData.experienceList || []).map(exp => `
              <div style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 3px;">
                <h3 style="margin: 0; color: #2c3e50;">${exp.role || ''}</h3>
                <p style="margin: 5px 0; color: #3498db;">${exp.company || ''} | ${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}</p>
                <p style="color: #34495e;">${exp.responsibilities || ''}</p>
              </div>
            `).join('')}
            ${formData.currentJob ? `
              <div style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 3px;">
                <h3 style="margin: 0; color: #2c3e50;">${formData.currentJob.role || ''}</h3>
                <p style="margin: 5px 0; color: #3498db;">${formData.currentJob.company || ''} | ${formatDate(formData.currentJob.startDate)} - Present</p>
              </div>
            ` : ''}
          </div>

          <div style="margin-bottom: 20px; background-color: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="border-bottom: 2px solid #3498db; padding-bottom: 5px; color: #2c3e50;">Education</h2>
            ${(formData.educationList || []).map(edu => `
              <div style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 3px;">
                <h3 style="margin: 0; color: #2c3e50;">${edu.degree || ''}</h3>
                <p style="margin: 5px 0; color: #3498db;">${edu.school || ''} | ${edu.passingYear || ''}</p>
              </div>
            `).join('')}
          </div>

          <div style="margin-bottom: 20px; background-color: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="border-bottom: 2px solid #3498db; padding-bottom: 5px; color: #2c3e50;">Skills</h2>
            ${formData.technicalSkills?.length > 0 ? `
              <div style="margin-bottom: 10px; padding: 10px; background-color: #f8f9fa; border-radius: 3px;">
                <p style="margin: 0; color: #2c3e50;"><strong>Technical Skills:</strong> ${formData.technicalSkills.map(s => s.label).join(', ')}</p>
              </div>
            ` : ''}
            ${formData.nonTechnicalSkills?.length > 0 ? `
              <div style="padding: 10px; background-color: #f8f9fa; border-radius: 3px;">
                <p style="margin: 0; color: #2c3e50;"><strong>Soft Skills:</strong> ${formData.nonTechnicalSkills.map(s => s.label).join(', ')}</p>
              </div>
            ` : ''}
          </div>

          <div style="margin-bottom: 20px; background-color: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="border-bottom: 2px solid #3498db; padding-bottom: 5px; color: #2c3e50;">Projects</h2>
            ${(formData.projects || []).map(proj => `
              <div style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 3px;">
                <h3 style="margin: 0; color: #2c3e50;">${proj.title || ''}</h3>
                <p style="margin: 5px 0; color: #3498db;">Technologies: ${proj.technologies || ''}</p>
                <p style="color: #34495e;">${proj.description || ''}</p>
              </div>
            `).join('')}
          </div>

          ${formData.hobbies?.length > 0 ? `
            <div style="margin-bottom: 20px; background-color: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="border-bottom: 2px solid #3498db; padding-bottom: 5px; color: #2c3e50;">Hobbies</h2>
              <div style="padding: 10px; background-color: #f8f9fa; border-radius: 3px;">
                <p style="margin: 0; color: #34495e;">${formData.hobbies.map(h => h.label).join(', ')}</p>
              </div>
            </div>
          ` : ''}

          ${Object.keys(formData.socialLinks || {}).length > 0 ? `
            <div style="margin-bottom: 20px; background-color: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="border-bottom: 2px solid #3498db; padding-bottom: 5px; color: #2c3e50;">Social Links</h2>
              <div style="padding: 10px; background-color: #f8f9fa; border-radius: 3px;">
                ${Object.entries(formData.socialLinks).map(([platform, url]) => `
                  <p style="margin: 5px 0; color: #34495e;">${platform}: <a href="${url}" style="color: #3498db;">${url}</a></p>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div style="margin-top: 30px; text-align: left; color: #2c3e50; font-size: 1rem;">
            <strong>Declaration:</strong> I hereby declare that the information provided above is true to the best of my knowledge.
          </div>
        </div>
      `;

      doc.html(template, {
        callback: function(doc) {
          doc.save(`resume_${formData.firstName}_${formData.lastName}.pdf`);
          localStorage.removeItem('resumeFormData');
        },
        x: margin,
        y: margin,
        width: pageWidth - 2 * margin,
        windowWidth: 1000
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Resume Preview</h2>
        <div>
          <button 
            className="btn btn-primary me-2"
            onClick={generatePDF}
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

      <div className="card shadow p-4 mb-4">
        <h4 className="mb-3">Personal Info</h4>
        <p><strong>Name:</strong> {formData.firstName || ''} {formData.lastName || ''}</p>
        <p><strong>Date of Birth:</strong> {formatDate(formData.dob)}</p>
        {(formData.phones || []).map(phone => `<div>${phone || ''}</div>`).join('')}
        {formData.emails.map((e, i) => (
          <p key={i}><strong>Email {i + 1}:</strong> {e}</p>
        ))}
      </div>

      {formData.summary && (
        <div className="card shadow p-4 mb-4">
          <h4 className="mb-3">Professional Summary</h4>
          <p>{formData.summary}</p>
        </div>
      )}

      {formData.educationList && formData.educationList.length > 0 && (
        <div className="card shadow p-4 mb-4">
          <h4 className="mb-3">Education</h4>
          {formData.educationList.map((edu, idx) => (
            <div key={idx}>
              <p><strong>{edu.school}</strong> — {edu.degree} ({edu.passingYear})</p>
            </div>
          ))}
        </div>
      )}

      {formData.experienceList && formData.experienceList.length > 0 && (
        <div className="card shadow p-4 mb-4">
          <h4 className="mb-3">Experience</h4>
          {formData.experienceList.map((exp, idx) => (
            <div key={idx}>
              <p><strong>{exp.company}</strong> — {exp.role}</p>
              <p>{formatDate(exp.startDate)} to {formatDate(exp.endDate)}</p>
              <p><em>{exp.responsibilities}</em></p>
            </div>
          ))}
        </div>
      )}

      {formData.currentJob && formData.currentJob.company && (
        <div className="card shadow p-4 mb-4">
          <h4 className="mb-3">Current Position</h4>
          <p><strong>{formData.currentJob.company}</strong> — {formData.currentJob.role}</p>
          <p>{formatDate(formData.currentJob.startDate)} to Present</p>
        </div>
      )}

      {formData.projects && formData.projects.length > 0 && (
        <div className="card shadow p-4 mb-4">
          <h4 className="mb-3">Projects</h4>
          {formData.projects.map((proj, idx) => (
            <div key={idx}>
              <p><strong>{proj.title}</strong> — {proj.technologies}</p>
              <p>{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {(formData.technicalSkills || formData.nonTechnicalSkills) && (
        <div className="card shadow p-4 mb-4">
          <h4 className="mb-3">Skills</h4>
          {formData.technicalSkills && formData.technicalSkills.length > 0 && (
            <p><strong>Technical:</strong> {formData.technicalSkills.map(s => s.label).join(', ')}</p>
          )}
          {formData.nonTechnicalSkills && formData.nonTechnicalSkills.length > 0 && (
            <p><strong>Soft:</strong> {formData.nonTechnicalSkills.map(s => s.label).join(', ')}</p>
          )}
        </div>
      )}

      {formData.hobbies && formData.hobbies.length > 0 && (
        <div className="card shadow p-4 mb-4">
          <h4 className="mb-3">Hobbies</h4>
          <p>{formData.hobbies.map(h => h.label).join(', ')}</p>
        </div>
      )}

      {formData.socialLinks && (
        <div className="card shadow p-4 mb-4">
          <h4 className="mb-3">Social Links</h4>
          {Object.entries(formData.socialLinks || {}).map(([platform, url]) => `
            <a href="${url || '#'}" class="social-link">${platform || ''}</a>
          `).join('')}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
