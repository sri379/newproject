// AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../data/User';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import './AdminDashboard.css';
const iconStyle1={
    width: '30px',
    height: '30px',
  }
const AdminDashboard = ({ isAuth,logout }) => {
  const navigate = useNavigate();

  const navigateToTimeHistory = () => {
    navigate('/time-history');
  };
  const navigateToAddUserForm = () => {
    navigate('/add-user-form');
  };
  const navigateToEmployeeList = () => {
    navigate('/employee-list');
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

  return (
    <div className='body-full' >
        <header>
        <h1 className='h1-pro'>Welcome Back to Admin Dashboard</h1>
        <div className="list1">   
    {isAuth && (isAuth.name === 'Admin' || isAuth.designation === 'Administrator') && (
    <>
    <button  className='button-his1'onClick={navigateToAddUserForm}>Add User</button> &nbsp;&nbsp;
   
  </>
         )}
      {isAuth && (isAuth.name === 'Admin' || isAuth.designation === 'Administrator') && (
       <> <button className='button-his1' onClick={navigateToTimeHistory}>Time History</button> &nbsp;&nbsp;
        <button  className='button-his1'onClick={navigateToEmployeeList}>EmployeeList</button>
        </>
      )}
      
    
    </div>
        <button className='log'onClick={handleLogout} >  <img src={require("../../logout icon.png")} alt="ID Icon" style={iconStyle1} /></button>
        </header>
       
   
    </div>
  );
};

export default AdminDashboard;
