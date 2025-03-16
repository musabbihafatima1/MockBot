import React, { useState } from 'react';
import './Userpage.css'; 
import Card from '../Components/Card.jsx';
import { FaClipboardList, FaFileAlt, FaTachometerAlt, FaBook } from 'react-icons/fa';
import techpic from '../Pictures/server.png';
import IQ from '../Pictures/development (1).png';
import Emotional from "../Pictures/emotional-intelligence (1).png";
import PDF from '../Pictures/pdf.png';
import ATS from '../Pictures/version.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Userpage = () => {
    // State to track the active section
    const [activeSection, setActiveSection] = useState('dashboard'); // Default is 'dashboard'
    const [userInfo, setUserInfo] = useState({
        username: '',
      });
     
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token'); 

    const handleSectionChange = (section) => {
        setActiveSection(section); // Set the active section based on the clicked menu item
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        sessionStorage.removeItem('token'); 
    };
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/auth/profilename', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,  // Assuming the token is stored somewhere like localStorage or state
              },
            });
    
            const data = await response.json();
            if (response.ok) {
              setUserInfo(data);  // Set the user data from the API response
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        if (token) {
          fetchUserData();
        }
      }, [token]);
    
      if (loading) {
        return <div>Loading...</div>;
      }

    return (
      <>
        <div className="sidebar">
            <div className="app-name"><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>MockBot</Link></div>

            <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/Userprofile'> 
                <div className="profile-section">
                    <div className="profile-icon">{userInfo.username[0]?.toUpperCase()}</div> 
                    <div className="profile-info">
                        <div className="profile-name">{userInfo.username}</div>
                        <div className="profile-plan">Manage Account (Free Plan)</div>
                    </div>
                </div>
            </Link>
        
            <ul className="menu">
                <li className='menu-item' onClick={() => handleSectionChange('dashboard')}>
                    <FaClipboardList style={{ marginRight: "10px" }} />
                    Dashboard
                </li>
                <li className="menu-item" onClick={() => handleSectionChange('interviewPreparation')}>
                    <FaFileAlt style={{ marginRight: "10px" }} />
                    Interview Preparation
                </li>
                <li className="menu-item" onClick={() => handleSectionChange('resumeOptimization')}>
                    <FaTachometerAlt style={{ marginRight: "10px" }} />
                    Resume Optimization
                </li>
                <li className="menu-item" onClick={handleLogout}>
                    <FaBook style={{ marginRight: "10px" }} />
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>Logout</Link>
                </li>
            </ul>
        </div>

        <div className='screen'>
            {activeSection === 'dashboard' && (
                <div className="card-container">
                    <Card 
                        icon={techpic}
                        title="Technical Test"
                        description="Ace your interview with AI-generated quizzes and flaunt your scores to land a job!"
                        path='/technicalinstrunction'
                    />
                    <Card 
                        icon={IQ}
                        title="IQ Test"
                        description="Test Your Smarts: How High Can You Score?"
                        path='/iqinstrunction'
                    />
                    <Card 
                        icon={Emotional}
                        title="EQ Test"
                        description="Empathy Is Key: What’s Your Emotional Quotient?"
                        path='/eqinstrunction'
                    />
                    <Card 
                        icon={PDF}
                        title="PDF Conversion"
                        description="Effortless PDF Conversion: Transform Your Files in Seconds!"
                        path="/pdf"
                    />
                    <Card 
                        icon={ATS}
                        title="ATS Friendly"
                        description="Pass the ATS and Impress the Hiring Team!"
                        path="/ats"
                    />
                    
                </div>
            )}

            {activeSection === 'interviewPreparation' && (
                <div className="card-container">
                    <Card 
                        icon={techpic}
                        title="Technical Test"
                        description="Ace your interview with AI-generated quizzes and flaunt your scores to land a job!"
                        path='/technicalinstrunction'
                    />
                    <Card 
                        icon={IQ}
                        title="IQ Test"
                        description="Test Your Smarts: How High Can You Score?"
                        path='/iqinstrunction'
                    />
                    <Card 
                        icon={Emotional}
                        title="EQ Test"
                        description="Empathy Is Key: What’s Your Emotional Quotient?"
                        path='/eqinstrunction'
                    />
                </div>
            )}

            {activeSection === 'resumeOptimization' && (
                <div className="card-container">
                    <Card 
                        icon={PDF}
                        title="PDF Conversion"
                        description="Effortless PDF Conversion: Transform Your Files in Seconds!"
                        path="/pdf"
                    />
                    <Card 
                        icon={ATS}
                        title="ATS Friendly"
                        description="Pass the ATS and Impress the Hiring Team!"
                        path="/ats"
                    />
                    
                </div>
            )}
        </div>
      </>
    );
};

export default Userpage;
