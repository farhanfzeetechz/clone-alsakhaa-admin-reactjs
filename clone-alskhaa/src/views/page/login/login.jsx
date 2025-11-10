import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import './login.css'
import colors from '../../../helper/Colors';
import Useaxios from '../../../assets/utility/Useaxios';

const toastStyle = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;
  const { fetchData, loading } = Useaxios();
  const navigate = useNavigate();

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



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidation()) return
    console.log('Login attempt with:', formData);

    try {
      const res = await fetchData({
        url: '/api/v1/admin/auth/login',
        method: 'POST',
        data: { email, password },
      })

      if (res.success) {
        const token = res.data.token

        toast.success(res.message, toastStyle)
        localStorage.setItem('token', token)
        Cookies.set('token', token)

        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.msg || 'Login failed', toastStyle)
    } finally {

    }

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
                  padding: "18px 50px 18px 18px",
                  borderRadius: "8px",
                  border: "none",
                  outline: "none",
                  height: "5vh",
                }}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                minLength="6"
                />
              <span 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.primary,
                  width: '40px',
                  height: '40px',
                  position: 'absolute',
                  right: '-13px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: 'white',
                  zIndex: 1
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
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