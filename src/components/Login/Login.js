import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../data/User';
import './Login.css'; // Import your CSS file

const Login = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

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
    <img src={require("../../thiran tech.png")}  alt="Thiran Tech Logo" class="thiran-tech-logo" />
      <h1 className="login-heading">Login</h1>
      <label className="login-label">
        Name:
        <input className='login-text'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label className="login-label">
        Password:
        <input className='login-password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
