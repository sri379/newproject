import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../data/User';
import './TimeTracking.css';

const TimeTracking = ({ timeRecords, setTimeRecords, logout }) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const storedTimeRecords = JSON.parse(localStorage.getItem('timeRecords'));
    if (storedTimeRecords) {
      setTimeRecords(storedTimeRecords);
    }
  }, []);

  const saveTimeRecordsToLocalStorage = (records) => {
    localStorage.setItem('timeRecords', JSON.stringify(records));
  };

  const formatTimeDiff = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${hrs}:${mins}:${sec}`;
  };

  const handleTimeIn = () => {
    if (currentUser && currentUser.isLogin) {
      const currentDate = new Date().toLocaleDateString();
      const currentUserData = users.find((user) => user.id === currentUser.id);

      if (!timeRecords.find((record) => record.date === currentDate && record.userId === currentUser.id)) {
        const currentTimeIn = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newTimeRecord = {
          userId: currentUser.id,
          userName: currentUserData.name,
          date: currentDate,
          timeIn: currentTimeIn,
          timeOut: null,
          timeDiff: 0,
          project: currentUserData.project, // Store project information
        };

        const updatedTimeRecords = [...timeRecords, newTimeRecord];

        setTimeRecords(updatedTimeRecords);
        saveTimeRecordsToLocalStorage(updatedTimeRecords);
      } else {
        alert("Time In already recorded for today.");
      }
    }
  };

  const handleTimeOut = () => {
    if (currentUser && currentUser.isLogin) {
      if (timeRecords.length > 0) {
        const lastTimeRecord = timeRecords.find((record) => record.userId === currentUser.id && record.timeOut === null);
        if (lastTimeRecord) {
          lastTimeRecord.timeOut = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          const timeIn = lastTimeRecord.timeIn;
          const timeOut = lastTimeRecord.timeOut;

          const timeInDate = new Date("01/01/2023 " + timeIn);
          const timeOutDate = new Date("01/01/2023 " + timeOut);

          const timeDiff = (timeOutDate - timeInDate) / 1000;
          lastTimeRecord.timeDiff = formatTimeDiff(timeDiff);

          const currentUserData = users.find((user) => user.id === currentUser.id);
          if (currentUserData) {
            currentUserData.timeOut = lastTimeRecord.timeOut;
          }

          const updatedTimeRecords = [...timeRecords];
          setTimeRecords(updatedTimeRecords);
          saveTimeRecordsToLocalStorage(updatedTimeRecords);
        } else {
          alert("Time Out already recorded for today.");
        }
      } else {
        alert("Time Out already recorded for today.");
      }
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
    logout();
    navigate('/');
  };

  const navigateToEmployeeList = () => {
    navigate('/employee-list');
  };

  return (
    <div>
      <button onClick={handleTimeIn} className="time-tracking-button">Time In</button>
      <button onClick={handleTimeOut} className="time-tracking-button">Time Out</button>
      <button onClick={navigateToEmployeeList} className="back-button">Back</button>
      <button onClick={handleLogout} className="logout-button">Logout</button>

      <div>
        <h2 className='tracking'>Time Records</h2>
        <ul>
          {timeRecords
            .filter((record) => record.userId === currentUser.id)
            .map((record, index) => (
              <li key={index}>
                User: {record.userName}, Date: {record.date}, Time In: {record.timeIn}, Time Out: {record.timeOut ? record.timeOut : "Not recorded"},
                Time Diff: {record.timeDiff !== 'N/A' ? record.timeDiff : 'N/A'}, Project: {record.project}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TimeTracking;
