import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../data/User';
import './Login.css'; // Import your CSS file

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

      navigate('/employee-list');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <h2 className="log-heading">'Welcome to TimeForge Portal!'</h2>
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
