import React, { useState } from 'react';
import { FaWandMagic } from 'react-icons/fa6';

const SummaryGenerator = ({ formData, onSummaryGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = () => {
    setIsGenerating(true);
    
    // Extract relevant information from formData
    const currentJob = formData.currentJob || {};
    const skills = [...(formData.technicalSkills || []), ...(formData.nonTechnicalSkills || [])];
    const education = formData.educationList || [];
    const projects = formData.projects || [];

    // Generate summary points
    const summaryPoints = [];

    // Add professional title and key skills
    if (currentJob.role) {
      const keySkills = skills.slice(0, 3).map(skill => skill.label).join(', ');
      summaryPoints.push(`Experienced ${currentJob.role} with expertise in ${keySkills}.`);
    }

    // Add current role and company
    if (currentJob.company) {
      summaryPoints.push(`Currently working at ${currentJob.company} as a ${currentJob.role}.`);
    }

    // Add educational background
    if (education.length > 0) {
      const highestEducation = education[0];
      summaryPoints.push(`Holds a ${highestEducation.degree} from ${highestEducation.school}.`);
    }

    // Add additional skills and project experience
    if (skills.length > 3 || projects.length > 0) {
      const additionalSkills = skills.slice(3).map(skill => skill.label).join(', ');
      const projectCount = projects.length;
      summaryPoints.push(`Proficient in ${additionalSkills} with ${projectCount} successful project implementations.`);
    }

    // Add career objective
    summaryPoints.push(`Seeking to leverage technical expertise and problem-solving skills in a challenging role.`);

    // Join points into a single summary
    const generatedSummary = summaryPoints.join(' ');

    // Pass the generated summary back to the parent component
    onSummaryGenerated(generatedSummary);
    setIsGenerating(false);
  };

  return (
    <div className="mb-3">
      <button
        type="button"
        className="btn btn-primary"
        onClick={generateSummary}
        disabled={isGenerating}
      >
        <FaWandMagic className="me-2" />
        {isGenerating ? 'Generating...' : 'Generate Summary'}
      </button>
    </div>
  );
};

export default SummaryGenerator; 