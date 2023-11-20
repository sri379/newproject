import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../data/User';
import './Login.css';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { Button, Form, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';

const Login = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const rememberMePreference = localStorage.getItem('rememberMe');
    setRememberMe(rememberMePreference === 'true');
  }, []);

  const handleLogin = () => {
    const user = users.find((user) => user.name === name && user.password === password);
    if (user) {
      user.isLogin = true;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(user));
      setIsAuth(user);

      if (user.name === 'Admin') {
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
      <ToastContainer position="bottom-right" transition={Zoom} autoClose={4000} closeOnClick={false} />
      <div className="login-container">
        <div className="login-left"></div>
        <div className="login-right">
          <h2 className="log-heading">Time Forge Portal!</h2>
          <h1 className="login-heading">Login</h1>
          <div className="input-group">
            <label className="login-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name:</label>
            <input
              className="login-text"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group password-input">
            <label className="login-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password:</label>
            <input
              className="login-password"
              type="password" // Always show dots for the password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="remember-me-checkbox">
            <Form.Check
              type="checkbox"
              id="form.ControlInput3"
              label="Remember me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
          </div>
          <button className="button-login" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
