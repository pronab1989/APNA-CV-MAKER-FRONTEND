import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', mobile: '' });
  const [showForgot, setShowForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: loginData.email,
        password: loginData.password
      });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setLoading(false);
        navigate('/form');
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
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email: signupData.email,
        password: signupData.password
      });
      if (response.data && (response.data.token || response.data.message)) {
        // If backend returns token, store it. If only message, just show success.
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        setLoading(false);
        navigate('/form');
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
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <div className="card shadow p-4">
        <div className="d-flex justify-content-center mb-3">
          <button
            className={`btn btn-outline-primary me-2 ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setShowForgot(false); setError(''); }}
          >
            Log In
          </button>
          <button
            className={`btn btn-outline-success ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => { setMode('signup'); setShowForgot(false); setError(''); }}
          >
            Sign Up
          </button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {mode === 'login' && !showForgot && (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={loginData.email}
                onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={loginData.password}
                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </button>
              <button type="button" className="btn btn-link p-0" onClick={handleForgotPassword} disabled={loading}>
                Forgot Password?
              </button>
            </div>
          </form>
        )}
        {mode === 'signup' && (
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={signupData.email}
                onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={signupData.password}
                onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            {/* Mobile field is present for UI but not sent to backend */}
            <div className="mb-3">
              <label>Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                value={signupData.mobile}
                onChange={e => setSignupData({ ...signupData, mobile: e.target.value })}
                disabled={loading}
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