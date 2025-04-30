import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Auth = () => {
  const [mode, setMode] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '' });
  const [showForgot, setShowForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'https://apna-cv-maker-server.onrender.com/api';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!loginData.email || !loginData.password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: loginData.email,
        password: loginData.password
      });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.email);
        setLoading(false);
        navigate('/templates');
      } else {
        setError('Invalid response from server.');
        setLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!signupData.email || !signupData.password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        email: signupData.email,
        password: signupData.password
      });
      if (response.data && response.data.message === 'User registered successfully') {
        setLoading(false);
        navigate('/templates');
      } else {
        setError('Invalid response from server.');
        setLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed.');
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgot(true);
    // You can add forgot password logic here
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-center mb-4">Welcome to Apna CV Maker</h2>
        <div className="d-flex justify-content-center mb-4">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setShowForgot(false); setError(''); }}
          >
            Log In
          </button>
          <button
            className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => { setMode('signup'); setShowForgot(false); setError(''); }}
          >
            Sign Up
          </button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {mode === 'login' && !showForgot && (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email <span className="text-danger">*</span></label>
              <input
                type="email"
                className="form-control"
                value={loginData.email}
                onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                required
                disabled={loading}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password <span className="text-danger">*</span></label>
              <input
                type="password"
                className="form-control"
                value={loginData.password}
                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                required
                disabled={loading}
                placeholder="Enter your password"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </button>
              <button type="button" className="btn btn-link p-0" onClick={() => setShowForgot(true)} disabled={loading}>
                Forgot Password?
              </button>
            </div>
          </form>
        )}
        {mode === 'signup' && (
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label">Email <span className="text-danger">*</span></label>
              <input
                type="email"
                className="form-control"
                value={signupData.email}
                onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                required
                disabled={loading}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password <span className="text-danger">*</span></label>
              <input
                type="password"
                className="form-control"
                value={signupData.password}
                onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                required
                disabled={loading}
                placeholder="Create a password"
              />
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        )}
        {showForgot && (
          <div className="alert alert-info mt-3">
            Please contact support to reset your password.
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth; 