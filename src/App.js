// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import ResumeForm from './pages/ResumeForm';

// import ResumePreview from "./components/ResumePreview";
// import formData from "./data/sampleFormData";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} /> 
//         <Route path="/form" element={<ResumeForm />} /> 
//       </Routes>
//     </Router>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//       <ResumePreview formData={formData} />
//     </div>
//   );
// }


// export default App;


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ResumeForm from './pages/ResumeForm';
import ResumePreview from "./components/ResumePreview";
import formData from "./data/sampleFormData";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/form" element={<ResumeForm />} /> 
          <Route path="/preview" element={<ResumePreview formData={formData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

