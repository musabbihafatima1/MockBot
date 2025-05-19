import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { 
  FiHome, 
  FiChevronRight,
  FiAward, 
  FiFileText, 
  FiLogOut,
  FiMenu,
  FiX,
  FiUser,
  FiBook,
  FiTool,
  FiFile
} from "react-icons/fi";
import { 
  FaBrain, 
  FaHeart, 
  FaCode,
  FaRegBell
} from "react-icons/fa";
import { Link } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Initialize darkMode from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [userInfo, setUserInfo] = useState({ username: '' });
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState({
    iq: { score: 0, percentile: 0, completed: false },
    technical: { score: 0, percentile: 0, completed: false },
    eq: { score: 0, percentile: 0, completed: false }
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Save darkMode preference to localStorage whenever it changes
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/auth/profilename', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserInfo(data);
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

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/scores', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        if (response.ok) {
          setScores(prev => ({
            iq: {
              score: data.iqScore,
              percentile: calculatePercentile(data.iqScore),
              completed: data.hasIq
            },
            eq: {
              score: data.eqScore,
              percentile: calculatePercentile(data.eqScore),
              completed: data.hasEq
            },
            technical: {
              score: data.technicalScore, // Fixed: now using correct field
              percentile: calculatePercentile(data.technicalScore),
              completed: data.hasTechnical
            }
          }));
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };
  
    if (token) {
      fetchScores();
    }
  }, [token]);

  const calculatePercentile = (score) => {
    return Math.min(99, Math.max(1, Math.round(score * 0.9)));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  };

  const testData = {
    iq: scores.iq,
    technical: scores.technical,
    eq: scores.eq
  };

  const completedTests = Object.values(testData).filter(test => test.completed).length;
  const progressPercentage = (completedTests / Object.keys(testData).length) * 100;

  const barChartData = {
    labels: ['IQ', 'Technical', 'EQ'],
    datasets: [{
      data: [testData.iq.score, testData.technical.score, testData.eq.score],
      backgroundColor: [
        '#5D009F',
        '#3f37c9',
        '#f72585'
      ],
      borderWidth: 0,
      borderRadius: 6,
      barThickness: windowWidth < 768 ? 24 : 32,
    }]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
        titleColor: darkMode ? '#ffffff' : '#2b2d42',
        bodyColor: darkMode ? '#ffffff' : '#2b2d42',
        borderColor: darkMode ? '#333' : '#edf2f4',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (context) => {
            const test = testData[Object.keys(testData)[context.dataIndex]];
            return `Score: ${test.score}% | Top ${test.percentile}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: darkMode ? 'rgba(255,255,255,0.1)' : '#edf2f4',
          drawTicks: false
        },
        ticks: {
          stepSize: 25,
          color: darkMode ? '#e5e5e5' : '#8d99ae',
          font: {
            size: windowWidth < 768 ? 12 : 14
          }
        }
      },
      x: {
        grid: { display: false },
        ticks: {
          color: darkMode ? '#e5e5e5' : '#2b2d42',
          font: {
            size: windowWidth < 768 ? 12 : 14
          }
        }
      }
    }
  };

  const colors = {
    primary: '#4361ee',
    accent: '#5D009F',
    surface: darkMode ? '#1e1e1e' : '#ffffff',
    onSurface: darkMode ? '#e5e5e5' : '#2b2d42',
    outline: darkMode ? '#333' : '#edf2f4'
  };

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: darkMode ? '#121212' : '#f8f9fa',
      color: darkMode ? '#e5e5e5' : '#2b2d42',
      position: 'relative'
    },
    sidebar: {
      width: sidebarOpen ? '240px' : '0',
      backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
      borderRight: `1px solid ${colors.outline}`,
      transition: 'width 0.3s ease',
      overflow: 'hidden',
      position: 'fixed',
      height: '100vh',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column'
    },
    sidebarContent: {
      width: '240px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between'
    },
    sidebarMain: {
      flex: 1
    },
    sidebarFooter: {
      marginTop: 'auto'
    },
    mainContent: {
      flex: 1,
      padding: windowWidth < 768 ? '16px' : '24px',
      transition: 'margin-left 0.3s ease',
      marginLeft: sidebarOpen ? (windowWidth < 1024 ? '0' : '240px') : '0',
      width: sidebarOpen ? `calc(100% - 240px)` : '100%',
      maxWidth: '100%'
    },
    cardContainer: {
     marginTop:'-10px',
      display: 'grid',
      gridTemplateColumns: windowWidth < 600 ? '1fr' : 
                         windowWidth < 900 ? 'repeat(2, 1fr)' : 
                         'repeat(3, 1fr)',
      gap: '16px',
      marginBottom: '24px'
    },
    chartSection: {
      display: 'flex',
      flexDirection: windowWidth < 900 ? 'column' : 'row',
      gap: '16px',
      alignItems: 'stretch',
      maxWidth: '1000px',
      margin: '0 auto'
    },
    chartContainer: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      border: `1px solid ${colors.outline}`,
      display: 'flex',
      flexDirection: 'column',
      height: windowWidth < 900 ? '320px' : '360px'
    },
    progressContainer: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      border: `1px solid ${colors.outline}`,
      display: 'flex',
      flexDirection: 'column',
      height: windowWidth < 900 ? '320px' : '360px'
    },
    progressCircle: {
      width: '180px',
      height: '180px',
      margin: '0 auto 16px'
    },
    headerContainer: { 
      display: 'flex', 
      flexDirection: windowWidth < 600 ? 'column' : 'row',
      justifyContent: 'space-between', 
      alignItems: windowWidth < 600 ? 'flex-start' : 'center',
      marginBottom: '24px',
      gap: windowWidth < 600 ? '12px' : '0'
    },
    menuButton: {
      background: 'none',
      border: 'none',
      color: colors.onSurface,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      marginRight: '12px'
    },
    sidebarHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '32px'
    },
    sidebarItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 0',
      color: colors.onSurface,
      textDecoration: 'none',
      fontSize: '14px',
      marginBottom: '4px',
      transition: 'color 0.2s ease',
    },
    sidebarIcon: {
      marginRight: '12px',
      fontSize: '18px'
    },
    sidebarDivider: {
      borderTop: `1px solid ${colors.outline}`,
      margin: '16px 0'
    },
    profileSection: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '24px',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'all 0.2s ease',
      '&:hover': {
        color: colors.accent
      }
    },
    profileIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: colors.accent,
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '12px',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    profileInfo: {
      display: 'flex',
      flexDirection: 'column'
    },
    profileName: {
      fontWeight: 'bold',
      fontSize: '14px'
    },
    profilePlan: {
      fontSize: '12px',
      color: darkMode ? '#8d99ae' : '#5F6368'
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarContent}>
          <div style={styles.sidebarMain}>
            <div style={styles.sidebarHeader}>
              <h2 style={{ margin: 0, color: colors.accent }}>MockBot</h2>
              <button 
                onClick={toggleSidebar}
                style={{
                  background: 'none',
                  border: 'none',
                  color: colors.onSurface,
                  cursor: 'pointer'
                }}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Profile Section */}
            <Link to="/Userprofile" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={styles.profileSection}>
                <div style={styles.profileIcon}>
                  {userInfo.username[0]?.toUpperCase()}
                </div>
                <div style={styles.profileInfo}>
                  <div style={styles.profileName}>{userInfo.username}</div>
                  <div style={styles.profilePlan}>Manage Account (Free Plan)</div>
                </div>
              </div>
            </Link>
            
            <div style={styles.sidebarDivider} />
            
            <Link to="/userpage" style={styles.sidebarItem}>
              <FiHome style={styles.sidebarIcon} />
              Dashboard
            </Link>
            
            <div style={styles.sidebarDivider} />
            
            <Link to="/iqinstrunction" style={styles.sidebarItem}>
              <FaBrain style={styles.sidebarIcon} />
              IQ Test
            </Link>
            <Link to="/eqinstrunction" style={styles.sidebarItem}>
              <FaHeart style={styles.sidebarIcon} />
              EQ Test
            </Link>
            <Link to="/technicalinstrunction" style={styles.sidebarItem}>
              <FaCode style={styles.sidebarIcon} />
              Technical Test
            </Link>
            <Link to="/ats" style={styles.sidebarItem}>
              <FiTool style={styles.sidebarIcon} />
              ATS Analysis
            </Link>
            <Link to="/pdf" style={styles.sidebarItem}>
              <FiFile style={styles.sidebarIcon} />
              PDF Conversion
            </Link>
          </div>

          {/* Logout at the bottom */}
          <div style={styles.sidebarFooter}>
            <div style={styles.sidebarDivider} />
            <Link to="/" style={styles.sidebarItem} onClick={handleLogout}>
              <FiLogOut style={styles.sidebarIcon} />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.headerContainer}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {!sidebarOpen && (
              <button onClick={toggleSidebar} style={styles.menuButton}>
                <FiMenu size={20} />
              </button>
            )}
            <div>
              <h1 style={{ 
                fontSize: windowWidth < 600 ? '22px' : '24px', 
                margin: 0,
                marginTop:'-10px',
                color: colors.accent
              }}>
                Candidate Dashboard
              </h1>
              <p style={{ 
                color: darkMode ? '#8d99ae' : '#5F6368',
                margin: '4px 0 0 0',
                marginLeft:'3px',
                fontSize: '13px'
              }}>
                Performance overview and analytics
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '12px'
          }}>
            <button onClick={() => setDarkMode(!darkMode)} style={{
              background: 'none',
              border: 'none',
              color: darkMode ? '#FBBC05' : '#5F6368',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>

        {/* Score Cards */}
        <div style={styles.cardContainer}>
          {Object.entries(testData).map(([test, data], index) => (
            <div key={test} style={{
              backgroundColor: colors.surface,
              borderRadius: '10px',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              border: `1px solid ${colors.outline}`
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: index === 0 ? 'rgba(93, 0, 159, 0.1)' : 
                                 index === 1 ? 'rgba(63, 55, 201, 0.1)' : 
                                 'rgba(247, 37, 133, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  flexShrink: 0
                }}>
                  {index === 0 && <FaBrain size={16} color="#5D009F" />}
                  {index === 1 && <FaCode size={16} color="#3f37c9" />}
                  {index === 2 && <FaHeart size={16} color="#f72585" />}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <h3 style={{ 
                    margin: 0,
                    fontSize: '13px',
                    color: darkMode ? '#8d99ae' : '#5F6368',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {test === 'iq' ? 'IQ' : 
                      test === 'eq' ? 'EQ' : 
                      test.charAt(0).toUpperCase() + test.slice(1)} Test 
                   
                  </h3>
                  <p style={{ 
                    margin: 0,
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: index === 0 ? colors.accent : colors.primary
                  }}>
                    {data.score}%
                  </p>
                </div>
              </div>
              
              <div style={{ marginTop: '10px' }}>
                <div style={{
                  height: '4px',
                  backgroundColor: colors.outline,
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${data.score}%`,
                    backgroundColor: index === 0 ? colors.accent : 
                                    index === 1 ? '#3f37c9' : 
                                    '#f72585',
                    borderRadius: '2px'
                  }}></div>
                </div>
                <p style={{ 
                  margin: '4px 0 0 0',
                  fontSize: '11px',
                  color: darkMode ? '#8d99ae' : '#5F6368'
                }}>
                  Your score percentage
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart and Progress Section */}
        <div style={styles.chartSection}>
          <div style={styles.chartContainer}>
            <h2 style={{ 
              margin: '0 0 16px 0',
              fontSize: '16px',
              color: colors.accent
            }}>
              Performance Overview
            </h2>
            <div style={{ flex: 1 }}>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
          
          <div style={styles.progressContainer}>
            <h2 style={{ 
              margin: '0 0 16px 0',
              fontSize: '16px',
              color: colors.accent,
              alignSelf: 'flex-start'
            }}>
              Completion
            </h2>
            
            <div style={styles.progressCircle}>
              <CircularProgressbar
                value={progressPercentage}
                text={`${Math.round(progressPercentage)}%`}
                styles={buildStyles({
                  pathColor: colors.accent,
                  textColor: colors.onSurface,
                  trailColor: colors.outline,
                  textSize: '24px'
                })}
              />
            </div>
            
            <p style={{ 
              margin: '0 0 16px 0',
              color: darkMode ? '#8d99ae' : '#5F6368',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {completedTests} out of {Object.keys(testData).length} tests completed
            </p>
            
            <div style={{ 
              display: 'grid',
              gap: '10px',
              width: '100%'
            }}>
              {Object.entries(testData).map(([test, data], index) => (
                <div key={test} style={{ 
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: data.completed ? 
                      (index === 0 ? colors.accent : 
                       index === 1 ? '#3f37c9' : 
                       '#f72585') : 
                      colors.outline,
                    marginRight: '10px',
                    flexShrink: 0
                  }}></div>
                  <span style={{ 
                    color: colors.onSurface,
                    marginTop:'-8px',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {test === 'iq' ? 'IQ' : 
                      test === 'eq' ? 'EQ' : 
                      test.charAt(0).toUpperCase() + test.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;