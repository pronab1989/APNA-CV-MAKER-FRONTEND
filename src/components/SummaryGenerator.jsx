import React, { useState } from 'react';

const SummaryGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [summary, setSummary] = useState('');

  const generateSummary = () => {
    if (!keyword.trim()) return;

    const lowerKeyword = keyword.toLowerCase();
    let result = '';

    switch (lowerKeyword) {
      case 'coding':
        result = `Passionate about solving problems through code.\nExperienced in full-stack development.\nStrong foundation in algorithms and data structures.\nCommitted to writing clean and maintainable code.`;
        break;
      case 'design':
        result = `Creative UI/UX designer with an eye for detail.\nSkilled in Figma and Adobe XD.\nFocus on user-centered design and accessibility.\nAbility to turn concepts into functional interfaces.`;
        break;
      case 'marketing':
        result = `Strategic thinker with digital marketing expertise.\nExperienced in SEO, SEM, and social media campaigns.\nData-driven decision maker.\nEffective communicator with strong branding knowledge.`;
        break;
      default:
        result = `Motivated professional with expertise in ${keyword}.\nDriven by results and continuous learning.\nStrong interpersonal and technical skills.\nReady to contribute to team success.`;
    }

    setSummary(result);
  };

  return (
    <div className="p-3 bg-light border rounded">
      <h5>Professional Summary (AI-Powered)</h5>
      <div className="mb-2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="form-control"
          placeholder="Enter keyword e.g. coding"
        />
      </div>
      <button className="btn btn-primary mb-2" onClick={generateSummary}>
        Generate Summary
      </button>
      {summary && (
        <pre className="bg-white p-2 border rounded">{summary}</pre>
      )}
    </div>
  );
};

export default SummaryGenerator;
