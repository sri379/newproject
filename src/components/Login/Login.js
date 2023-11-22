import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../data/User';
import './Login.css';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { Button, Form, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';

const Login = ({  setIsAuth }) => {
  // React Router hook to navigate between pages
  const navigate = useNavigate();

  // State variables for the login form
  const [rememberMe, setRememberMe] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // Effect hook to set the "Remember Me" checkbox based on local storage
  useEffect(() => {
    const rememberMePreference = localStorage.getItem('rememberMe');
    setRememberMe(rememberMePreference === 'true');
  }, []);

  // Function to handle the login button click
  const handleLogin = () => {
    const user = users.find((user) => user.name === name && user.password === password);
    if (user) {
      // Update user login status and store user information in local storage
      user.isLogin = true;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(user));
      setIsAuth(user);

      // Redirect to the appropriate page based on user role
      if (user.name === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/employee-list');
      }
    } else {
      // Display error message for invalid login credentials
      toast.error('Invalid Login Credentials');
    }
  };

 
  return (
    <div className="login-body">
      {/* Toast container for displaying notifications */}
      <ToastContainer position="bottom-right" transition={Zoom} autoClose={4000} closeOnClick={false} />
      <div className="login-container">
        <div className="login-left"></div>
        <div className="login-right">
          {/* Application heading */}
          <h2 className="log-heading">Time Forge Portal!</h2>
          <h1 className="login-heading">Login</h1>
          {/* Input field for the username */}
          <div className="input-group">
            <label className="login-label">
            
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Name:
            </label>
            <input
              className="login-text"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Input field for the password */}
          <div className="input-group password-input">
            <label className="login-label">
              {/* Adjusted spacing for better alignment */}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Password:
            </label>
            <input
              className="login-password"
              type="password" // Always show dots for the password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* "Remember Me" checkbox */}
          <div className="remember-me-checkbox">
            <Form.Check
              type="checkbox"
              id="form.ControlInput3"
              label="Remember me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
          </div>
          {/* Login button */}
          <button className="button-login" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
