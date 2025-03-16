import { React, useState } from "react";
import './companydashboard.css';
import { Link } from 'react-router-dom';
import riphahlogo from '../Pictures/Riphah.png';
import air from '../Pictures/Fast.png';
import Nu from "../Pictures/Nust.png";
import bahria from '../Pictures/Bahria.png';
import lums from '../Pictures/Lums.png';
import nust from '../Pictures/Nust.png';
import { FaClipboardList, FaFileAlt, FaBook } from 'react-icons/fa';

const Companydashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const universities = [
        { name: "Riphah International University", score: 60, logo: riphahlogo },
        { name: "Air University", score: 65, logo: air },
        { name: "National University", score: 65, logo: Nu },
        { name: "Bahria University", score: 65, logo: bahria },
        { name: "LUMS University", score: 60, logo: lums },
        { name: "Nust University", score: 65, logo: nust },
        { name: "University of Karachi", score: 70, logo: air },
        { name: "COMSATS University", score: 68, logo: riphahlogo },
        { name: "University of Punjab", score: 72, logo: lums },
        { name: "University of Lahore", score: 66, logo: bahria },
        { name: "University of Sargodha", score: 69, logo: nust },
        { name: "Iqra University", score: 71, logo: Nu }
    ];

    return (
        <>
            <div className="sidebar-new" style={{position:"fixed"}}>
                <div className="app-name-new">
                    MockBot
                </div>

                
                    <div className="profile-section-new">
                        <div className="profile-icon-new">M</div>
                        <div className="profile-info-new">
                            <div className="profile-name-new">Soft Code</div>
                            <div className="profile-plan-new">Manage Account (Free Plan)</div>
                        </div>
                    </div>
              

                <ul className="menu-new">
                    <li className="menu-item-new" onClick={() => handleSectionChange('dashboard')}><FaClipboardList style={{ marginRight: "10px" }} />Dashboard</li>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/question-vault'>
                        <li className="menu-item-new" onClick={() => handleSectionChange('interviewPreparation')}>
                        <FaBook style={{ marginRight: "10px" }} />Question Vault
                        </li>
                    </Link>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>
                        <li className="menu-item-new" >
                        <FaFileAlt style={{ marginRight: "10px" }} />Logout
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="scrolling">
            <div className="screen-comp-new">
                {activeSection === 'dashboard' && (
                    <div className="card-container-new">
                        {universities.map((uni, index) => (
                            <div key={index} className="university-card-new">
                                <img src={uni.logo} alt={`${uni.name} Logo`} className="university-logo-new" />
                                <div className="university-info-new">
                                    <h3>{uni.name}</h3>
                                </div>
                                <Link 
                                    to={`/student-ranking/${encodeURIComponent(uni.name)}`} 
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <div className="progress-circle-new" style={{ '--progress': uni.score }}>
                                        <span>{uni.score}%</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div></div>
        </>
    );
};

export default Companydashboard;