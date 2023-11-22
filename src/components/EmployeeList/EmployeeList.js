// EmployeeList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './EmployeeList.css';


const EmployeeList = ({ handleLogout, isAuth }) => {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setIsLoggedIn(currentUser.isLogin);
  }, [isAuth]);

  const iconStyle = {
    width: '32px',
    height: '32px',
  };

  const iconStyle1 = {
    width: '30px',
    height: '30px',
  };

  const iconStylelogo = {
    width: '140px',
    height: '62px',
  };

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);

      localStorage.setItem('users', JSON.stringify(updatedUsers));

      toast.success(`User with ID ${userId} deleted successfully!`);
    }
  };



  const iconStyle5 = {
    width: '26px',
    height: '26px',
  };

  const navigateToAdmin = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div className="employee-container">
      <header>
        <img src={require("../../time forge logo.jpeg")} alt="ID Icon" style={iconStylelogo} />
        <h2>Time Forge Portal</h2>
        {isAuth && (isAuth.name === 'Admin' || isAuth.designation === 'Administrator') && (
          <button className='back-buttonn-his' onClick={navigateToAdmin}>
            <img src={require("../../Back-button.png")} alt="Back Icon" style={iconStyle5} />
          </button>
        )}
        <button className='log' onClick={handleLogout}>
          <img src={require("../../logout icon.png")} alt="ID Icon" style={iconStyle1} />
        </button>
      </header>

      <div className="employee-cards grid-adder">
        {users.map((user) => (
          !(isAuth && user.id === 101) && (
            <div key={user.id} className="card">
              <img src={require("../../images/id-icon.png")} alt="ID Icon" style={iconStyle} />
              <h3>{user.name}</h3>

              <img src={require("../../images/designation-icon.png")} alt="ID Icon" style={iconStyle} />
              <p>Designation: {user.designation}</p>

              <img src={require("../../images/contact-icon.png")} alt="ID Icon" style={iconStyle} />
              <p>Contact Number: {user.contact}</p>

              <img src={require("../../images/project.jpg")} alt="ID Icon" style={iconStyle} />
              <p>Project: {user.project}</p>

              <img src={require("../../images/email-icon.png")} alt="ID Icon" style={iconStyle} />
              <p>Email: {user.email}</p>

              <td>
                {(currentUser.name === user.name) && isLoggedin ? (
                  <Link to={`/time-tracking/${user.id}`}>Time Tracking</Link>
                ) : (
                  '(Not allowed to view)'
                )}
              </td>

              {isAuth && (isAuth.name === 'Admin' || isAuth.designation === 'Administrator') && (
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  disabled={currentUser.id === user.id}
                >
                  <img src={require("../../deleee.png")} alt="ID Icon" style={iconStyle} />
                </button>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
