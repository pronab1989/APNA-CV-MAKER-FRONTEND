import React from 'react';
import './Templates.css';

const StudentTemplate = ({ formData }) => {
  return (
    <div className="resume-template student-template">
      <header className="resume-header">
        <h1>{formData.firstName} {formData.lastName}</h1>
        <div className="contact-info">
          <p>
            <span className="icon">📧</span> {formData.email} |
            <span className="icon">📱</span> {formData.phone}
          </p>
          <p>
            <span className="icon">📍</span> {formData.address}, {formData.city}, {formData.country}
          </p>
        </div>
      </header>

      <section className="resume-section">
        <h2>Education</h2>
        <div className="education-item">
          <div className="education-header">
            <h3>{formData.university}</h3>
            <span className="year">{formData.graduationYear}</span>
          </div>
          <p className="degree">{formData.degree}</p>
          <p className="cgpa">CGPA: {formData.cgpa}</p>
          {formData.relevantCourses && (
            <div className="courses">
              <strong>Relevant Courses:</strong>
              <p>{formData.relevantCourses}</p>
            </div>
          )}
        </div>
      </section>

      <section className="resume-section">
        <h2>Technical Skills</h2>
        <div className="skills-container">
          {formData.skills?.split(',').map((skill, index) => (
            <div key={index} className="skill-item">
              <span className="skill-name">{skill.trim()}</span>
              <div className="skill-bar">
                <div className="skill-level" style={{ width: '75%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Academic Projects</h2>
        {formData.projects?.map((project, index) => (
          <div key={index} className="project-item">
            <div className="project-header">
              <h3>{project.title}</h3>
              <span className="project-duration">{project.duration}</span>
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              <strong>Technologies:</strong>
              <div className="tech-tags">
                {project.technologies?.split(',').map((tech, i) => (
                  <span key={i} className="tech-tag">{tech.trim()}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {formData.internships && (
        <section className="resume-section">
          <h2>Internships & Training</h2>
          {formData.internships.map((internship, index) => (
            <div key={index} className="internship-item">
              <div className="internship-header">
                <h3>{internship.company}</h3>
                <span className="duration">{internship.duration}</span>
              </div>
              <p className="position">{internship.position}</p>
              <ul className="internship-points">
                {internship.description?.split('\n').map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      <section className="resume-section">
        <h2>Achievements & Certifications</h2>
        <ul className="achievements-list">
          {formData.achievements?.split('\n').map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </section>

      {formData.extraCurricular && (
        <section className="resume-section">
          <h2>Extra-Curricular Activities</h2>
          <ul className="activities-list">
            {formData.extraCurricular.split('\n').map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default StudentTemplate; 