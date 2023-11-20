// TimeHistory.js
import React, { useState } from 'react';
import users from '../../data/User';
import { useNavigate } from 'react-router-dom';
import './TimeHistory.css';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TimeHistory = ({ timeRecords, isAuth }) => {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [generatedTimeHistory, setGeneratedTimeHistory] = useState([]);
  const [isEmployeeAndDateSelected, setIsEmployeeAndDateSelected] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(1);

  const handleGenerateTimeHistory = () => {
    console.log('Selected Employee:', selectedEmployee);
    console.log('Selected Date:', selectedDate);
    if (!selectedEmployee || !selectedDate) {
      toast.error("Please select an employee and a date.");
      return;
    }

    const filteredRecords = timeRecords.filter((record) => {
      const selectedDateToMatch = new Date(selectedDate).toLocaleDateString();
      return (
        record.userName === selectedEmployee &&
        record.date === selectedDateToMatch
      );
    });

    setGeneratedTimeHistory(filteredRecords);
    setIsEmployeeAndDateSelected(true);
  };

  const handleShowAllEmployeeTimeHistory = () => {
    setGeneratedTimeHistory(timeRecords);
    setIsEmployeeAndDateSelected(true);
  };

  const handleGenerateMonthWiseReport = () => {
    if (!selectedEmployee || !selectedMonth) {
      toast.error("Please select an employee and a month.");
      return;
    }

    const monthWiseRecords = timeRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        record.userName === selectedEmployee &&
        recordDate.getMonth() === selectedMonth - 1 &&
        recordDate.getFullYear() === new Date().getFullYear()
      );
    });

    if (monthWiseRecords.length === 0) {
      toast.error("No records found for the selected employee and month.");
    } else {
      setGeneratedTimeHistory(monthWiseRecords);
      setIsEmployeeAndDateSelected(true);
    }
  };

  const navigateToAdmin = () => {
    navigate('/admin-dashboard');
  };
  const iconStyle = {
    width: '32px',
    height: '32px',
};
  return (
    <div className="container">
      <header>
        <h1>Time Forge Portal</h1>
        <button onClick={navigateToAdmin} className="back-button"> <img src={require("../../Back-button.png")} alt="ID Icon" style={iconStyle} /></button>
        <ToastContainer position='bottom-right' transition={Zoom} autoClose={4000} closeOnClick={false}/>
       
        {(isAuth && (isAuth.name === 'Admin' || isAuth.designation === 'Administrator')) && (
          <button onClick={navigateToAdmin}>Employee List</button>
        )}
         
      </header>
      <div>
        <label className='select-his'>Select Employee:</label>
        <select className='select-his'
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          required
        >
          <option value="">Select an Employee</option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className='select-his'>Select Date:</label>
        <input className='select-his'
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label className='select-his'>Select Month:</label>
        <select className='select-his'
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          <option value="">Select a Month</option>
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </div>
      <button className='button-his' onClick={handleGenerateTimeHistory}>Generate Time History</button>
      <button className='button-his' onClick={handleShowAllEmployeeTimeHistory}>All Employee Time History</button>
      <button className='button-his' onClick={handleGenerateMonthWiseReport}>Month-Wise Report</button>
      {isEmployeeAndDateSelected && (
        <>
          {generatedTimeHistory.length > 0 ? (
            <div>
              <h2>Generated Time History</h2>
              <table >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Project Information</th>
                    <th>Date</th>
                    <th>Time In</th>
                    <th>Time Out</th>
                    <th>Total Hours Worked</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedTimeHistory.map((record, index) => (
                    <tr key={index}>
                      <td>{record.userId}</td>
                      <td>{record.userName}</td>
                      <td>{record.project}</td>
                      <td>{record.date}</td>
                      <td>{record.timeIn}</td>
                      <td>{record.timeOut || 'N/A'}</td>
                      <td>{record.timeDiff || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No records</p>
          )}
        </>
      )}
    </div>
  );
};

export default TimeHistory;
