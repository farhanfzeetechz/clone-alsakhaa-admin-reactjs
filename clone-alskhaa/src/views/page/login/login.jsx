import React, { useState } from 'react';
import './login.css'
import colors from '../../../helper/Colors';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);
  };

  return (
    <div
      className="auth-wrapper animated-background"
      style={{
        backgroundColor: colors.primary,
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >






      <div className="login-container">
        <div className="glass-form form-entrance">
        {/* <div className="login-card"> */}
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <a href="#forgot" className="forgot-link">Forgot password?</a>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Login;