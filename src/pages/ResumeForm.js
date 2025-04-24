import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import axios from 'axios';
// import SummaryGenerator from '../components/SummaryGenerator';



// --- Dropdown Options ---
const countryOptions = [
  { value: 'India', label: 'India' },
  { value: 'USA', label: 'USA' },
  { value: 'UK', label: 'UK' },
];

const stateOptions = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
  
    // Union Territories
    { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Dadra and Nagar Haveli and Daman and Diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
    { value: 'Ladakh', label: 'Ladakh' },
    { value: 'Lakshadweep', label: 'Lakshadweep' },
    { value: 'Puducherry', label: 'Puducherry' }
];


const technicalSkillOptions = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'Express.js', label: 'Express.js' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'C++', label: 'C++' },
    { value: 'Docker', label: 'Docker' },
    { value: 'Kubernetes', label: 'Kubernetes' },
    { value: 'AWS', label: 'AWS' },
    { value: 'Azure', label: 'Azure' },
    { value: 'Google Cloud Platform', label: 'Google Cloud Platform' },
    { value: 'TensorFlow', label: 'TensorFlow' },
    { value: 'PyTorch', label: 'PyTorch' },
    { value: 'Scikit-learn', label: 'Scikit-learn' },
    { value: 'SQL', label: 'SQL' },
    { value: 'PostgreSQL', label: 'PostgreSQL' },
    { value: 'MySQL', label: 'MySQL' },
    { value: 'Cassandra', label: 'Cassandra' },
    { value: 'Apache Kafka', label: 'Apache Kafka' },
    { value: 'Apache Spark', label: 'Apache Spark' },
    { value: 'Hadoop', label: 'Hadoop' },
    { value: 'Tableau', label: 'Tableau' },
    { value: 'Power BI', label: 'Power BI' },
    { value: 'Solidity', label: 'Solidity' },
    { value: 'Ethereum', label: 'Ethereum' },
    { value: 'Hyperledger', label: 'Hyperledger' },
    { value: 'Rust', label: 'Rust' },
    { value: 'Go', label: 'Go' },
    { value: 'Flutter', label: 'Flutter' },
    { value: 'React Native', label: 'React Native' },
    { value: 'Swift', label: 'Swift' },
    { value: 'Kotlin', label: 'Kotlin' },
    { value: 'Unity', label: 'Unity' },
    { value: 'Unreal Engine', label: 'Unreal Engine' },
    { value: 'Blender', label: 'Blender' },
    { value: 'Figma', label: 'Figma' },
    { value: 'Adobe XD', label: 'Adobe XD' },
    { value: 'Git', label: 'Git' },
    { value: 'Jenkins', label: 'Jenkins' },
    { value: 'Terraform', label: 'Terraform' },
    { value: 'Ansible', label: 'Ansible' },
    { value: 'CI/CD', label: 'CI/CD' },
    { value: 'Agile Methodologies', label: 'Agile Methodologies' },
    { value: 'Scrum', label: 'Scrum' },
    { value: 'Kanban', label: 'Kanban' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Cybersecurity', label: 'Cybersecurity' },
    { value: 'OWASP', label: 'OWASP' },
    { value: 'OAuth2', label: 'OAuth2' },
    { value: 'Penetration Testing', label: 'Penetration Testing' },
    { value: 'Zero Trust Architecture', label: 'Zero Trust Architecture' },
    { value: 'IoT Development', label: 'IoT Development' },
    { value: 'MQTT', label: 'MQTT' },
    { value: 'Arduino', label: 'Arduino' },
    { value: 'Raspberry Pi', label: 'Raspberry Pi' },
    { value: 'Quantum Computing', label: 'Quantum Computing' },
    { value: 'Qiskit', label: 'Qiskit' },
    { value: 'Cirq', label: 'Cirq' },
    { value: 'Edge Computing', label: 'Edge Computing' },
    { value: 'AWS Greengrass', label: 'AWS Greengrass' },
    { value: 'WebAssembly', label: 'WebAssembly' },
    { value: 'Three.js', label: 'Three.js' },
    { value: 'Babylon.js', label: 'Babylon.js' },
    { value: 'Progressive Web Apps', label: 'Progressive Web Apps' },
    { value: 'Next.js', label: 'Next.js' },
    { value: 'Gatsby', label: 'Gatsby' },
    { value: 'LangChain', label: 'LangChain' },
    { value: 'OpenAI APIs', label: 'OpenAI APIs' },
    { value: 'Prompt Engineering', label: 'Prompt Engineering' },
    { value: 'MLOps', label: 'MLOps' },
    { value: 'Data Engineering', label: 'Data Engineering' },
    { value: 'ETL Processes', label: 'ETL Processes' },
    { value: 'Data Warehousing', label: 'Data Warehousing' },
    { value: 'NoSQL', label: 'NoSQL' },
    { value: 'RESTful APIs', label: 'RESTful APIs' },
    { value: 'GraphQL', label: 'GraphQL' },
    { value: 'API Integration', label: 'API Integration' },
    { value: 'Version Control', label: 'Version Control' },
    { value: 'GitHub', label: 'GitHub' },
    { value: 'GitLab', label: 'GitLab' },
    { value: 'Bitbucket', label: 'Bitbucket' },
    { value: 'CI/CD Pipelines', label: 'CI/CD Pipelines' },
    { value: 'Infrastructure as Code', label: 'Infrastructure as Code' },
    { value: 'Serverless Computing', label: 'Serverless Computing' },
    { value: 'AWS Lambda', label: 'AWS Lambda' },
    { value: 'Azure Functions', label: 'Azure Functions' },
    { value: 'Google Cloud Functions', label: 'Google Cloud Functions' },
    { value: 'Sustainability in Software', label: 'Sustainability in Software' },
    { value: 'Energy-Efficient Coding', label: 'Energy-Efficient Coding' },
    { value: 'Carbon Footprint Measurement', label: 'Carbon Footprint Measurement' },
    { value: 'Low-Code Platforms', label: 'Low-Code Platforms' },
    { value: 'OutSystems', label: 'OutSystems' },
    { value: 'Microsoft PowerApps', label: 'Microsoft PowerApps' },
    { value: 'Cross-Platform Development', label: 'Cross-Platform Development' },
   
  
   
];  
const nonTechnicalSkillOptions = [
  { value: 'Communication', label: 'Communication' },
  { value: 'Leadership', label: 'Leadership' },
  { value: 'Time Management', label: 'Time Management' },
  { value: 'Critical Thinking', label: 'Critical Thinking' },
  { value: 'Teamwork', label: 'Teamwork' },
  { value: 'Problem Solving', label: 'Problem Solving' }
];


  

