import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

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

  const downloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 15;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 10;
    const contentWidth = pageWidth - (2 * margin);

    // Add a subtle background color to the entire page
    doc.setFillColor(250, 250, 250);
    doc.rect(0, 0, pageWidth, doc.internal.pageSize.height, 'F');

    // Name as main title
    doc.setFontSize(28);
    doc.setTextColor(44, 62, 80); // Dark blue-gray
    doc.setFont('helvetica', 'bold');
    doc.text(`${formData.firstName || ''} ${formData.lastName || ''}`, pageWidth/2, yPos, { align: 'center' });
    yPos += 10;

    // Contact info in a single line
    doc.setFontSize(10);
    doc.setTextColor(52, 73, 94); // Slightly lighter blue-gray
    const contactInfo = [];
    if (formData.phones?.[0]) contactInfo.push(formData.phones[0]);
    if (formData.emails?.[0]) contactInfo.push(formData.emails[0]);
    doc.text(contactInfo.join(' • '), pageWidth/2, yPos + 5, { align: 'center' });
    yPos += 15;

    // Professional Summary
    if (formData.summary) {
      doc.setFontSize(14);
      doc.setTextColor(41, 128, 185); // Blue
      doc.setFont('helvetica', 'bold');
      doc.text('PROFESSIONAL SUMMARY', margin, yPos + 5);
      yPos += 10;

      doc.setFontSize(10);
      doc.setTextColor(52, 73, 94);
      doc.setFont('helvetica', 'normal');
      
      // Add a light gray background to the summary section
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(margin, yPos, contentWidth, 20, 2, 2, 'F');
      
      autoTable(doc, {
        startY: yPos + 2,
        margin: { left: margin + 2, right: margin + 2 },
        body: [[formData.summary]],
        theme: 'plain',
        styles: {
          fontSize: 10,
          cellPadding: 2,
          textColor: [52, 73, 94]
        }
      });
      yPos = doc.lastAutoTable.finalY + 10;
    }

    // Experience Section
    if (formData.experienceList?.length > 0 || formData.currentJob?.company) {
      doc.setFontSize(14);
      doc.setTextColor(41, 128, 185);
      doc.setFont('helvetica', 'bold');
      doc.text('PROFESSIONAL EXPERIENCE', margin, yPos + 5);
      yPos += 10;

      // Current Job
      if (formData.currentJob?.company) {
        doc.setFontSize(12);
        doc.setTextColor(44, 62, 80);
        doc.setFont('helvetica', 'bold');
        doc.text(formData.currentJob.company, margin, yPos + 5);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text(formData.currentJob.role, margin + 2, yPos + 10);
        
        doc.setFont('helvetica', 'normal');
        doc.text(`${formatDate(formData.currentJob.startDate)} - Present`, pageWidth - margin, yPos + 10, { align: 'right' });
        yPos += 15;
      }

      // Previous Experience
      formData.experienceList.forEach(exp => {
        doc.setFontSize(12);
        doc.setTextColor(44, 62, 80);
        doc.setFont('helvetica', 'bold');
        doc.text(exp.company, margin, yPos + 5);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text(exp.role, margin + 2, yPos + 10);
        
        doc.setFont('helvetica', 'normal');
        doc.text(`${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`, pageWidth - margin, yPos + 10, { align: 'right' });
        
        if (exp.responsibilities) {
          doc.setFont('helvetica', 'normal');
          autoTable(doc, {
            startY: yPos + 12,
            margin: { left: margin + 5, right: margin },
            body: [[exp.responsibilities]],
            theme: 'plain',
            styles: {
              fontSize: 9,
              cellPadding: 1,
              textColor: [52, 73, 94]
            }
          });
          yPos = doc.lastAutoTable.finalY + 5;
        } else {
          yPos += 15;
        }
      });
    }

    // Skills Section with two columns
    if (formData.technicalSkills?.length > 0 || formData.nonTechnicalSkills?.length > 0) {
      yPos += 5;
      doc.setFontSize(14);
      doc.setTextColor(41, 128, 185);
      doc.setFont('helvetica', 'bold');
      doc.text('SKILLS', margin, yPos + 5);
      yPos += 10;

      const skillsTableData = [];
      if (formData.technicalSkills?.length > 0) {
        skillsTableData.push([{
          content: 'Technical',
          styles: { fontStyle: 'bold', textColor: [44, 62, 80] }
        }, {
          content: formData.technicalSkills.map(s => s.label).join(' • '),
          styles: { textColor: [52, 73, 94] }
        }]);
      }
      if (formData.nonTechnicalSkills?.length > 0) {
        skillsTableData.push([{
          content: 'Soft Skills',
          styles: { fontStyle: 'bold', textColor: [44, 62, 80] }
        }, {
          content: formData.nonTechnicalSkills.map(s => s.label).join(' • '),
          styles: { textColor: [52, 73, 94] }
        }]);
      }

      // Add a light background to the skills section
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(margin, yPos, contentWidth, 20, 2, 2, 'F');

      autoTable(doc, {
        startY: yPos + 2,
        margin: { left: margin + 2, right: margin + 2 },
        body: skillsTableData,
        theme: 'plain',
        styles: {
          fontSize: 10,
          cellPadding: 2
        },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: contentWidth - 35 }
        }
      });
      yPos = doc.lastAutoTable.finalY + 10;
    }

    // Education Section
    if (formData.educationList?.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(41, 128, 185);
      doc.setFont('helvetica', 'bold');
      doc.text('EDUCATION', margin, yPos + 5);
      yPos += 10;

      formData.educationList.forEach(edu => {
        doc.setFontSize(12);
        doc.setTextColor(44, 62, 80);
        doc.setFont('helvetica', 'bold');
        doc.text(edu.school, margin, yPos + 5);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text(edu.degree, margin + 2, yPos + 10);
        
        doc.setFont('helvetica', 'normal');
        doc.text(edu.passingYear.toString(), pageWidth - margin, yPos + 10, { align: 'right' });
        yPos += 15;
      });
    }

    // Projects Section
    if (formData.projects?.length > 0) {
      yPos += 5;
      doc.setFontSize(14);
      doc.setTextColor(41, 128, 185);
      doc.setFont('helvetica', 'bold');
      doc.text('PROJECTS', margin, yPos + 5);
      yPos += 10;

      formData.projects.forEach(proj => {
        doc.setFontSize(12);
        doc.setTextColor(44, 62, 80);
        doc.setFont('helvetica', 'bold');
        doc.text(proj.title, margin, yPos + 5);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text(`Technologies: ${proj.technologies}`, margin + 2, yPos + 10);
        
        if (proj.description) {
          autoTable(doc, {
            startY: yPos + 12,
            margin: { left: margin + 5, right: margin },
            body: [[proj.description]],
            theme: 'plain',
            styles: {
              fontSize: 9,
              cellPadding: 1,
              textColor: [52, 73, 94]
            }
          });
          yPos = doc.lastAutoTable.finalY + 5;
        } else {
          yPos += 15;
        }
      });
    }

    // Social Links Section
    if (formData.socialLinks) {
      const socialLinks = [];
      if (formData.socialLinks.linkedin) socialLinks.push(`LinkedIn: ${formData.socialLinks.linkedin}`);
      if (formData.socialLinks.github) socialLinks.push(`GitHub: ${formData.socialLinks.github}`);
      if (formData.socialLinks.portfolio) socialLinks.push(`Portfolio: ${formData.socialLinks.portfolio}`);

      if (socialLinks.length > 0) {
        yPos += 5;
        doc.setFontSize(14);
        doc.setTextColor(41, 128, 185);
        doc.setFont('helvetica', 'bold');
        doc.text('CONNECT', margin, yPos + 5);
        yPos += 10;

        doc.setFontSize(9);
        doc.setTextColor(52, 73, 94);
        doc.setFont('helvetica', 'normal');
        socialLinks.forEach((link, index) => {
          doc.text(link, margin + 2, yPos + (index * 5));
        });
      }
    }

    // Footer with page number
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth - margin,
        doc.internal.pageSize.height - 10,
        { align: 'right' }
      );
    }

    // Save the PDF
    const fileName = `resume_${formData.firstName.toLowerCase()}_${formData.lastName.toLowerCase()}_${resumeId || 'preview'}.pdf`;
    doc.save(fileName);
  };

  const generatePDF = async () => {
    try {
      if (!formData) {
        console.error('formData is undefined');
        return;
      }

      const doc = new jsPDF();
      const template = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #2c3e50; color: white; padding: 20px; margin: -20px -20px 20px -20px;">
            <h1 style="text-align: center; margin-bottom: 10px; color: white;">${formData.firstName || ''} ${formData.lastName || ''}</h1>
            <div style="text-align: center; color: #ecf0f1;">
              <p style="margin: 5px 0;">${formData.phones?.[0] || ''}</p>
              <p style="margin: 5px 0;">${formData.emails?.[0] || ''}</p>
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
        </div>
      `;

      doc.html(template, {
        callback: function(doc) {
          doc.save(`resume_${formData.firstName}_${formData.lastName}.pdf`);
        },
        x: 10,
        y: 10,
        width: 190,
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
