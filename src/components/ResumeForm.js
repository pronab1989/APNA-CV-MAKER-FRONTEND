import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResumeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { templateType, requiresPayment } = location.state || {};
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    summary: '',
    education: {
      university: '',
      degree: '',
      graduationYear: '',
      cgpa: '',
      relevantCourses: ''
    },
    skills: '',
    projects: [{
      title: '',
      description: '',
      technologies: '',
      duration: ''
    }],
    experience: templateType === 'professional' || templateType === 'executive' ? [{
      company: '',
      position: '',
      duration: '',
      responsibilities: '',
      achievements: ''
    }] : [],
    internships: templateType === 'student' || templateType === 'fresher' ? [{
      company: '',
      position: '',
      duration: '',
      description: ''
    }] : [],
    achievements: '',
    certifications: '',
    languages: '',
    extraCurricular: '',
    linkedin: ''
  });

  useEffect(() => {
    const savedData = localStorage.getItem('resumeFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e, index, section) => {
    const { name, value } = e.target;
    
    if (section) {
      if (Array.isArray(formData[section])) {
        const newArray = [...formData[section]];
        newArray[index] = { ...newArray[index], [name]: value };
        setFormData(prev => ({ ...prev, [section]: newArray }));
      } else {
        setFormData(prev => ({
          ...prev,
          [section]: { ...prev[section], [name]: value }
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addItem = (section) => {
    const newItem = section === 'projects' 
      ? { title: '', description: '', technologies: '', duration: '' }
      : section === 'experience'
      ? { company: '', position: '', duration: '', responsibilities: '', achievements: '' }
      : { company: '', position: '', duration: '', description: '' };

    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('resumeFormData', JSON.stringify(formData));
    navigate('/preview', { 
      state: { 
        formData,
        templateType,
        requiresPayment 
      } 
    });
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Resume Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="h5 mb-0">Personal Information</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {(templateType === 'professional' || templateType === 'executive') && (
              <div className="row">
                <div className="col-12 mb-3">
                  <label className="form-label">Professional Summary</label>
                  <textarea
                    className="form-control"
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    rows="4"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="h5 mb-0">Education</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">University/Institution</label>
                <input
                  type="text"
                  className="form-control"
                  name="university"
                  value={formData.education.university}
                  onChange={(e) => handleInputChange(e, 0, 'education')}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Degree</label>
                <input
                  type="text"
                  className="form-control"
                  name="degree"
                  value={formData.education.degree}
                  onChange={(e) => handleInputChange(e, 0, 'education')}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Graduation Year</label>
                <input
                  type="text"
                  className="form-control"
                  name="graduationYear"
                  value={formData.education.graduationYear}
                  onChange={(e) => handleInputChange(e, 0, 'education')}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">CGPA</label>
                <input
                  type="text"
                  className="form-control"
                  name="cgpa"
                  value={formData.education.cgpa}
                  onChange={(e) => handleInputChange(e, 0, 'education')}
                  required
                />
              </div>
            </div>
            {templateType === 'student' && (
              <div className="row">
                <div className="col-12 mb-3">
                  <label className="form-label">Relevant Courses</label>
                  <textarea
                    className="form-control"
                    name="relevantCourses"
                    value={formData.education.relevantCourses}
                    onChange={(e) => handleInputChange(e, 0, 'education')}
                    placeholder="List your relevant courses"
                    rows="3"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="h5 mb-0">Skills</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">Technical Skills (comma-separated)</label>
                <textarea
                  className="form-control"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g., JavaScript, React, Node.js"
                  rows="3"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3 className="h5 mb-0">Projects</h3>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => addItem('projects')}
            >
              Add Project
            </button>
          </div>
          <div className="card-body">
            {formData.projects.map((project, index) => (
              <div key={index} className="project-item mb-4">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Project Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={project.title}
                      onChange={(e) => handleInputChange(e, index, 'projects')}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      name="duration"
                      value={project.duration}
                      onChange={(e) => handleInputChange(e, index, 'projects')}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={project.description}
                      onChange={(e) => handleInputChange(e, index, 'projects')}
                      rows="3"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label className="form-label">Technologies Used</label>
                    <input
                      type="text"
                      className="form-control"
                      name="technologies"
                      value={project.technologies}
                      onChange={(e) => handleInputChange(e, index, 'projects')}
                      required
                    />
                  </div>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => removeItem('projects', index)}
                  >
                    Remove Project
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Experience (for Professional/Executive) */}
        {(templateType === 'professional' || templateType === 'executive') && (
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="h5 mb-0">Work Experience</h3>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => addItem('experience')}
              >
                Add Experience
              </button>
            </div>
            <div className="card-body">
              {formData.experience.map((exp, index) => (
                <div key={index} className="experience-item mb-4">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Company</label>
                      <input
                        type="text"
                        className="form-control"
                        name="company"
                        value={exp.company}
                        onChange={(e) => handleInputChange(e, index, 'experience')}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Position</label>
                      <input
                        type="text"
                        className="form-control"
                        name="position"
                        value={exp.position}
                        onChange={(e) => handleInputChange(e, index, 'experience')}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Duration</label>
                      <input
                        type="text"
                        className="form-control"
                        name="duration"
                        value={exp.duration}
                        onChange={(e) => handleInputChange(e, index, 'experience')}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label className="form-label">Responsibilities</label>
                      <textarea
                        className="form-control"
                        name="responsibilities"
                        value={exp.responsibilities}
                        onChange={(e) => handleInputChange(e, index, 'experience')}
                        rows="3"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label className="form-label">Key Achievements</label>
                      <textarea
                        className="form-control"
                        name="achievements"
                        value={exp.achievements}
                        onChange={(e) => handleInputChange(e, index, 'experience')}
                        rows="3"
                      />
                    </div>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem('experience', index)}
                    >
                      Remove Experience
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Internships (for Student/Fresher) */}
        {(templateType === 'student' || templateType === 'fresher') && (
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="h5 mb-0">Internships</h3>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => addItem('internships')}
              >
                Add Internship
              </button>
            </div>
            <div className="card-body">
              {formData.internships.map((internship, index) => (
                <div key={index} className="internship-item mb-4">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Company</label>
                      <input
                        type="text"
                        className="form-control"
                        name="company"
                        value={internship.company}
                        onChange={(e) => handleInputChange(e, index, 'internships')}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Position</label>
                      <input
                        type="text"
                        className="form-control"
                        name="position"
                        value={internship.position}
                        onChange={(e) => handleInputChange(e, index, 'internships')}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Duration</label>
                      <input
                        type="text"
                        className="form-control"
                        name="duration"
                        value={internship.duration}
                        onChange={(e) => handleInputChange(e, index, 'internships')}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={internship.description}
                        onChange={(e) => handleInputChange(e, index, 'internships')}
                        rows="3"
                      />
                    </div>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem('internships', index)}
                    >
                      Remove Internship
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Sections */}
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="h5 mb-0">Additional Information</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">Achievements</label>
                <textarea
                  className="form-control"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  placeholder="List your achievements (one per line)"
                  rows="3"
                />
              </div>
            </div>

            {(templateType === 'professional' || templateType === 'executive') && (
              <div className="row">
                <div className="col-12 mb-3">
                  <label className="form-label">Certifications</label>
                  <textarea
                    className="form-control"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleInputChange}
                    placeholder="List your certifications (one per line)"
                    rows="3"
                  />
                </div>
              </div>
            )}

            {templateType === 'student' && (
              <div className="row">
                <div className="col-12 mb-3">
                  <label className="form-label">Extra-Curricular Activities</label>
                  <textarea
                    className="form-control"
                    name="extraCurricular"
                    value={formData.extraCurricular}
                    onChange={handleInputChange}
                    placeholder="List your extra-curricular activities (one per line)"
                    rows="3"
                  />
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Languages (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  name="languages"
                  value={formData.languages}
                  onChange={handleInputChange}
                  placeholder="e.g., English, Hindi, Spanish"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">LinkedIn Profile</label>
                <input
                  type="text"
                  className="form-control"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="Your LinkedIn profile URL"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg">
            Preview Resume
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm; 