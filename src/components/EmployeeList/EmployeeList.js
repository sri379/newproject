import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import users from '../../data/User';
import Pagination from '../Pagination/Pagination';
import './EmployeeList.css';
import '../Pagination/Pagination.css';


const itemsPerPage = 10;

const EmployeeList = ({logout}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

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
    
          localStorage.setItem('currentUser', JSON.stringify({ "isLogin": false })); // Set the currentUser to false when logging out
          console.log('User data in local storage after update:', JSON.parse(localStorage.getItem('currentUser')));
    
          localStorage.setItem('users', JSON.stringify(users));
          console.log('Users data in local storage after update:', JSON.parse(localStorage.getItem('users')));
        }
        logout();
        navigate('/');
      };

    return (
        <div className="employee-table-container">
            <h2>Employee List</h2>
            <button
                className="time-history-button"
                onClick={navigateToTimeHistory}
            >
                Time History
            </button>&nbsp;&nbsp;
            <button className='logout-button1'onClick={handleLogout}>
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
                                {user.isLogin ? (
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
