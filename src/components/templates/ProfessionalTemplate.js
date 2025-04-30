import React from 'react';
import './Templates.css';

const ProfessionalTemplate = ({ formData }) => {
  return (
    <div className="resume-template professional-template">
      <div className="sidebar">
        <div className="profile-section">
          <div className="profile-name">
            <h1>{formData.firstName}</h1>
            <h1>{formData.lastName}</h1>
          </div>
          <p className="job-title">{formData.currentPosition || 'Professional Title'}</p>
        </div>

        <div className="sidebar-section">
          <h2>Contact</h2>
          <div className="contact-details">
            <p><span className="icon">📧</span> {formData.email}</p>
            <p><span className="icon">📱</span> {formData.phone}</p>
            <p><span className="icon">📍</span> {formData.city}, {formData.country}</p>
            {formData.linkedin && (
              <p><span className="icon">💼</span> {formData.linkedin}</p>
            )}
          </div>
        </div>

        <div className="sidebar-section">
          <h2>Skills</h2>
          <div className="skills-list">
            {formData.skills?.split(',').map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="skill-name">{skill.trim()}</span>
                <div className="skill-level-indicator">
                  <span className="dot filled"></span>
                  <span className="dot filled"></span>
                  <span className="dot filled"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {formData.languages && (
          <div className="sidebar-section">
            <h2>Languages</h2>
            <div className="languages-list">
              {formData.languages.split(',').map((lang, index) => (
                <div key={index} className="language-item">
                  <span>{lang.trim()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="main-content">
        <section className="professional-summary">
          <h2>Professional Summary</h2>
          <p>{formData.summary}</p>
        </section>

        <section className="experience-section">
          <h2>Work Experience</h2>
          {formData.experience?.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3>{exp.position}</h3>
                <span className="company">{exp.company}</span>
                <span className="duration">{exp.duration}</span>
              </div>
              <ul className="experience-details">
                {exp.responsibilities?.split('\n').map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
              {exp.achievements && (
                <div className="achievements">
                  <strong>Key Achievements:</strong>
                  <ul>
                    {exp.achievements.split('\n').map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="education-section">
          <h2>Education</h2>
          <div className="education-item">
            <h3>{formData.degree}</h3>
            <p className="institution">{formData.university}</p>
            <p className="education-details">
              Graduated: {formData.graduationYear} | CGPA: {formData.cgpa}
            </p>
          </div>
        </section>

        {formData.certifications && (
          <section className="certifications-section">
            <h2>Certifications</h2>
            <div className="certifications-grid">
              {formData.certifications.split('\n').map((cert, index) => (
                <div key={index} className="certification-item">
                  <span className="cert-icon">🏆</span>
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {formData.projects && (
          <section className="projects-section">
            <h2>Notable Projects</h2>
            {formData.projects.map((project, index) => (
              <div key={index} className="project-item">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies?.split(',').map((tech, i) => (
                    <span key={i} className="tech-badge">{tech.trim()}</span>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate; 