import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResumeForm from './pages/ResumeForm';
import ResumePreview from './components/ResumePreview';
import Auth from './pages/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<ResumeForm />} />
        <Route path="/preview" element={<ResumePreview />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;


