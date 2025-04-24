// src/components/ResumePreview.js

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

const ResumePreview = ({ formData }) => {
  const resumeRef = useRef();

  const downloadPDF = () => {
    const input = resumeRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("My_Resume.pdf");
    });
  };

  return (
    <div className="container my-4">
      <h2 className="text-center">Resume Preview</h2>
      <div ref={resumeRef} className="p-4 border rounded bg-white" id="resume">
        <h3>{formData.fullName}</h3>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>

        <h5 className="mt-3">Education</h5>
        {formData.education.map((edu, index) => (
          <div key={index}>
            <p>{edu.degree} at {edu.institution} ({edu.year})</p>
          </div>
        ))}

        <h5 className="mt-3">Experience</h5>
        {formData.experience.map((exp, index) => (
          <div key={index}>
            <p>{exp.role} at {exp.company} ({exp.years})</p>
          </div>
        ))}

        <h5 className="mt-3">Skills</h5>
        <ul>
          {formData.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={downloadPDF}>
          Download Resume as PDF
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;
