// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../data/User';
import './Login.css'; 
import { ToastContainer, Zoom, toast } from 'react-toastify';

const Login = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const user = users.find((user) => user.name === name && user.password === password);
    if (user) {
      user.isLogin = true;

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(user));
      setIsAuth(user);

      if (user.name === 'Admin') {
        // If the user is an admin, navigate to the admin dashboard or any desired route
        navigate('/admin-dashboard');
      } else {
        navigate('/employee-list');
      }
    } else {
      toast.error('Invalid Login Credentials');
    }
  };

  return (
    <div className="login-body">
      <ToastContainer position='bottom-right' transition={Zoom} autoClose={4000} closeOnClick={false} />
      <div className="login-container">
        <h2 className="log-heading">Welcome to TimeForge Portal!</h2>
        <h1 className="login-heading">Login</h1>
        <label className="login-label">
          Name:
          <input
            className="login-text"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label className="login-label">
          Password:
          <div className="password-input">
            <input
              className="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            Show Password
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          </div>
        </label>
        <br />
        <button className="button-login" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
