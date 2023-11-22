// TimeTracking.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../data/User';
import './TimeTracking.css';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Style for the Time Tracking logo
const iconStylelogo = {
  width: '140px',
  height: '62px',
};

// Component for Time Tracking
const TimeTracking = ({ timeRecords, setTimeRecords, handleLogout }) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    // Load stored time records from local storage on component mount
    const storedTimeRecords = JSON.parse(localStorage.getItem('timeRecords'));
    if (storedTimeRecords) {
      setTimeRecords(storedTimeRecords);
    }
  }, []);

  // Function to save time records to local storage
  const saveTimeRecordsToLocalStorage = (records) => {
    localStorage.setItem('timeRecords', JSON.stringify(records));
  };

  // Function to format time difference in HH:mm:ss format
  const formatTimeDiff = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${hrs}:${mins}:${sec}`;
  };

  // Style for icons
  const iconStyle = {
    width: '28px',
    height: '28px',
  };

 // Function to handle Time In
const handleTimeIn = () => {
  // Check if a user is logged in
  if (currentUser && currentUser.isLogin) {
    // Get the current date and user data
    const currentDate = new Date().toLocaleDateString();
    const currentUserData = users.find((user) => user.id === currentUser.id);

    // Check if Time In is not already recorded for the current user and date
    if (!timeRecords.find((record) => record.date === currentDate && record.userId === currentUser.id)) {
      // Get the current time in HH:mm format
      const currentTimeIn = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Create a new time record for Time In
      const newTimeRecord = {
        userId: currentUser.id,
        userName: currentUserData.name,
        date: currentDate,
        timeIn: currentTimeIn,
        timeOut: null,
        timeDiff: 0,
        project: currentUserData.project,
      };

      // Update the time records, save to local storage, and show success toast
      const updatedTimeRecords = [...timeRecords, newTimeRecord];
      setTimeRecords(updatedTimeRecords);
      saveTimeRecordsToLocalStorage(updatedTimeRecords);
      toast.success("Time In recorded successfully!");
    } else {
      // Show error toast if Time In is already recorded for today
      toast.error("Time In already recorded for today.");
    }
  }
};

// Function to handle Time Out
const handleTimeOut = () => {
  // Check if a user is logged in
  if (currentUser && currentUser.isLogin) {
    // Check if there are existing time records
    if (timeRecords.length > 0) {
      // Find the last time record for the current user with no Time Out recorded
      const lastTimeRecord = timeRecords.find((record) => record.userId === currentUser.id && record.timeOut === null);
      if (lastTimeRecord) {
        // Get the current time in HH:mm format for Time Out
        lastTimeRecord.timeOut = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Extract Time In and Time Out, and calculate the time difference in seconds
        const timeIn = lastTimeRecord.timeIn;
        const timeOut = lastTimeRecord.timeOut;
        const timeInDate = new Date("01/01/2023 " + timeIn);
        const timeOutDate = new Date("01/01/2023 " + timeOut);
        const timeDiff = (timeOutDate - timeInDate) / 1000;

        // Update the time difference and user's time out in the time records
        lastTimeRecord.timeDiff = formatTimeDiff(timeDiff);
        const currentUserData = users.find((user) => user.id === currentUser.id);
        if (currentUserData) {
          currentUserData.timeOut = lastTimeRecord.timeOut;
        }

        // Update the time records, save to local storage, and show success toast
        const updatedTimeRecords = [...timeRecords];
        setTimeRecords(updatedTimeRecords);
        saveTimeRecordsToLocalStorage(updatedTimeRecords);
        toast.success("Time Out recorded successfully!");
      } else {
        // Show error toast if Time Out is already recorded for today
        toast.error("Time Out already recorded for today.");
      }
    } else {
      // Show error toast if Time Out is already recorded for today
      toast.error("Time Out already recorded for today.");
    }
  }
};


  // Function to navigate to the Employee List page
  const navigateToEmployeeList = () => {
    navigate('/employee-list');
  };

  return (
    <div className='new'>
      <header>
        <img src={require("../../time forge logo.jpeg")} alt="ID Icon" style={iconStylelogo} />
        <h2 >Time Forge Portal</h2>
        <ToastContainer position='bottom-right' draggable={false} transition={Zoom} autoClose={4000} closeOnClick={false} />
        <button onClick={navigateToEmployeeList} className="back-buttonn-his">
          <img src={require("../../Back-button.png")} alt="ID Icon" style={iconStyle} />
        </button>
        <button onClick={handleLogout}>
          <img src={require("../../logout icon.png")} alt="ID Icon" className='logout' />
        </button>
      </header>

      <div>
        <button onClick={handleTimeIn} className="time-tracking-button">Time In</button>
        <button onClick={handleTimeOut} className="time-tracking-button">Time Out</button>

        <h2 className='tracking'>Time Records</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Time Duration</th>
            </tr>
          </thead>
          <tbody>
            {timeRecords
              .filter((record) => record.userId === currentUser.id)
              .map((record, index) => (
                <tr key={index}>
                
                  <td>{record.date}</td>
                 
                  <td>{record.timeIn}</td>
                  <td>{record.timeOut ? record.timeOut : "Not recorded"}</td>
                  <td>{record.timeDiff !== 'N/A' ? record.timeDiff : 'N/A'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTracking;
