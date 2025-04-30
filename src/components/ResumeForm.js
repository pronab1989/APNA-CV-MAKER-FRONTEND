import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResumeForm.css';

const ResumeForm = ({ templateType, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    education: [{ institution: '', degree: '', year: '' }],
    experience: [{ company: '', position: '', duration: '', description: '' }],
    skills: [],
    projects: [{ title: '', description: '' }],
    certifications: [{ name: '', issuer: '', year: '' }]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'https://apna-cv-maker-server.onrender.com/api';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/auth';
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field, index, e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, [name]: value } : item
      )
    }));
  };

  const addItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], {}]
    }));
  };

  const removeItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.dob) {
      setError('First name, last name, and date of birth are required fields.');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/resume`,
        { ...formData, templateType },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data && response.data._id) {
        onSave(response.data);
      } else {
        setError('Failed to save resume. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while saving the resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-form-container">
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">First Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Last Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Professional Summary</h3>
          <div className="mb-3">
            <textarea
              className="form-control"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="4"
              disabled={loading}
              placeholder="Write a brief summary of your professional background and career objectives"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="education-item mb-3">
              <div className="row">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="institution"
                    value={edu.institution}
                    onChange={(e) => handleArrayChange('education', index, e)}
                    placeholder="Institution"
                    disabled={loading}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="degree"
                    value={edu.degree}
                    onChange={(e) => handleArrayChange('education', index, e)}
                    placeholder="Degree"
                    disabled={loading}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    name="year"
                    value={edu.year}
                    onChange={(e) => handleArrayChange('education', index, e)}
                    placeholder="Year"
                    disabled={loading}
                  />
                </div>
                <div className="col-md-1">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeItem('education', index)}
                    disabled={loading}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => addItem('education')}
            disabled={loading}
          >
            Add Education
          </button>
        </div>

        <div className="form-section">
          <h3>Work Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="experience-item mb-3">
              <div className="row">
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleArrayChange('experience', index, e)}
                    placeholder="Company"
                    disabled={loading}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    name="position"
                    value={exp.position}
                    onChange={(e) => handleArrayChange('experience', index, e)}
                    placeholder="Position"
                    disabled={loading}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    name="duration"
                    value={exp.duration}
                    onChange={(e) => handleArrayChange('experience', index, e)}
                    placeholder="Duration"
                    disabled={loading}
                  />
                </div>
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeItem('experience', index)}
                    disabled={loading}
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <textarea
                    className="form-control"
                    name="description"
                    value={exp.description}
                    onChange={(e) => handleArrayChange('experience', index, e)}
                    placeholder="Description"
                    rows="2"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => addItem('experience')}
            disabled={loading}
          >
            Add Experience
          </button>
        </div>

        <div className="form-section">
          <h3>Skills</h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={formData.skills.join(', ')}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                skills: e.target.value.split(',').map(skill => skill.trim())
              }))}
              placeholder="Enter skills separated by commas"
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Projects</h3>
          {formData.projects.map((project, index) => (
            <div key={index} className="project-item mb-3">
              <div className="row">
                <div className="col-md-11">
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="title"
                    value={project.title}
                    onChange={(e) => handleArrayChange('projects', index, e)}
                    placeholder="Project Title"
                    disabled={loading}
                  />
                  <textarea
                    className="form-control"
                    name="description"
                    value={project.description}
                    onChange={(e) => handleArrayChange('projects', index, e)}
                    placeholder="Project Description"
                    rows="2"
                    disabled={loading}
                  />
                </div>
                <div className="col-md-1">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeItem('projects', index)}
                    disabled={loading}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => addItem('projects')}
            disabled={loading}
          >
            Add Project
          </button>
        </div>

        <div className="form-section">
          <h3>Certifications</h3>
          {formData.certifications.map((cert, index) => (
            <div key={index} className="certification-item mb-3">
              <div className="row">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={cert.name}
                    onChange={(e) => handleArrayChange('certifications', index, e)}
                    placeholder="Certification Name"
                    disabled={loading}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="issuer"
                    value={cert.issuer}
                    onChange={(e) => handleArrayChange('certifications', index, e)}
                    placeholder="Issuing Organization"
                    disabled={loading}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    name="year"
                    value={cert.year}
                    onChange={(e) => handleArrayChange('certifications', index, e)}
                    placeholder="Year"
                    disabled={loading}
                  />
                </div>
                <div className="col-md-1">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeItem('certifications', index)}
                    disabled={loading}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => addItem('certifications')}
            disabled={loading}
          >
            Add Certification
          </button>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Resume'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm; 