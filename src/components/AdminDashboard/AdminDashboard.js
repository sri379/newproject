// AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { Link } from 'react-router-dom'; // Change this import
const iconStyle1 = {
  width: '30px',
  height: '30px',
};
const iconStylelogo = {
  width: '140px',
  height: '62px',
};
const AdminDashboard = ({ isAuth, handleLogout }) => {
  const navigate = useNavigate();


 

  return (
    <div className='body-full' >
      <header>
        <img src={require("../../time forge logo.jpeg")} alt="ID Icon" style={iconStylelogo} />
        <h1 className='h1-pro'>Welcome Back to Admin Dashboard</h1>
        <div className="list1">
          {isAuth && (isAuth.name === 'Admin' || isAuth.designation === 'Administrator') && (
            <>
              <Link className='list1 a' to="/add-user-form">Add User</Link> &nbsp;&nbsp;
            </>
          )}
          {isAuth && (isAuth.name === 'Admin' || isAuth.designation === 'Administrator') && (
            <>
              <Link to="/time-history">Time History</Link> &nbsp;&nbsp;
              <Link to="/employee-list">Employee List</Link>
            </>
          )}
        </div>
        <button className='log' onClick={handleLogout} >  <img src={require("../../logout icon.png")} alt="ID Icon" style={iconStyle1} /></button>
      </header>
    </div>
  );
};

export default AdminDashboard;
