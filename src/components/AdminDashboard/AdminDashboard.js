// AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../data/User';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import './AdminDashboard.css';

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
    <div >
        <header>
        <h1 className='h1-pro'>Welcome Back to Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
        </header>
       
    <div className="list1">   
    {isAuth && (isAuth.name === 'Admin' || isAuth.designation === 'Administrator') && (
    <>
    <button  className='button-his'onClick={navigateToAddUserForm}>Add User</button> &nbsp;&nbsp;
   
  </>
         )}
      {isAuth && (isAuth.name === 'Admin' || isAuth.designation === 'Administrator') && (
       <> <button className='button-his' onClick={navigateToTimeHistory}>Time History</button> &nbsp;&nbsp;
        <button  className='button-his'onClick={navigateToEmployeeList}>EmployeeList</button>
        </>
      )}
      
    
    </div>
    </div>
  );
};

export default AdminDashboard;
