import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import TemplateSelection from './components/TemplateSelection';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/templates" element={<TemplateSelection />} />
          <Route path="/form" element={<ResumeForm />} />
          <Route path="/preview" element={<ResumePreview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


