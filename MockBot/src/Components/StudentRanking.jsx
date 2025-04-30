import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StudentRanking = () => {
  const { universityName } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch students data
        const studentsResponse = await fetch(
          `http://localhost:5000/api/company/students/${encodeURIComponent(universityName)}`
        );
        if (!studentsResponse.ok) throw new Error('Failed to fetch students');
        const studentsData = await studentsResponse.json();

        // Fetch universities for ranking
        const universitiesResponse = await fetch('http://localhost:5000/api/company/universities');
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        if (!universitiesResponse.ok) throw new Error('Failed to fetch universities');
        
        const universitiesData = await universitiesResponse.json();

        setUniversities(universitiesData);
        setStudents(studentsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [universityName]);

  const university = universities.find(uni => uni.name === universityName);
  const universityRank = university ? 
    universities.indexOf(university) + 1 : 
    "N/A";

    if (loading) {
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            flexDirection: 'column', 
            gap:'16px',
            justifyContent: "center",
            alignItems: "center",
            background: "white",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "linear-gradient(145deg, black, #5D009F)",
              borderRadius: "50%",
              width: "90px",  // Reduced size
              height: "90px", // Reduced size
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              animation: "spin 1.5s linear infinite", // Faster 2D spin
              boxShadow: "0 0 10px rgba(93, 0, 159, 0.3)",
            }}
          >
            <div
              style={{
                fontSize: "15px", // Smaller text
                fontWeight: "bold",
                color: "white",
                textTransform: "uppercase",
                letterSpacing: "1px",
               
              }}
            >
              MockBot
              
            </div>
          </div>
          <p>Loading student list...</p>
          <style>{`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      );
    }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#ffffff',
     
      
     
     
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)'
      
     
     
    }}>
      {/* Left Panel */}
      <div style={{
        width: '25%',
        background: 'linear-gradient(145deg, black, #5D009F)',
        
        color: '#ffffff',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)'
      }}>
        <button 
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: '25px',
            left: '25px',
            background: 'none',
            border: 'none',
            color: '#ffffff',
            fontSize: '24px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            ':hover': {
              transform: 'translateX(-3px)'
            }
          }}
        >
          &#8592;
        </button>
        
        <div style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#ffffff',
          marginTop: '80px',
          marginBottom: '10px',
          textAlign: 'center',
          lineHeight: '1.3'
        }}>
          {universityName}
        </div>
        
        <div style={{
          fontSize: '18px',
          color: '#ffffff',
          marginTop: '20px',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          Rank in Country: <span style={{
            fontWeight: '700',
            color: '#ffd700',
            fontSize: '22px'
          }}>{universityRank}</span>
        </div>
        
        <div style={{
          width: '80%',
          height: '4px',
          background: 'linear-gradient(90deg, rgba(255,215,0,0.5), rgba(255,215,0,0.2))',
          margin: '20px 0',
          borderRadius: '2px'
        }} />
        
        <div style={{
          fontSize: '16px',
          color: 'rgba(255,255,255,0.8)',
          marginTop: '20px',
          textAlign: 'center',
          lineHeight: '1.6'
        }}>
          Top performing students from this institution based on technical assessments and interviews.
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: '70%',
        padding: '30px',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}>
        <div style={{
          fontSize: '28px',
          color: '#1a1a2e',
          marginBottom: '25px',
          textAlign: 'center',
          fontWeight: '600',
          letterSpacing: '0.5px'
        }}>
          TOP STUDENTS
        </div>
        
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
          }}>
            <thead>
              <tr style={{
                background: 'linear-gradient(145deg, black, #5D009F)',
                color: '#ffffff'
              }}>
                <th style={{
                  padding: '15px',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>Rank</th>
                <th style={{
                  padding: '15px',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>Student Name</th>
                <th style={{
                  padding: '15px',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>Score</th>
                <th style={{
                  padding: '15px',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>Email</th>
                <th style={{
                  padding: '15px',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>Technical Field</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.email} style={{
                  borderBottom: '1px solid #f0f0f0',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    backgroundColor: '#f8f8f8',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
                  }
                }}>
                  <td style={{
                    padding: '15px',
                    textAlign: 'center',
                    color: '#1a1a2e',
                    fontWeight: index < 3 ? '700' : '500'
                  }}>
                    {index + 1}
                  </td>
                  <td style={{
                    padding: '15px',
                    textAlign: 'center',
                    color: '#1a1a2e',
                    fontWeight: '500'
                  }}>
                    {student.name}
                  </td>
                  <td style={{
                    padding: '15px',
                    textAlign: 'center',
                    color: index === 0 ? '#27ae60' : 
                          index < 3 ? '#2ecc71' : 
                          '#1a1a2e',
                    fontWeight: '500'
                  }}>
                    {`${student.score.obtained}/194`}
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <a 
                      href={`mailto:${student.email}`}
                      style={{
                        color: '#302b63',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        ':hover': {
                          color: '#ffd700',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {student.email}
                    </a>
                  </td>
                  <td style={{
                    padding: '15px',
                    textAlign: 'center',
                    color: '#1a1a2e',
                    fontWeight: '500'
                  }}>
                    {student.field}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{
          marginTop: '30px',
          textAlign: 'center',
          color: '#666',
          fontSize: '14px'
        }}>
          Data updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default StudentRanking;