const ResumeForm = () => {
  // --- Personal Details ---
  const [dob, setDob] = useState(null);
  const [phones, setPhones] = useState(['']);
  const [emails, setEmails] = useState(['']);

  const addPhone = () => setPhones([...phones, '']);
  const addEmail = () => setEmails([...emails, '']);

  // --- Education Section ---
  const degreeOptions = [
    { value: 'B.Tech', label: 'B.Tech' },
    { value: 'M.Tech', label: 'M.Tech' },
    { value: 'B.Sc', label: 'B.Sc' },
    { value: 'M.Sc', label: 'M.Sc' },
    { value: 'B.Com', label: 'B.Com' },
    { value: 'MBA', label: 'MBA' }
  ];
  const yearOptions = Array.from({ length: 30 }, (_, i) => {
    const year = 2025 - i;
    return { value: year, label: year.toString() };
  });
  const [educationList, setEducationList] = useState([
    { school: '', degree: '', passingYear: '' }
  ]);
  const handleEduChange = (index, field, value) => {
    const updatedList = [...educationList];
    updatedList[index][field] = value;
    setEducationList(updatedList);
  };
  const addEducation = () => {
    setEducationList([...educationList, { school: '', degree: '', passingYear: '' }]);
  };

  // --- Experience Section ---
  const [experienceList, setExperienceList] = useState([
    { company: '', role: '', startDate: null, endDate: null, responsibilities: '' }
  ]);
  const [currentJob, setCurrentJob] = useState({
    company: '',
    role: '',
    startDate: null,
    isWorking: true,
  });
  const handleExperienceChange = (index, field, value) => {
    const updated = [...experienceList];
    updated[index][field] = value;
    setExperienceList(updated);
  };
  const addExperience = () => {
    setExperienceList([
      ...experienceList,
      { company: '', role: '', startDate: null, endDate: null, responsibilities: '' }
    ]);
  };

  // --- Skills Section ---
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [nonTechnicalSkills, setNonTechnicalSkills] = useState([]);

  // PROJECT SECTION STATE
const [projects, setProjects] = useState([
    { title: '', technologies: '', description: '', startDate: null, endDate: null }
  ]);
  
  // HANDLE CHANGE IN PROJECT FIELDS
  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };
  
  // ADD MORE PROJECTS
  const addProject = () => {
    setProjects([
      ...projects,
      { title: '', technologies: '', description: '', startDate: null, endDate: null }
    ]);
  };
  
  const handleSocialChange = (field, value) => {
    setSocialLinks({
      ...socialLinks,
      [field]: value
    });
  };

  





  
// SOCIAL LINKS STATE
const [socialLinks, setSocialLinks] = useState({
    github: '',
    linkedin: '',
    portfolio: '',
    twitter: '',
    medium: ''
  });



  

  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       dob,
//       phones,
//       emails,
//       educationList,
//       experienceList,
//       currentJob,
//       technicalSkills,
//       nonTechnicalSkills,
//       projects,
//       socialLinks,
//     };

