import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error state

    try {
      const res = await axios.post('http://localhost:3000/auth/login', { userName, password });
      if (res.status === 200) {
        alert('Login successful');
        // Optionally redirect the user or perform other actions here
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Instagram</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="signup-prompt">
          Don't have an account? <a href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
