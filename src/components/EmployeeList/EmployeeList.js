import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import './EmployeeList.css';
import users from '../../data/User';
import '../Pagination/Pagination.css';
import { ToastContainer, Zoom, toast } from 'react-toastify';

const itemsPerPage = 10;

const EmployeeList = ({ logout, isAuth }) => {
    const[isLoggedin,setIsLoggedIn]=useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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
  }, [isAuth]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigateToTimeHistory = () => {
    navigate('/time-history');
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
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <Link to={`/employee-details/${user.id}`}>View Details</Link>
              </td>
              <td>
                {(currentUser.name===user.name)&&isLoggedin ? (
                  <Link to={`/time-tracking/${user.id}`}>Time Tracking</Link>
                ) : (
                  'Not allowed to view'
                )}
              </td>
            </tr>
          ))}
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
