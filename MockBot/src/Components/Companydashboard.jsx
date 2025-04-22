import { React, useState, useEffect } from "react";
import './companydashboard.css';
import { Link } from 'react-router-dom';
import { FaSearch, FaChevronRight, FaSun, FaMoon } from 'react-icons/fa';
import { MdDashboard, MdLogout } from 'react-icons/md';
import { FiBook } from 'react-icons/fi';

// Import university logos
import riphahlogo from '../Pictures/Riphah.png';
import air from '../Pictures/Fast.png';
import Nu from "../Pictures/Nust.png";
import bahria from '../Pictures/Bahria.png';
import lums from '../Pictures/Lums.png';
import nust from '../Pictures/Nust.png';

const universities = [
  { name: "Riphah International University", score: 60, logo: riphahlogo, students: 1245 },
  { name: "Air University", score: 65, logo: air, students: 982 },
  { name: "National University of Sciences & Technology", score: 65, logo: Nu, students: 1560 },
  { name: "Bahria University", score: 65, logo: bahria, students: 1120 },
  { name: "Lahore University of Management Sciences", score: 60, logo: lums, students: 2100 },
  { name: "National University of Sciences & Technology", score: 65, logo: nust, students: 1850 },
  { name: "University of Karachi", score: 70, logo: air, students: 3200 },
  { name: "COMSATS University Islamabad", score: 68, logo: riphahlogo, students: 1450 },
  { name: "University of the Punjab", score: 72, logo: lums, students: 2800 },
  { name: "Lahore University", score: 66, logo: bahria, students: 1650 },
  { name: "University of Sargodha", score: 69, logo: nust, students: 1320 },
  { name: "Iqra University", score: 71, logo: Nu, students: 980 }
];

const Companydashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', darkMode);
    }
  }, [darkMode, mounted]);

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`enterprise-dashboard ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="app-brand">
            <span className="app-name">MockBot</span>
            <span className="app-tagline">Talent Intelligence Platform</span>
          </div>
        </div>

        <div className="company-profile">
          <div className="profile-avatar">SC</div>
          <div className="profile-info">
            <div className="company-name">Soft Code</div>
            <div className="account-type">Enterprise Account</div>
          </div>
        </div>

        <nav className="dashboard-nav">
          <div
            className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <MdDashboard className="nav-icon" />
            <span>University Analytics</span>
            <div className="nav-active-indicator"></div>
          </div>

          <Link to='/question-vault' className="nav-link">
            <div className={`nav-item ${activeSection === 'interviewPreparation' ? 'active' : ''}`}
              onClick={() => setActiveSection('interviewPreparation')}>
              <FiBook className="nav-icon" />
              <span>Question Vault</span>
              <div className="nav-active-indicator"></div>
            </div>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link to='/' className="logout-button">
            <MdLogout className="logout-icon" />
            <span>Logout</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>University Talent Pool</h1>
            <div className="header-actions">
              <button
                className="theme-toggle-desktop"
                onClick={() => setDarkMode(!darkMode)}
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="results-count">
            {filteredUniversities.length} {filteredUniversities.length === 1 ? 'institution' : 'institutions'} found
          </div>
        </header>

        <div className="dashboard-content">
          {activeSection === 'dashboard' && (
            <div className="university-grid-container">
              <div className="university-grid">
                {filteredUniversities.map((uni, index) => (
                  <Link
                    to={`/student-ranking/${encodeURIComponent(uni.name)}`}
                    key={index}
                    className="university-card"
                  >
                    <div className="university-card-content">
                      <div className="university-logo-wrapper">
                        <img src={uni.logo} alt={uni.name} className="university-logo" />
                      </div>
                      <div className="university-details">
                        <h3 className="university-title">{uni.name}</h3>
                        <div className="university-stats">
                          <span className="student-total">{uni.students.toLocaleString()} students</span>
                          <div className="compatibility-meter">
                            <div className="progress-wrapper">
                              <div className="progress-fill" style={{ width: `${uni.score}%` }}></div>
                            </div>
                            <span className="match-percentage">{uni.score}% Match</span>
                          </div>
                        </div>
                      </div>
                      <FaChevronRight className="view-arrow" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Companydashboard;