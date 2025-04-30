import React from 'react';
import './Templates.css';

const FresherTemplate = ({ formData }) => {
  return (
    <div className="resume-template fresher-template">
      <header className="resume-header">
        <h1>{formData.firstName} {formData.lastName}</h1>
        <div className="contact-info">
          <p>{formData.email} | {formData.phone}</p>
          <p>{formData.address}, {formData.city}, {formData.country}</p>
        </div>
      </header>

      <section className="resume-section">
        <h2>Education</h2>
        <div className="education-item">
          <h3>{formData.university}</h3>
          <p>{formData.degree} - {formData.graduationYear}</p>
          <p>CGPA: {formData.cgpa}</p>
        </div>
      </section>

      <section className="resume-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          {formData.skills?.split(',').map((skill, index) => (
            <span key={index} className="skill-tag">{skill.trim()}</span>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Projects</h2>
        {formData.projects?.map((project, index) => (
          <div key={index} className="project-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Technologies:</strong> {project.technologies}</p>
          </div>
        ))}
      </section>

      {formData.internships && (
        <section className="resume-section">
          <h2>Internships</h2>
          {formData.internships.map((internship, index) => (
            <div key={index} className="internship-item">
              <h3>{internship.company}</h3>
              <p>{internship.position} ({internship.duration})</p>
              <p>{internship.description}</p>
            </div>
          ))}
        </section>
      )}

      <section className="resume-section">
        <h2>Achievements</h2>
        <ul className="achievements-list">
          {formData.achievements?.split('\n').map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default FresherTemplate; 