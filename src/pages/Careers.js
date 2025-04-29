import React from 'react';
import { Link } from 'react-router-dom';
import './Careers.css';

const Careers = () => {
  const openings = [
    {
      position: "Frontend Developer",
      type: "Full-time",
      location: "Nagpur, Maharashtra (Hybrid)",
      description: "We're looking for a Frontend Developer with React.js experience to join our team."
    },
    {
      position: "UI/UX Designer",
      type: "Full-time",
      location: "Remote",
      description: "Seeking a creative UI/UX Designer to help shape the future of our CV creation platform."
    },
    {
      position: "Content Writer",
      type: "Part-time",
      location: "Remote",
      description: "Looking for a Content Writer to create engaging resume tips and career advice content."
    }
  ];

  return (
    <div className="careers-page">
      <div className="container py-5">
        <h1>Join Our Team</h1>
        <div className="careers-intro">
          <p>Help us revolutionize how people create and manage their professional profiles.</p>
        </div>
        <div className="openings-grid">
          {openings.map((job, index) => (
            <div key={index} className="job-card">
              <h2>{job.position}</h2>
              <div className="job-details">
                <span className="job-type">{job.type}</span>
                <span className="job-location">{job.location}</span>
              </div>
              <p>{job.description}</p>
              <Link to={`/careers/${index}`} className="btn btn-outline-primary">View Details</Link>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Careers; 