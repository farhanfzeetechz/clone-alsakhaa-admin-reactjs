import React, { useState } from 'react';
import './login.css'
import colors from '../../../helper/Colors';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formValidation = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValidation()) return
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
          <div className="logo-container">
            <img src="http://localhost:5172/logo.png" alt="Logo" className="logo" />
          </div>

          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group" style={{ position: 'relative' }}>
              <input
                className={`custom-input ${errors.email ? 'error-input' : ''}`}
                style={{
                  width: '100%',
                  minWidth: "53vh",
                  padding: "18px 18px",
                  borderRadius: "8px",
                  border: "none",
                  outline: "none",
                  height: "5vh",
                }}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
      
              />
              <div className="input-focus-line"></div>
              {errors.email && <span className="input-error">{errors.email}</span>}
            </div>

            <div className="form-group" style={{ position: 'relative' }}>
              <input
                className={`custom-input ${errors.password ? 'error-input' : ''}`}
                style={{
                  width: '100%',
                  minWidth: "53vh",
                  padding: "18px 18px",
                  borderRadius: "8px",
                  border: "none",
                  outline: "none",
                  height: "5vh",
                }}
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              
                minLength="6"
              />
              <div className="input-focus-line"></div>
              {errors.password && <span className="input-error">{errors.password}</span>}
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>

          <div className="copyright">
            <p className="text-center mt-3 text-white small copyright">
              © {new Date().getFullYear()} AL-Sakhaa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;