//     try {
//       const response = await axios.post('http://localhost:5000/api/resume', formData);
//       alert('Resume submitted successfully!');
//     } catch (error) {
//       console.error('Submission error:', error);
//       alert('Error submitting resume');
//     }
//   };



const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      dob,
      phones,
      emails,
      educationList,
      experienceList,
      currentJob,
      technicalSkills,
      nonTechnicalSkills,
      projects,
      socialLinks,
    };
    try {
      await axios.post('http://localhost:5000/api/resume', formData);
      alert('Resume submitted successfully!');
    } catch (error) {
      console.error('Error submitting resume:', error);
      alert('There was an error submitting your resume');
    }
  };
   

  

  return (
    <div className="container mt-4">
         
      {/* === Personal Details Section === */}
      <h3>Personal Details</h3>
      <div className="row">
        <div className="col-md-6 my-2">
          <label>First Name</label>
          <input className="form-control" name="firstName" />
        </div>
        <div className="col-md-6 my-2">
          <label>Last Name</label>
          <input className="form-control" name="lastName" />
        </div>
        <div className="col-md-6 my-2">
          <label>Date of Birth</label><br />
          <DatePicker selected={dob} onChange={(date) => setDob(date)} className="form-control" />
        </div>

        {phones.map((phone, idx) => (
          <div className="col-md-6 my-2" key={idx}>
            <label>Phone {idx + 1}</label>
            <input className="form-control" name={`phone-${idx}`} />
          </div>
        ))}
        <div className="col-md-12 mb-2">
          <button onClick={addPhone} className="btn btn-sm btn-primary">+ Add Phone</button>
        </div>

        {emails.map((email, idx) => (
          <div className="col-md-6 my-2" key={idx}>
            <label>Email {idx + 1}</label>
            <input className="form-control" name={`email-${idx}`} />
          </div>
        ))}
        <div className="col-md-12 mb-2">
          <button onClick={addEmail} className="btn btn-sm btn-primary">+ Add Email</button>
        </div>

        <div className="col-md-4 my-2">
          <label>City</label>
          <input className="form-control" name="city" />
        </div>
        <div className="col-md-4 my-2">
          <label>State</label>
          <Select options={stateOptions} />
        </div>
        <div className="col-md-4 my-2">
          <label>PIN Code</label>
          <input className="form-control" name="pin" />
        </div>
        <div className="col-md-6 my-2">
          <label>Country</label>
          <Select options={countryOptions} />
        </div>
      </div>

      {/* === Education Section === */}
      <hr />
      <h3 className="mt-4">Education</h3>
      {educationList.map((edu, idx) => (
        <div className="row" key={idx}>
          <div className="col-md-4 my-2">
            <label>School/College</label>
            <input
              className="form-control"
              value={edu.school}
              onChange={(e) => handleEduChange(idx, 'school', e.target.value)}
            />
          </div>
          <div className="col-md-4 my-2">
            <label>Degree</label>
            <Select
              options={degreeOptions}
              onChange={(selected) => handleEduChange(idx, 'degree', selected.value)}
            />
          </div>
          <div className="col-md-4 my-2">
            <label>Passing Year</label>
            <Select
              options={yearOptions}
              onChange={(selected) => handleEduChange(idx, 'passingYear', selected.value)}
            />
          </div>
        </div>
      ))}
      <div className="my-3">
        <button onClick={addEducation} className="btn btn-sm btn-outline-primary">
          + Add More Education
        </button>
      </div>

      {/* === Experience Section === */}
      <hr />
      <h3 className="mt-4">Professional Information</h3>
      {experienceList.map((exp, idx) => (
        <div className="row" key={idx}>
          <div className="col-md-4 my-2">
            <label>Company Name</label>
            <input
              className="form-control"
              value={exp.company}
              onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)}
            />
          </div>
          <div className="col-md-4 my-2">
            <label>Role</label>
            <input
              className="form-control"
              value={exp.role}
              onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
            />
          </div>
          <div className="col-md-2 my-2">
            <label>Start Date</label><br />
            <DatePicker
              selected={exp.startDate}
              onChange={(date) => handleExperienceChange(idx, 'startDate', date)}
              className="form-control"
            />
          </div>
          <div className="col-md-2 my-2">
            <label>End Date</label><br />
            <DatePicker
              selected={exp.endDate}
              onChange={(date) => handleExperienceChange(idx, 'endDate', date)}
              className="form-control"
            />
          </div>
          <div className="col-md-12 my-2">
            <label>Responsibilities</label>
            <input
              className="form-control"
              value={exp.responsibilities}
              onChange={(e) => handleExperienceChange(idx, 'responsibilities', e.target.value)}
            />
          </div>
        </div>
      ))}
      <div className="mb-3">
        <button onClick={addExperience} className="btn btn-sm btn-outline-primary">
          + Add More Experience
        </button>
      </div>

      {/* === Current Job Section === */}
      <h5 className="mt-4">Current Company</h5>
      <div className="row">
        <div className="col-md-4 my-2">
          <label>Company Name</label>
          <input
            className="form-control"
            value={currentJob.company}
            onChange={(e) => setCurrentJob({ ...currentJob, company: e.target.value })}
          />
        </div>
        <div className="col-md-4 my-2">
          <label>Role</label>
          <input
            className="form-control"
            value={currentJob.role}
            onChange={(e) => setCurrentJob({ ...currentJob, role: e.target.value })}
          />
        </div>
        <div className="col-md-4 my-2">
          <label>Start Date</label><br />
          <DatePicker
            selected={currentJob.startDate}
            onChange={(date) => setCurrentJob({ ...currentJob, startDate: date })}
            className="form-control"
          />
        </div>
        <div className="col-md-12">
          <div className="form-check mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              checked={currentJob.isWorking}
              onChange={(e) => setCurrentJob({ ...currentJob, isWorking: e.target.checked })}
              id="workingNow"
            />
            <label className="form-check-label" htmlFor="workingNow">Still Working Here</label>
          </div>
        </div>
      </div>

      {/* === Skills Section === */}
      <hr />
      <h3 className="mt-4">Skills</h3>
      <div className="row">
        <div className="col-md-6 my-2">
          <label>Technical Skills</label>
          <Select
            options={technicalSkillOptions}
            isMulti
            onChange={(selected) => setTechnicalSkills(selected)}
            placeholder="Select technical skills"
          />
        </div>
        <div className="col-md-6 my-2">
          <label>Non-Technical Skills</label>
          <Select
            options={nonTechnicalSkillOptions}
            isMulti
            onChange={(selected) => setNonTechnicalSkills(selected)}
            placeholder="Select soft skills"
          />
          <hr />
