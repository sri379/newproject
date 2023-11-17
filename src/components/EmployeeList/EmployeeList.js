// EmployeeList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import './EmployeeList.css';
import users from '../../data/User';
import '../Pagination/Pagination.css';
import { ToastContainer, Zoom, toast } from 'react-toastify';

const itemsPerPage = 10;

const EmployeeList = ({ logout, isAuth }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    // Log the user data in local storage on mount
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setIsLoggedIn(currentUser.isLogin);
    console.log('User data in local storage on mount:', currentUser);
    console.log('isAuth on mount:', isAuth);
  }, [isAuth]);

  useEffect(() => {
    // Log additional information for debugging
    console.log('isAuth:', isAuth);
    console.log('isLoggedin:', isLoggedin);
    console.log('currentUsers:', currentUsers);
  }, [isAuth, isLoggedin, currentUsers]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigateToAdmin = () => {
    navigate('/admin-dashboard');
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
 

  const handleDeleteUser = (userId) => {
    // Implement the logic to delete a user based on the user ID
    // Make sure to perform necessary validations and handle cases where deletion is not allowed.
  
    // For example, let's say you want to delete the user with the specified ID
    const deletedUserIndex = users.findIndex((user) => user.id === userId);
  
    if (deletedUserIndex !== -1) {
      users.splice(deletedUserIndex, 1);
      toast.success(`User with ID ${userId} deleted successfully!`);
  
      // Update the local storage
      localStorage.setItem('users', JSON.stringify(users));
  
      // Refresh the component to reflect the changes
      setCurrentPage(1);
    } else {
      toast.warning('User not found.');
    }
  };
  

  return (
    <div className="employee-table-container">
      <h2>Employee List</h2>
      <button className='logout-button1' onClick={handleLogout}>
        Logout
      </button>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Employee Details</th>
            <th>Time Tracking</th>
            {isAuth && (isAuth.name === 'Admin' || isAuth.designation === 'Administrator') && (
              <th>Action</th>
            )}
          </tr>
        </thead>
        <tbody>
  {currentUsers.map((user) => {
    // Log user information for debugging
    console.log('User ID:', user.id);
    console.log('Condition:', !(isAuth && user.id === 101));

    return (
      // Skip rendering the admin user with ID 101
      !(isAuth && user.id === 101) && (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>
            <Link to={`/employee-details/${user.id}`}>View Details</Link>
          </td>
          <td>
            {(currentUser.name === user.name) && isLoggedin ? (
              <Link to={`/time-tracking/${user.id}`}>Time Tracking</Link>
            ) : (
              'Not allowed to view'
            )}
          </td>
          {isAuth && (isAuth.name === 'Admin' || isAuth.designation === 'Administrator') && (
            <td>
              <button
                onClick={() => handleDeleteUser(user.id)}
                disabled={currentUser.id === user.id}
              >
                Delete
              </button>
            </td>
          )}
        </tr>
      )
    );
  })}
</tbody>




      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(users.length / itemsPerPage)}
        OnButtonHandler={onPageChange}
      />
     
    </div>
  );
};

export default EmployeeList;
