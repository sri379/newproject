import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import EmployeeList from './components/EmployeeList/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails/EmployeeDetails';
import TimeTracking from './components/TimeTracking/TimeTracking';
import TimeHistory from './components/TimeHistory/TimeHistory';
import AdminDashboard from './components/AdminDashboard/AdminDashboard'; // Import the AdminDashboard component
import PageNotFound from './components/PageNotFound/PageNotFound';
import './components/Login/Login.css';
import AddUserForm from './components/AddUserForm/AddUserForm';
import { useNavigate } from 'react-router-dom';
import users from './data/User';
import { ToastContainer, Zoom, toast } from 'react-toastify';

function App() {
  const navigate = useNavigate();
  const [timeRecords, setTimeRecords] = useState([]);
  const [isAuth, setIsAuth] = useState('');

  useEffect(() => {
    getIsAuth();
  }, []);

  const getAuth = () => {
    localStorage.setItem('currentUser', JSON.stringify({ "isLogin": false }));
    setIsAuth({ "isLogin": false });
  };

  const getIsAuth = () => {
    let authData = localStorage.getItem('currentUser');
    if (authData && authData !== "undefined") {
      authData = JSON.parse(authData);
      setIsAuth(authData);
    } else {
      getAuth();
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
    getAuth();
    navigate('/');
  };

  return (
    <div>
      <Routes>
        {!isAuth.isLogin ? (
          <Route path="/" element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />} />
        ) : (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard isAuth={isAuth}  handleLogout={handleLogout} />} />
            <Route path="/employee-list" element={<EmployeeList isAuth={isAuth}  handleLogout={handleLogout}/>} />
            <Route path="/employee-details/:id" element={<EmployeeDetails />} />
            <Route
              path="/time-tracking/:id"
              element={<TimeTracking timeRecords={timeRecords} setTimeRecords={setTimeRecords}  handleLogout={handleLogout}/>}
            />
            <Route path="/add-user-form" element={<AddUserForm />} />
            <Route path="/time-history" element={<TimeHistory timeRecords={timeRecords} />} />
          </>
        )}
        <Route exact path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
