// EmployeeList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import './EmployeeList.css';
import users from '../../data/User';



const itemsPerPage = 4;

const EmployeeList = ({ logout, isAuth }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
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
const handleDeleteUser = (userId) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      // Update the local state
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);

      // Update the local storage
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      toast.success(`User with ID ${userId} deleted successfully!`);

      // Refresh the component to reflect the changes
      setCurrentPage(1);
    }
  };
const handleLogout = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      console.log('Logging out user:', currentUser);

      const currentUserIndex = users.findIndex((user) => user.id === currentUser.id);

      if (currentUserIndex !== -1) {
        users[currentUserIndex].isLogin = false;
        console.log('Updated user in the users array:', users[currentUserIndex]);
      }

      localStorage.setItem('currentUser', JSON.stringify({ "isLogin": false }));
      console.log('User data in local storage after update:', JSON.parse(localStorage.getItem('currentUser')));

      localStorage.setItem('users', JSON.stringify(users));
      console.log('Users data in local storage after update:', JSON.parse(localStorage.getItem('users')));
    }
    toast.info("Logged out successfully!");
    logout();
    navigate('/');
  };
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const iconWrapperStyle = {
    margin: '8px 8px 0 8px', // Added vertical margin
  };
  const iconStyle3 = {
    width: '32px',
      height: '32px',
      
};
const iconStyle4 = {
    width: '36px',
      height: '36px',
      
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
     
      <h2>Time Forge Portal</h2>
      {isAuth && (isAuth.name === 'Admin' || isAuth.designation === 'Administrator') && (
          <button  onClick={navigateToAdmin}>
            <img src={require("../../Back-button.png")} alt="Back Icon" style={iconStyle5} />
          </button>
        )}
      
        <div className="navigation-arrows">
        <div className="arrow" onClick={handlePreviousPage}>
        <img src={require("../../icon10-last-52.png")} alt="Back Icon" style={iconStyle5} />
         </div>
          <div className="arrow" onClick={handleNextPage}>
          <img src={require("../../icon9-last-51.png")} alt="Back Icon" style={iconStyle5} />
          </div>
        </div>
        <button className='log' onClick={handleLogout}>
        <img src={require("../../logout icon.png")} alt="ID Icon" style={iconStyle1} />
        </button>
        </header>
      

      <div className="employee-cards">
        {currentUsers.map((user) => (
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
