import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SummaryGenerator from '../components/SummaryGenerator';
import './ResumeForm.css';

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

// hobbi options

const hobbyOptions = [
    { value: 'Reading', label: 'Reading' },
    { value: 'Traveling', label: 'Traveling' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Music', label: 'Music' },
    { value: 'Cooking', label: 'Cooking' },
    { value: 'Drawing', label: 'Drawing' },
    { value: 'Blogging', label: 'Blogging' }
  ];

// Role options categorized by industry
const roleOptions = [
  // Technical Roles
  { value: 'software_engineer', label: 'Software Engineer' },
  { value: 'frontend_developer', label: 'Frontend Developer' },
  { value: 'backend_developer', label: 'Backend Developer' },
  { value: 'fullstack_developer', label: 'Full Stack Developer' },
  { value: 'mobile_developer', label: 'Mobile Developer' },
  { value: 'data_scientist', label: 'Data Scientist' },
  { value: 'data_analyst', label: 'Data Analyst' },
  { value: 'devops_engineer', label: 'DevOps Engineer' },
  { value: 'cloud_architect', label: 'Cloud Architect' },
  { value: 'system_admin', label: 'System Administrator' },
  { value: 'network_engineer', label: 'Network Engineer' },
  { value: 'security_engineer', label: 'Security Engineer' },
  { value: 'qa_engineer', label: 'QA Engineer' },
  { value: 'ml_engineer', label: 'Machine Learning Engineer' },

  // Non-Technical Business Roles
  { value: 'project_manager', label: 'Project Manager' },
  { value: 'product_manager', label: 'Product Manager' },
  { value: 'business_analyst', label: 'Business Analyst' },
  { value: 'data_analyst_business', label: 'Business Data Analyst' },
  { value: 'marketing_manager', label: 'Marketing Manager' },
  { value: 'sales_manager', label: 'Sales Manager' },
  { value: 'hr_manager', label: 'HR Manager' },
  { value: 'operations_manager', label: 'Operations Manager' },
  { value: 'finance_manager', label: 'Finance Manager' },
  { value: 'account_manager', label: 'Account Manager' },

  // Hospitality Roles
  { value: 'hotel_manager', label: 'Hotel Manager' },
  { value: 'restaurant_manager', label: 'Restaurant Manager' },
  { value: 'chef', label: 'Chef' },
  { value: 'sous_chef', label: 'Sous Chef' },
  { value: 'pastry_chef', label: 'Pastry Chef' },
  { value: 'food_beverage_manager', label: 'Food & Beverage Manager' },
  { value: 'event_coordinator', label: 'Event Coordinator' },
  { value: 'housekeeping_manager', label: 'Housekeeping Manager' },
  { value: 'front_desk_manager', label: 'Front Desk Manager' },
  { value: 'concierge', label: 'Concierge' },

  // Trade & Construction Roles
  { value: 'carpenter', label: 'Carpenter' },
  { value: 'electrician', label: 'Electrician' },
  { value: 'plumber', label: 'Plumber' },
  { value: 'hvac_technician', label: 'HVAC Technician' },
  { value: 'construction_manager', label: 'Construction Manager' },
  { value: 'civil_engineer', label: 'Civil Engineer' },
  { value: 'architect', label: 'Architect' },
  { value: 'welder', label: 'Welder' },
  { value: 'mason', label: 'Mason' },
  { value: 'painter', label: 'Painter' },
  { value: 'landscaper', label: 'Landscaper' },

  // Healthcare Roles
  { value: 'doctor', label: 'Doctor' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'pharmacist', label: 'Pharmacist' },
  { value: 'physical_therapist', label: 'Physical Therapist' },
  { value: 'dental_hygienist', label: 'Dental Hygienist' },
  { value: 'medical_technologist', label: 'Medical Technologist' },
  { value: 'radiologist', label: 'Radiologist' },
  { value: 'healthcare_administrator', label: 'Healthcare Administrator' },

  // Education Roles
  { value: 'teacher', label: 'Teacher' },
  { value: 'professor', label: 'Professor' },
  { value: 'principal', label: 'Principal' },
  { value: 'education_coordinator', label: 'Education Coordinator' },
  { value: 'curriculum_developer', label: 'Curriculum Developer' },
  { value: 'special_education_teacher', label: 'Special Education Teacher' },
  { value: 'school_counselor', label: 'School Counselor' },

  // Creative Roles
  { value: 'graphic_designer', label: 'Graphic Designer' },
  { value: 'ui_ux_designer', label: 'UI/UX Designer' },
  { value: 'content_writer', label: 'Content Writer' },
  { value: 'copywriter', label: 'Copywriter' },
  { value: 'digital_marketing_specialist', label: 'Digital Marketing Specialist' },
  { value: 'social_media_manager', label: 'Social Media Manager' },
  { value: 'video_editor', label: 'Video Editor' },
  { value: 'photographer', label: 'Photographer' },
  { value: 'interior_designer', label: 'Interior Designer' }
];

const ResumeForm = () => {
  // --- Personal Details ---
  const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(null);
  const [phones, setPhones] = useState(['']);
  const [emails, setEmails] = useState(['']);
  const [summary, setSummary] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pin, setPin] = useState('');

  const addPhone = () => setPhones([...phones, '']);
  const addEmail = () => setEmails([...emails, '']);

  // --- Education Section ---
  const degreeOptions = [
    // B.Tech Specializations
  { value: 'B.Tech_Computer', label: 'B.Tech in Computer Science' },
  { value: 'B.Tech_Electronics', label: 'B.Tech in Electronics and Communication' },
  { value: 'B.Tech_Electrical', label: 'B.Tech in Electrical Engineering' },
  { value: 'B.Tech_Civil', label: 'B.Tech in Civil Engineering' },
  { value: 'B.Tech_Mechanical', label: 'B.Tech in Mechanical Engineering' },
  { value: 'B.Tech_IT', label: 'B.Tech in Information Technology' },

  // M.Tech Specializations
  { value: 'M.Tech_Computer', label: 'M.Tech in Computer Science' },
  { value: 'M.Tech_Electronics', label: 'M.Tech in Electronics and Communication' },
  { value: 'M.Tech_Electrical', label: 'M.Tech in Electrical Engineering' },
  { value: 'M.Tech_Civil', label: 'M.Tech in Civil Engineering' },
  { value: 'M.Tech_Mechanical', label: 'M.Tech in Mechanical Engineering' },
  { value: 'M.Tech_IT', label: 'M.Tech in Information Technology' },

  // B.Sc Specializations
  { value: 'B.Sc_Physics', label: 'B.Sc in Physics' },
  { value: 'B.Sc_Chemistry', label: 'B.Sc in Chemistry' },
  { value: 'B.Sc_Biology', label: 'B.Sc in Biology' },
  { value: 'B.Sc_Mathematics', label: 'B.Sc in Mathematics' },
  { value: 'B.Sc_Computer', label: 'B.Sc in Computer Science' },

  // M.Sc Specializations
  { value: 'M.Sc_Physics', label: 'M.Sc in Physics' },
  { value: 'M.Sc_Chemistry', label: 'M.Sc in Chemistry' },
  { value: 'M.Sc_Biology', label: 'M.Sc in Biology' },
  { value: 'M.Sc_Mathematics', label: 'M.Sc in Mathematics' },
  { value: 'M.Sc_Computer', label: 'M.Sc in Computer Science' },

  // B.Com Specializations
  { value: 'B.Com_General', label: 'B.Com General' },
  { value: 'B.Com_Accounting', label: 'B.Com in Accounting and Finance' },
  { value: 'B.Com_Management', label: 'B.Com in Business Management' },

  // MBA Specializations
  { value: 'MBA_Marketing', label: 'MBA in Marketing' },
  { value: 'MBA_HR', label: 'MBA in Human Resource Management' },
  { value: 'MBA_Finance', label: 'MBA in Finance' },
  { value: 'MBA_IT', label: 'MBA in Information Technology' },
  { value: 'MBA_Operations', label: 'MBA in Operations Management' },

  // School
  { value: '10th_CBSE', label: '10th (CBSE)' },
  { value: '10th_State', label: '10th (State Board)' },
  { value: '12th_Science', label: '12th with Science' },
  { value: '12th_Commerce', label: '12th with Commerce' },
  { value: '12th_Arts', label: '12th with Arts' },
    // Diploma Courses
  { value: 'Diploma_Electronics', label: 'Diploma in Electronics Engineering' },
  { value: 'Diploma_Electrical', label: 'Diploma in Electrical Engineering' },
  { value: 'Diploma_Mechanical', label: 'Diploma in Mechanical Engineering' },
  { value: 'Diploma_Civil', label: 'Diploma in Civil Engineering' },
  { value: 'Diploma_Computer', label: 'Diploma in Computer Science' },
  { value: 'Diploma_IT', label: 'Diploma in Information Technology' },
  { value: 'Diploma_Automobile', label: 'Diploma in Automobile Engineering' },
  { value: 'Diploma_Aeronautical', label: 'Diploma in Aeronautical Engineering' },
  { value: 'Diploma_Mining', label: 'Diploma in Mining Engineering' },
  { value: 'Diploma_Chemical', label: 'Diploma in Chemical Engineering' },
  { value: 'Diploma_Textile', label: 'Diploma in Textile Engineering' },
  { value: 'Diploma_Fashion', label: 'Diploma in Fashion Designing' },
  { value: 'Diploma_Interior', label: 'Diploma in Interior Designing' },
  { value: 'Diploma_Tool', label: 'Diploma in Tool and Die Making' },
  { value: 'Diploma_Marine', label: 'Diploma in Marine Engineering' },
  { value: 'Diploma_Petroleum', label: 'Diploma in Petroleum Engineering' },

  // ITI Courses
  { value: 'ITI_Electrician', label: 'ITI Electrician' },
  { value: 'ITI_Fitter', label: 'ITI Fitter' },
  { value: 'ITI_Welder', label: 'ITI Welder' },
  { value: 'ITI_Mechanic_Diesel', label: 'ITI Mechanic Diesel' },
  { value: 'ITI_Turner', label: 'ITI Turner' },
  { value: 'ITI_Mechanic_Motor', label: 'ITI Mechanic Motor Vehicle' },
  { value: 'ITI_Machinist', label: 'ITI Machinist' },
  { value: 'ITI_Plumber', label: 'ITI Plumber' },
  { value: 'ITI_COPA', label: 'ITI Computer Operator and Programming Assistant (COPA)' },
  { value: 'ITI_Draftsman_Civil', label: 'ITI Draftsman Civil' },
  { value: 'ITI_Draftsman_Mechanical', label: 'ITI Draftsman Mechanical' },
  { value: 'ITI_Electronics_Mechanic', label: 'ITI Electronics Mechanic' },
  { value: 'ITI_Instrument_Mechanic', label: 'ITI Instrument Mechanic' },
  { value: 'ITI_Tool_Die_Maker', label: 'ITI Tool and Die Maker' },
  { value: 'ITI_Information_Tech', label: 'ITI Information Technology' },
  { value: 'ITI_Refrigeration', label: 'ITI Refrigeration and Air Conditioning' }

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

  const [hobbies, setHobbies] = useState([]);
  const navigate = useNavigate();



  // --- Experience Section ---
  const [experienceList, setExperienceList] = useState([
    { company: '', role: '', startDate: null, endDate: null, responsibilities: '' }
  ]);
  const [currentJob, setCurrentJob] = useState({
    company: '',
    role: '',
    roleLabel: '',
    startDate: null,
    isWorking: true,
  });
  const handleExperienceChange = (index, field, value) => {
    const updated = [...experienceList];
    if (field === 'role') {
      updated[index][field] = value.value; // Store the value for role
      updated[index].roleLabel = value.label; // Store the label for display
    } else {
    updated[index][field] = value;
    }
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

  const handleSummaryGenerated = (generatedSummary) => {
    setSummary(generatedSummary);
  };

  // On mount, check localStorage for saved form data
  useEffect(() => {
    const savedData = localStorage.getItem('resumeFormData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setFirstName(data.firstName || '');
      setLastName(data.lastName || '');
      setDob(data.dob ? new Date(data.dob) : null);
      setPhones(data.phones || ['']);
      setEmails(data.emails || ['']);
      setSummary(data.summary || '');
      setState(data.state || '');
      setCountry(data.country || '');
      setPin(data.pin || '');
      setEducationList(data.educationList || [{ school: '', degree: '', passingYear: '' }]);
      setExperienceList(data.experienceList || [{ company: '', role: '', startDate: null, endDate: null, responsibilities: '' }]);
      setCurrentJob(data.currentJob || { company: '', role: '', roleLabel: '', startDate: null, isWorking: true });
      setTechnicalSkills(data.technicalSkills || []);
      setNonTechnicalSkills(data.nonTechnicalSkills || []);
      setProjects(data.projects || [{ title: '', technologies: '', description: '', startDate: null, endDate: null }]);
      setSocialLinks(data.socialLinks || { github: '', linkedin: '', portfolio: '', twitter: '', medium: '' });
      setHobbies(data.hobbies || []);
    }
  }, []);

  const API_URL = process.env.REACT_APP_API_URL || 'https://apna-cv-maker-server.onrender.com/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (!firstName || !lastName || !dob) {
      alert('Please fill in all required fields (First Name, Last Name, and Date of Birth)');
      return;
    }

    // Format the data before sending to server
    const formData = {
      firstName,
      lastName,
      dob: dob ? dob.toISOString().split('T')[0] : '',
      phones: phones.filter(phone => phone.trim() !== ''),
      emails: emails.filter(email => email.trim() !== ''),
      state,
      country,
      pin,
      educationList: educationList.filter(edu => edu.school && edu.degree && edu.passingYear).map(edu => ({
        ...edu,
        passingYear: edu.passingYear ? edu.passingYear.toString() : ''
      })),
      experienceList: experienceList.filter(exp => exp.company && exp.role).map(exp => ({
        ...exp,
        startDate: exp.startDate
          ? (exp.startDate instanceof Date
              ? exp.startDate.toISOString().split('T')[0]
              : new Date(exp.startDate).toISOString().split('T')[0])
          : null,
        endDate: exp.endDate
          ? (exp.endDate instanceof Date
              ? exp.endDate.toISOString().split('T')[0]
              : new Date(exp.endDate).toISOString().split('T')[0])
          : null
      })),
      currentJob: currentJob.company && currentJob.role ? {
        ...currentJob,
        startDate: currentJob.startDate
          ? (currentJob.startDate instanceof Date
              ? currentJob.startDate.toISOString().split('T')[0]
              : new Date(currentJob.startDate).toISOString().split('T')[0])
          : null
      } : null,
      technicalSkills: technicalSkills.map(skill => ({ value: skill.value, label: skill.label })),
      nonTechnicalSkills: nonTechnicalSkills.map(skill => ({ value: skill.value, label: skill.label })),
      projects: projects.filter(proj => proj.title && proj.description).map(proj => ({
        ...proj,
        startDate: proj.startDate
          ? (proj.startDate instanceof Date
              ? proj.startDate.toISOString().split('T')[0]
              : new Date(proj.startDate).toISOString().split('T')[0])
          : null,
        endDate: proj.endDate
          ? (proj.endDate instanceof Date
              ? proj.endDate.toISOString().split('T')[0]
              : new Date(proj.endDate).toISOString().split('T')[0])
          : null
      })),
      socialLinks: Object.fromEntries(Object.entries(socialLinks).filter(([_, value]) => value.trim() !== '')),
      hobbies: hobbies.map(hobby => ({ value: hobby.value, label: hobby.label })),
      summary,
    };
  
    // Save to localStorage
    localStorage.setItem('resumeFormData', JSON.stringify(formData));
  
    try {
      // Save to database
      const response = await axios.post(`${API_URL}/resume`, formData);
      
      if (response.status === 200) {
        // Navigate to preview page with the form data
        navigate('/preview', { 
          state: { 
            formData,
            resumeId: response.data.resumeId 
          } 
        });
      } else {
        throw new Error('Failed to save resume');
      }
    } catch (error) {
      console.error('Error submitting resume:', error);
      alert('There was an error submitting your resume. Please try again.');
    }
  };
  
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="resume-form-card">
            <div className="resume-form-bg">
              <div className="resume-form-card">
                {/* Home Button */}
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => navigate('/')}
                  >
                    Home
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  {/* === Personal Details Section === */}
                  <h3 className="resume-section-title">Personal Details</h3>
                  <div className="row">
                    <div className="col-md-6 my-2">
                      <label>First Name</label>
                      <input className="form-control"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="col-md-6 my-2">
                      <label>Last Name</label>
                      <input className="form-control"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="col-md-6 my-2">
                      <label>Date of Birth</label><br />
                      <DatePicker
                        selected={dob}
                        onChange={(date) => setDob(date)}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        autoComplete="off"
                        isClearable
                        customInput={
                          <input
                            type="text"
                            className="form-control"
                            value={dob ? dob.toLocaleDateString('en-GB') : ''}
                            onChange={e => {
                              const value = e.target.value;
                              const [day, month, year] = value.split('/');
                              if (day && month && year && day.length === 2 && month.length === 2 && year.length === 4) {
                                const parsed = new Date(`${year}-${month}-${day}`);
                                if (!isNaN(parsed)) setDob(parsed);
                              } else if (value === '') {
                                setDob(null);
                              }
                            }}
                            placeholder="dd/mm/yyyy"
                            autoComplete="off"
                          />
                        }
                      />
                    </div>

                    {phones.map((phone, idx) => (
                      <div className="col-md-6 my-2" key={idx}>
                        <label>Phone {idx + 1}</label>
                        <input 
                          className="form-control" 
                          name={`phone-${idx}`}
                          value={phone}
                          onChange={(e) => {
                            const updatedPhones = [...phones];
                            updatedPhones[idx] = e.target.value;
                            setPhones(updatedPhones);
                          }}
                        />
                      </div>
                    ))}
                    <div className="col-md-12 mb-2">
                      <button 
                        type="button" 
                        onClick={addPhone} 
                        className="btn btn-sm btn-primary me-2"
                      >
                        + Add Phone
                      </button>
                      <button 
                        type="button" 
                        onClick={addEmail} 
                        className="btn btn-sm btn-primary"
                      >
                        + Add Email
                      </button>
                    </div>

                    {emails.map((email, idx) => (
                      <div className="col-md-6 my-2" key={idx}>
                        <label>Email {idx + 1}</label>
                        <input 
                          className="form-control" 
                          name={`email-${idx}`}
                          value={email}
                          onChange={(e) => {
                            const updatedEmails = [...emails];
                            updatedEmails[idx] = e.target.value;
                            setEmails(updatedEmails);
                          }}
                        />
                      </div>
                    ))}

                    <div className="col-md-4 my-2">
                      <label>City</label>
                      <input className="form-control" name="city" />
                    </div>
                    <div className="col-md-4 my-2">
                      <label>State</label>
                      <Select options={stateOptions} onChange={selected => setState(selected ? selected.value : '')} />
                    </div>
                    <div className="col-md-4 my-2">
                      <label>PIN Code</label>
                      <input className="form-control" name="pin" value={pin} onChange={(e) => setPin(e.target.value)} />
                    </div>
                    <div className="col-md-6 my-2">
                      <label>Country</label>
                      <Select options={countryOptions} value={countryOptions.find(opt => opt.value === country) || null} onChange={selected => setCountry(selected ? selected.value : '')} />
                    </div>
                  </div>

                  {/* === Social Media Links Section === */}
                  <hr className="resume-divider" />
                  <h3 className="resume-section-title mt-4">Social Media Links</h3>
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
                  </div>

                  {/* === Education Section === */}
                  <hr className="resume-divider" />
                  <h3 className="resume-section-title mt-4">Education</h3>
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
                    <button 
                      type="button" 
                      onClick={addEducation} 
                      className="btn btn-sm btn-outline-primary"
                    >
                      + Add More Education
                    </button>
                  </div>

                  {/* === Experience Section === */}
                  <hr className="resume-divider" />
                  <h3 className="resume-section-title mt-4">Professional Information</h3>
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
                        <CreatableSelect
                          options={roleOptions}
                          value={exp.role ? { value: exp.role, label: exp.roleLabel || exp.role } : null}
                          onChange={(selected) => handleExperienceChange(idx, 'role', selected)}
                          placeholder="Select or type to search role"
                          isSearchable={true}
                          className="basic-select"
                          classNamePrefix="select"
                        />
                      </div>
                      <div className="col-md-2 my-2">
                        <label>Start Date</label><br />
                        <DatePicker
                          selected={exp.startDate}
                          onChange={(date) => handleExperienceChange(idx, 'startDate', date)}
                          className="form-control"
                          dateFormat="dd/MM/yyyy"
                          placeholderText="dd/mm/yyyy"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          autoComplete="off"
                          isClearable
                          customInput={
                            <input
                              type="text"
                              className="form-control"
                              value={exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-GB') : ''}
                              onChange={e => {
                                const value = e.target.value;
                                const [day, month, year] = value.split('/');
                                if (day && month && year && day.length === 2 && month.length === 2 && year.length === 4) {
                                  const parsed = new Date(`${year}-${month}-${day}`);
                                  if (!isNaN(parsed)) handleExperienceChange(idx, 'startDate', parsed);
                                } else if (value === '') {
                                  handleExperienceChange(idx, 'startDate', null);
                                }
                              }}
                              placeholder="dd/mm/yyyy"
                              autoComplete="off"
                            />
                          }
                        />
                      </div>
                      <div className="col-md-2 my-2">
                        <label>End Date</label><br />
                        <DatePicker
                          selected={exp.endDate}
                          onChange={(date) => handleExperienceChange(idx, 'endDate', date)}
                          className="form-control"
                          dateFormat="dd/MM/yyyy"
                          placeholderText="dd/mm/yyyy"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          autoComplete="off"
                          isClearable
                          customInput={
                            <input
                              type="text"
                              className="form-control"
                              value={exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-GB') : ''}
                              onChange={e => {
                                const value = e.target.value;
                                const [day, month, year] = value.split('/');
                                if (day && month && year && day.length === 2 && month.length === 2 && year.length === 4) {
                                  const parsed = new Date(`${year}-${month}-${day}`);
                                  if (!isNaN(parsed)) handleExperienceChange(idx, 'endDate', parsed);
                                } else if (value === '') {
                                  handleExperienceChange(idx, 'endDate', null);
                                }
                              }}
                              placeholder="dd/mm/yyyy"
                              autoComplete="off"
                            />
                          }
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
                    <button 
                      type="button" 
                      onClick={addExperience} 
                      className="btn btn-sm btn-outline-primary"
                    >
                      + Add More Experience
                    </button>
                  </div>

                  {/* === Current Job Section === */}
                  <h5 className="resume-section-title mt-4">Current Company</h5>
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
                      <CreatableSelect
                        options={roleOptions}
                        value={currentJob.role ? { value: currentJob.role, label: currentJob.roleLabel || currentJob.role } : null}
                        onChange={(selected) => setCurrentJob({ 
                          ...currentJob, 
                          role: selected.value,
                          roleLabel: selected.label 
                        })}
                        placeholder="Select or type to search role"
                        isSearchable={true}
                        className="basic-select"
                        classNamePrefix="select"
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
                  <hr className="resume-divider" />
                  <h3 className="resume-section-title mt-4">Skills</h3>
                  <div className="row">
                    <div className="col-md-6 my-2">
                      <label>Technical Skills</label>
                      <CreatableSelect
                        options={technicalSkillOptions}
                        isMulti
                        value={technicalSkills}
                        onChange={(selected) => setTechnicalSkills(selected)}
                        placeholder="Select or type technical skills"
                      />
                    </div>
                    <div className="col-md-6 my-2">
                      <label>Non-Technical Skills</label>
                      <CreatableSelect
                        options={nonTechnicalSkillOptions}
                        isMulti
                        value={nonTechnicalSkills}
                        onChange={(selected) => setNonTechnicalSkills(selected)}
                        placeholder="Select or type soft skills"
                      />
                    </div>
                  </div>

                  {/* === Projects Section === */}
                  <hr className="resume-divider" />
                  <h3 className="resume-section-title mt-4">Projects</h3>
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
                          dateFormat="dd/MM/yyyy"
                          placeholderText="dd/mm/yyyy"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          autoComplete="off"
                          isClearable
                          customInput={
                            <input
                              type="text"
                              className="form-control"
                              value={proj.startDate ? new Date(proj.startDate).toLocaleDateString('en-GB') : ''}
                              onChange={e => {
                                const value = e.target.value;
                                const [day, month, year] = value.split('/');
                                if (day && month && year && day.length === 2 && month.length === 2 && year.length === 4) {
                                  const parsed = new Date(`${year}-${month}-${day}`);
                                  if (!isNaN(parsed)) handleProjectChange(idx, 'startDate', parsed);
                                } else if (value === '') {
                                  handleProjectChange(idx, 'startDate', null);
                                }
                              }}
                              placeholder="dd/mm/yyyy"
                              autoComplete="off"
                            />
                          }
                        />
                      </div>
                      <div className="col-md-2 my-2">
                        <label>End Date</label><br />
                        <DatePicker
                          selected={proj.endDate}
                          onChange={(date) => handleProjectChange(idx, 'endDate', date)}
                          className="form-control"
                          dateFormat="dd/MM/yyyy"
                          placeholderText="dd/mm/yyyy"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          autoComplete="off"
                          isClearable
                          customInput={
                            <input
                              type="text"
                              className="form-control"
                              value={proj.endDate ? new Date(proj.endDate).toLocaleDateString('en-GB') : ''}
                              onChange={e => {
                                const value = e.target.value;
                                const [day, month, year] = value.split('/');
                                if (day && month && year && day.length === 2 && month.length === 2 && year.length === 4) {
                                  const parsed = new Date(`${year}-${month}-${day}`);
                                  if (!isNaN(parsed)) handleProjectChange(idx, 'endDate', parsed);
                                } else if (value === '') {
                                  handleProjectChange(idx, 'endDate', null);
                                }
                              }}
                              placeholder="dd/mm/yyyy"
                              autoComplete="off"
                            />
                          }
                        />
                      </div>
                    </div>
                  ))}

                  <div className="my-3">
                    <button 
                      type="button" 
                      onClick={addProject} 
                      className="btn btn-sm btn-outline-primary"
                    >
                      + Add More Projects
                    </button>
                  </div>

                  {/* === Hobbies Section */}
                  <hr className="resume-divider" />
                  <h3 className="resume-section-title mt-4">Hobbies</h3>
                  <div className="row">
                    <div className="col-12">
                      <Select
                        options={hobbyOptions}
                        isMulti
                        value={hobbies}
                        onChange={(selected) => setHobbies(selected)}
                        placeholder="Select your hobbies"
                        className="mb-3"
                      />
                    </div>
                  </div>

                  {/* === Summary Section */}
                  <div className="row">
                    <div className="col-12 my-2">
                      <h3 className="resume-section-title">Professional Summary</h3>
                      <SummaryGenerator 
                        formData={{
                          experienceList,
                          currentJob,
                          technicalSkills,
                          nonTechnicalSkills,
                          educationList,
                          projects
                        }}
                        onSummaryGenerated={handleSummaryGenerated}
                      />
                      <textarea
                        className="form-control"
                        rows="5"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Write a brief summary of your professional experience and skills..."
                      />
                    </div>
                  </div>
                  <div className="text-center mt-4 mb-5">
                    <button type="submit" className="btn btn-success resume-form-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="ad-container" style={{ height: '600px', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #dee2e6', borderRadius: '4px', position: 'sticky', top: '20px' }}>
            <span>Advertisement</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 


export default ResumeForm;



