// AddUserForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../data/User';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import './AddUserForm.css';

const AddUserForm = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: '',
    password: '',
    designation: '',
    contactNumber: '',
    email: '',
    isLogin: false,
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const backToAdmin = () => {
    navigate('/admin-dashboard');
  };

  const handleCancel = () => {
    // Clear the form fields
    setNewUser({
      name: '',
      password: '',
      designation: '',
      contactNumber: '',
      email: '',
      isLogin: false,
    });
  };

  const handleAddUser = () => {
    // Validate if all fields are filled
    if (
      !newUser.name ||
      !newUser.password ||
      !newUser.designation ||
      !newUser.contactNumber ||
      !newUser.email
    ) {
      toast.error('Please fill in all fields.');
      return;
    }

    // Add the new user to the users array
    const newUserId = users.length + 1;
    const newUserWithId = { id: newUserId, ...newUser };
    users.push(newUserWithId);

    // Update the local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Clear the form fields
    setNewUser({
      name: '',
      password: '',
      designation: '',
      contactNumber: '',
      email: '',
      project:'',
      isLogin: false,
    });

    toast.success('User added successfully!');

    navigate('/add-user-form');
  };

  return (
    <div className='now-body'>
    <div className='user-form-container'>
         <ToastContainer position='bottom-right' transition={Zoom} autoClose={4000} closeOnClick={false} />
      <h1 className='h1-form'>Add New User</h1>

      <form className='now-form'>
        {/* Add your form fields here */}
        <label className='now-label'>Name:</label>
        <input type='text' name='name' value={newUser.name} onChange={handleChange} required />

        <label className='now-label'>Password:</label>
        <input type='text' name='password' value={newUser.password} onChange={handleChange} required />

        <label className='now-label'>Designation:</label>
        <input type='text' name='designation' value={newUser.designation} onChange={handleChange} required />

        <label className='now-label'>Contact Number:</label>
        <input type='text' name='contactNumber' value={newUser.contactNumber} onChange={handleChange} required />

        <label className='now-label'>Email:</label>
        <input type='text' name='email' value={newUser.email} onChange={handleChange} required />
        <label className='now-label'>Project:</label>
        <input type='text' name='project' value={newUser.project} onChange={handleChange} required />

       <span> <button type='button' className='now-button' onClick={handleAddUser}>
          Submit
        </button>
        <button type='button' className='now-button' onClick={handleCancel}>
          Cancel
        </button></span>
        <button type='button' className='back-button' onClick={backToAdmin}>
          Back
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddUserForm;
