// TimeHistory.js
import React, { useState } from 'react';
import users from '../../data/User';
import { useNavigate } from 'react-router-dom';
import './TimeHistory.css';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TimeHistory = ({ timeRecords }) => {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [generatedTimeHistory, setGeneratedTimeHistory] = useState([]);
  const [isEmployeeAndDateSelected, setIsEmployeeAndDateSelected] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(1); // Initialize selectedMonth with 1 (January)

  const handleGenerateTimeHistory = () => {
    if (!selectedEmployee || !selectedDate) {
      toast.error("Please select an employee and a date.");
      return;
    }
  
    const filteredRecords = timeRecords.filter((record) => {
      const selectedDateToMatch = new Date(selectedDate).toLocaleDateString(); // Format selectedDate
  
      return (
        record.userName === selectedEmployee &&
        record.date === selectedDateToMatch
      );
    });
  
    setGeneratedTimeHistory(filteredRecords);
    setIsEmployeeAndDateSelected(true);

    setSelectedEmployee('');
    setSelectedDate('');
    setSelectedMonth(1);
  };
  

  const handleShowAllEmployeeTimeHistory = () => {
    const allEmployeeRecords = timeRecords;
    setGeneratedTimeHistory(allEmployeeRecords);
    setIsEmployeeAndDateSelected(true);

    setSelectedEmployee('');
    setSelectedDate('');
    setSelectedMonth(1);
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
    setSelectedEmployee('');
    setSelectedDate('');
    setSelectedMonth(1);
  };

  const monthOptions = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const navigateToEmployeeList = () => {
    navigate('/employee-list');
  };

  return (
    <div className='list2'>
                          <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
      <h1>Time History</h1>
      <button className='back-button' onClick={navigateToEmployeeList}>
        Back
      </button>
      &nbsp;&nbsp;&nbsp;
      <div>
        <label>Select Employee:</label>
        <select
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
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Select Month:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {monthOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleGenerateTimeHistory}>Generate Time History</button>&nbsp;&nbsp;&nbsp;
      <button onClick={handleShowAllEmployeeTimeHistory}>All Employee Time History</button>&nbsp;&nbsp;&nbsp;
      <button onClick={handleGenerateMonthWiseReport}>Month-Wise Report</button>

      {isEmployeeAndDateSelected && (
        <>
          {generatedTimeHistory.length > 0 ? (
            <div>
              <h2>Generated Time History</h2>
              <table className="employee-table">
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
                      <td>{record.project}</td> {/* Display project information */}
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
