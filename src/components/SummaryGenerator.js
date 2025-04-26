import React, { useState } from 'react';
import axios from 'axios';

const SummaryGenerator = ({ formData, onSummaryGenerated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSummary = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Extract key information from form data
      const { 
        experienceList, 
        currentJob, 
        technicalSkills, 
        nonTechnicalSkills,
        educationList,
        projects
      } = formData;

      // Prepare data for AI generation
      const promptData = {
        experience: experienceList.map(exp => ({
          role: exp.role,
          company: exp.company,
          responsibilities: exp.responsibilities
        })),
        currentRole: currentJob?.role || '',
        currentCompany: currentJob?.company || '',
        technicalSkills: technicalSkills?.map(skill => skill.label) || [],
        softSkills: nonTechnicalSkills?.map(skill => skill.label) || [],
        education: educationList?.map(edu => ({
          degree: edu.degree,
          school: edu.school
        })) || [],
        projects: projects?.map(proj => ({
          title: proj.title,
          technologies: proj.technologies
        })) || []
      };

      // Call backend API to generate summary
      const response = await axios.post('http://localhost:5000/api/generate-summary', promptData);
      
      if (response.data.summary) {
        onSummaryGenerated(response.data.summary);
      } else {
        throw new Error('No summary generated');
      }
    } catch (err) {
      console.error('Error generating summary:', err);
      setError('Failed to generate summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <button
        className="btn btn-outline-primary mb-2"
        onClick={generateSummary}
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Professional Summary'}
      </button>
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default SummaryGenerator; 