<h3 className="mt-4">Projects</h3>

{projects.map((proj, idx) => (
  <div className="row" key={idx}>
    <div className="col-md-4 my-2">
      <label>Project Title</label>
      <input
        className="form-control"
        value={proj.title}
        onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
      />
    </div>
    <div className="col-md-4 my-2">
      <label>Technologies Used</label>
      <input
        className="form-control"
        placeholder="e.g., React, Node.js"
        value={proj.technologies}
        onChange={(e) => handleProjectChange(idx, 'technologies', e.target.value)}
      />
    </div>
    <div className="col-md-4 my-2">
      <label>Description</label>
      <input
        className="form-control"
        placeholder="Short project summary"
        value={proj.description}
        onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
      />
    </div>
    <div className="col-md-2 my-2">
      <label>Start Date</label><br />
      <DatePicker
        selected={proj.startDate}
        onChange={(date) => handleProjectChange(idx, 'startDate', date)}
        className="form-control"
      />
    </div>
    <div className="col-md-2 my-2">
      <label>End Date</label><br />
      <DatePicker
        selected={proj.endDate}
        onChange={(date) => handleProjectChange(idx, 'endDate', date)}
        className="form-control"
      />
    </div>

  </div>

))}

<div className="my-3">
  <button onClick={addProject} className="btn btn-sm btn-outline-primary">
    + Add More Projects
  </button>
</div>

<hr />
<h3 className="mt-4">Social Media Links</h3>
<div className="row">
  <div className="col-md-6 my-2">
    <label>GitHub</label>
    <input
      className="form-control"
      placeholder="https://github.com/yourname"
      value={socialLinks.github}
      onChange={(e) => handleSocialChange('github', e.target.value)}
    />
  </div>
  <div className="col-md-6 my-2">
    <label>LinkedIn</label>
    <input
      className="form-control"
      placeholder="https://linkedin.com/in/yourname"
      value={socialLinks.linkedin}
      onChange={(e) => handleSocialChange('linkedin', e.target.value)}
    />
  </div>
  <div className="col-md-6 my-2">
    <label>Portfolio Website</label>
    <input
      className="form-control"
      placeholder="https://yourportfolio.com"
      value={socialLinks.portfolio}
      onChange={(e) => handleSocialChange('portfolio', e.target.value)}
    />
  </div>

  <div className="col-md-6 my-2">
    <label>Twitter</label>
    <input
      className="form-control"
      placeholder="https://twitter.com/yourhandle"
      value={socialLinks.twitter}
      onChange={(e) => handleSocialChange('twitter', e.target.value)}
    />
  </div>


  <hr />
  <form onSubmit={handleSubmit}>
  <div className="text-center mt-4 mb-5">
  <button className="btn btn-success px-4 py-2">Submit</button>
</div>
  </form>


</div>


        </div>
      </div>
    </div>
  );
};


export default ResumeForm;

