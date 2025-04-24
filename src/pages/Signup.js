
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group my-2">
          <label>Name</label>
          <input type="text" className="form-control" name="name" onChange={handleChange} required />
        </div>
        <div className="form-group my-2">
          <label>Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} required />
        </div>
        <div className="form-group my-2">
          <label>Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
