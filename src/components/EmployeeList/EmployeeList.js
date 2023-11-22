// EmployeeList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './EmployeeList.css';

const EmployeeList = ({ handleLogout, isAuth }) => {
  // State variables
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // useEffect to update login status when isAuth changes
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setIsLoggedIn(currentUser.isLogin);
  }, [isAuth]);

  // Styles
  const iconStylelogo = {
    width: '140px',
    height: '62px',
  };

  const iconStyle5 = {
    width: '26px',
    height: '26px',
  };

  // Function to handle user deletion
  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);

      localStorage.setItem('users', JSON.stringify(updatedUsers));

      toast.success(`User with ID ${userId} deleted successfully!`);
    }
  };

  // Function to navigate to the admin dashboard
  const navigateToAdmin = () => {
    navigate('/admin-dashboard');
  };

  // Component rendering
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
        <button  onClick={handleLogout}>
          <img src={require("../../logout icon.png")} alt="ID Icon" className='logout'/>
        </button>
      </header>

      <div className="employee-cards grid-adder">
        {users.map((user) => (
          !(isAuth && user.id === 101) && (
            <div key={user.id} className="card">
              <img src={require("../../images/id-icon.png")} alt="ID Icon" className='icons' />
              <h3>{user.name}</h3>

              <img src={require("../../images/designation-icon.png")} alt="ID Icon"className='icons' />
              <p>Designation: {user.designation}</p>

              <img src={require("../../images/contact-icon.png")} alt="ID Icon" className='icons' />
              <p>Contact Number: {user.contact}</p>

              <img src={require("../../images/project.jpg")} alt="ID Icon"className='icons'/>
              <p>Project: {user.project}</p>

              <img src={require("../../images/email-icon.png")} alt="ID Icon"className='icons' />
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
                  <img src={require("../../deleee.png")} alt="ID Icon" className='icons'/>
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
