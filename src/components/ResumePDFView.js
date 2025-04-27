import React from 'react';

function formatDateDMY(date) {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

const ResumePDFView = ({ formData }) => {
  if (!formData) return null;
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20, backgroundColor: '#f8f9fa', color: '#2c3e50', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ backgroundColor: '#2c3e50', color: 'white', padding: 20, margin: '-20px -20px 20px -20px', borderRadius: '10px 10px 0 0' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 10, color: 'white' }}>{formData.firstName || ''} {formData.lastName || ''}</h1>
        <div style={{ textAlign: 'center', color: '#ecf0f1' }}>
          <p style={{ margin: '5px 0' }}>{formData.phones?.[0] || ''}</p>
          <p style={{ margin: '5px 0' }}>{formData.emails?.[0] || ''}</p>
          <p style={{ margin: '5px 0' }}>{formData.dob ? `DOB-${formatDateDMY(formData.dob)}` : ''}</p>
          <p style={{ margin: '5px 0' }}>{formData.address || ''}</p>
        </div>
      </div>
      <div style={{ marginBottom: 20, backgroundColor: 'white', padding: 15, borderRadius: 5, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ borderBottom: '2px solid #3498db', paddingBottom: 5, color: '#2c3e50' }}>Summary</h2>
        <p style={{ color: '#34495e' }}>{formData.summary || ''}</p>
      </div>
      <div style={{ marginBottom: 20, backgroundColor: 'white', padding: 15, borderRadius: 5, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ borderBottom: '2px solid #3498db', paddingBottom: 5, color: '#2c3e50' }}>Experience</h2>
        {(formData.experienceList || []).map((exp, i) => (
          <div key={i} style={{ marginBottom: 15, padding: 10, backgroundColor: '#f8f9fa', borderRadius: 3 }}>
            <h3 style={{ margin: 0, color: '#2c3e50' }}>{exp.role || ''}</h3>
            <p style={{ margin: '5px 0', color: '#3498db' }}>{exp.company || ''} | {formatDateDMY(exp.startDate)} - {formatDateDMY(exp.endDate)}</p>
            <p style={{ color: '#34495e' }}>{exp.responsibilities || ''}</p>
          </div>
        ))}
        {formData.currentJob ? (
          <div style={{ marginBottom: 15, padding: 10, backgroundColor: '#f8f9fa', borderRadius: 3 }}>
            <h3 style={{ margin: 0, color: '#2c3e50' }}>{formData.currentJob.role || ''}</h3>
            <p style={{ margin: '5px 0', color: '#3498db' }}>{formData.currentJob.company || ''} | {formatDateDMY(formData.currentJob.startDate)} - Present</p>
          </div>
        ) : null}
      </div>
      <div style={{ marginBottom: 20, backgroundColor: 'white', padding: 15, borderRadius: 5, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ borderBottom: '2px solid #3498db', paddingBottom: 5, color: '#2c3e50' }}>Education</h2>
        {(formData.educationList || []).map((edu, i) => (
          <div key={i} style={{ marginBottom: 15, padding: 10, backgroundColor: '#f8f9fa', borderRadius: 3 }}>
            <h3 style={{ margin: 0, color: '#2c3e50' }}>{edu.degree || ''}</h3>
            <p style={{ margin: '5px 0', color: '#3498db' }}>{edu.school || ''} | {edu.passingYear || ''}</p>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 20, backgroundColor: 'white', padding: 15, borderRadius: 5, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ borderBottom: '2px solid #3498db', paddingBottom: 5, color: '#2c3e50' }}>Skills</h2>
        {formData.technicalSkills?.length > 0 && (
          <div style={{ marginBottom: 10, padding: 10, backgroundColor: '#f8f9fa', borderRadius: 3 }}>
            <p style={{ margin: 0, color: '#2c3e50' }}><strong>Technical Skills:</strong> {formData.technicalSkills.map(s => s.label).join(', ')}</p>
          </div>
        )}
        {formData.nonTechnicalSkills?.length > 0 && (
          <div style={{ padding: 10, backgroundColor: '#f8f9fa', borderRadius: 3 }}>
            <p style={{ margin: 0, color: '#2c3e50' }}><strong>Soft Skills:</strong> {formData.nonTechnicalSkills.map(s => s.label).join(', ')}</p>
          </div>
        )}
      </div>
      <div style={{ marginBottom: 20, backgroundColor: 'white', padding: 15, borderRadius: 5, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ borderBottom: '2px solid #3498db', paddingBottom: 5, color: '#2c3e50' }}>Projects</h2>
        {(formData.projects || []).map((proj, i) => (
          <div key={i} style={{ marginBottom: 15, padding: 10, backgroundColor: '#f8f9fa', borderRadius: 3 }}>
            <h3 style={{ margin: 0, color: '#2c3e50' }}>{proj.title || ''}</h3>
            <p style={{ margin: '5px 0', color: '#3498db' }}>Technologies: {proj.technologies || ''}</p>
            <p style={{ color: '#34495e' }}>{proj.description || ''}</p>
            {(proj.startDate || proj.endDate) && (
              <p style={{ color: '#34495e', margin: 0 }}>
                {proj.startDate ? `Start: ${formatDateDMY(proj.startDate)}` : ''}
                {proj.startDate && proj.endDate ? ' | ' : ''}
                {proj.endDate ? `End: ${formatDateDMY(proj.endDate)}` : ''}
              </p>
            )}
          </div>
        ))}
      </div>
      {formData.hobbies?.length > 0 && (
        <div style={{ marginBottom: 20, backgroundColor: 'white', padding: 15, borderRadius: 5, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ borderBottom: '2px solid #3498db', paddingBottom: 5, color: '#2c3e50' }}>Hobbies</h2>
          <div style={{ padding: 10, backgroundColor: '#f8f9fa', borderRadius: 3 }}>
            <p style={{ margin: 0, color: '#34495e' }}>{formData.hobbies.map(h => h.label).join(', ')}</p>
          </div>
        </div>
      )}
      {formData.socialLinks && Object.keys(formData.socialLinks).length > 0 && (
        <div style={{ marginBottom: 20, backgroundColor: 'white', padding: 15, borderRadius: 5, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ borderBottom: '2px solid #3498db', paddingBottom: 5, color: '#2c3e50' }}>Social Links</h2>
          <div style={{ padding: 10, backgroundColor: '#f8f9fa', borderRadius: 3 }}>
            {Object.entries(formData.socialLinks).map(([platform, url], i) => (
              <p key={i} style={{ margin: '5px 0', color: '#34495e' }}>{platform}: <a href={url} style={{ color: '#3498db' }}>{url}</a></p>
            ))}
          </div>
        </div>
      )}
      <div style={{ marginTop: 30, textAlign: 'left', color: '#2c3e50', fontSize: '1rem' }}>
        <strong>Declaration:</strong> I hereby declare that the information provided above is true to the best of my knowledge.
      </div>
    </div>
  );
};

export default ResumePDFView; 