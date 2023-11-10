import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import users from '../../data/User';
import './EmployeeDetails.css'



const EmployeeDetails = () => {
    const navigate=useNavigate();
    const { id } = useParams();
    const user = users.find((user) => user.id === parseInt(id));

    if (!user) {
        return <div>User not found</div>;
    }
    const iconStyle = {
        width: '24px',
        height: '24px',
    };
    const navigateToEmployeeList=()=>{
        navigate('/employee-list')
        }
    return (
        <div className='list'>
        <div className='logo-container'>
            <div className="detailsContainerStyle">
            <button className='back-button' onClick={navigateToEmployeeList}>Back</button>&nbsp;&nbsp;&nbsp;
                <h1>Employee Details</h1>
                <table >
                    <tbody>
                        <tr>
                            <th><img src={require("../../images/id-icon.png")} alt="ID Icon" style={iconStyle} /></th>
                            <td>{user.id}</td>
                        </tr>
                        <tr>
                            <th><img src={require("../../images/name-icon.png")} alt="Name Icon" style={iconStyle} /></th>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <th><img src={require("../../images/designation-icon.png")} alt="Designation Icon" style={iconStyle} /></th>
                            <td>{user.designation}</td>
                        </tr>
                        <tr>
                            <th><img src={require("../../images/project.jpg")} alt="Project Icon" style={iconStyle} /></th>
                            <td>{user.project}</td>
                        </tr>
                        <tr>
                            <th><img src={require("../../images/contact-icon.png")} alt="Contact Icon" style={iconStyle} /></th>
                            <td>{user.contactNumber}</td>
                        </tr>
                        <tr>
                            <th><img src={require("../../images/email-icon.png")} alt="Email Icon" style={iconStyle} /></th>
                            <td>{user.email}</td>
                        </tr>
                    </tbody>
                </table>
            </div></div>
            </div>

    );
};

export default EmployeeDetails;
