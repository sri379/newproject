import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import EmployeeList from './components/EmployeeList/EmployeeList'; // Updated import path
import EmployeeDetails from './components/EmployeeDetails/EmployeeDetails'; // Updated import path
import TimeTracking from './components/TimeTracking/TimeTracking'; // Updated import path
import TimeHistory from './components/TimeHistory/TimeHistory'; // Updated import path
import PageNotFound from './components/PageNotFound/PageNotFound';
import './components/Login/Login.css'

function App() {
  const [timeRecords, setTimeRecords] = useState([]); // Initialize timeRecords state
  const[isAuth,setIsAuth]=useState('');
  useEffect(() => {
    getIsAuth()
  
   
  }, [])
  const getAuth=()=>{
    localStorage.setItem('currentUser',JSON.stringify({"isLogin":false}))
    setIsAuth({"isLogin":false})

  }
   const getIsAuth=()=>{
   let authData=(localStorage.getItem('currentUser'))
  if( (authData&&(authData!=="undefined"))){
    authData=JSON.parse(authData);
    setIsAuth(authData);
  }
  else{
    getAuth()
  }
   }

  return (
    <div>
      <Routes >
        {(!isAuth.isLogin)?(  <Route path="/" element={<Login  isAuth={isAuth} setIsAuth={setIsAuth}/>} />):(
          <>
          <Route path="/employee-list" element={<EmployeeList logout={getAuth}/>} />
          <Route path="/employee-details/:id" element={<EmployeeDetails />} />
          <Route
            path="/time-tracking/:id"
            element={<TimeTracking timeRecords={timeRecords} setTimeRecords={setTimeRecords}  logout={getAuth}/>}
          />
          <Route path="/time-history" element={<TimeHistory timeRecords={timeRecords} />} />
          </>
        )}
        <Route exact path='*' element={<PageNotFound/>}/>
      
        {/* <Route path="/employee-list" element={<EmployeeList />} /> */}
        
      </Routes>
    </div>
  );
}
export default App;







