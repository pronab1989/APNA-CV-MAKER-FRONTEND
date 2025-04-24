// src/components/HomePage.js
import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      alert("Resume uploaded successfully!");
      // Later: parse and allow edit
    } else {
      alert("Please upload a PDF file only.");
    }
  };

  

  return (
    <Container className="text-center my-5">
      <Row>
        <Col>
          <h1 className="mb-10">Welcome to <span style={{ color: 'blue' }}>Apna CV Maker</span></h1>
          <h4 className="text-muted mb-4"><em>Build Your Dream Resume in Minutes!</em></h4>

          <div className="text-center my-3">
  <Link to="/signup" className="btn btn-primary mx-2">Sign Up</Link>
  <Link to="/login" className="btn btn-primary mx-2">Log In</Link>
          </div>

          <div className="text-center p-4" style={{ backgroundColor: '#007bff', color: 'white' }}>
  <h2 className="mb-3">Why <span style={{ textDecoration: 'underline' }}>Apna CV Maker</span>?</h2>
  <p className="lead" style={{ maxWidth: '800px', margin: '0 auto' }}>
    Apna CV Maker was built for every job-seeker who wants a beautiful, professional resume
    without the hassle or high cost. Whether you're a student, fresher, or experienced
    professional, we make it easy and fast to build your dream CV — for free or at a very very low price.
    Simple, mobile-friendly, and designed to help you stand out.
  </p>
</div>

          <Form.Group>
            <Form.Label className="fw-bold fst-italic text-primary">Upload Resume (PDF Only)</Form.Label>
            <Form.Control type="file" accept="application/pdf" onChange={handleUpload} />
          </Form.Group>

          {selectedFile && (
            <p className="text-success mt-3">Uploaded: {selectedFile.name}</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};



export default HomePage;
