import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const students = [
    { name: "John Doe", score: { obtained: 190, total: 200 }, email: "john.doe@example.com", field: "Software Development" },
    { name: "Jane Smith", score: { obtained: 180, total: 200 }, email: "jane.smith@example.com", field: "Data Science" },
    { name: "Alice Johnson", score: { obtained: 170, total: 200 }, email: "alice.johnson@example.com", field: "Cybersecurity" },
    { name: "Robert Brown", score: { obtained: 160, total: 200 }, email: "robert.brown@example.com", field: "Cloud Computing" },
    { name: "Emily Davis", score: { obtained: 150, total: 200 }, email: "emily.davis@example.com", field: "AI & Machine Learning" },
    { name: "Michael Wilson", score: { obtained: 140, total: 200 }, email: "michael.wilson@example.com", field: "Networking" },
    { name: "Sophia Taylor", score: { obtained: 130, total: 200 }, email: "sophia.taylor@example.com", field: "UI/UX Design" },
    { name: "Liam Anderson", score: { obtained: 120, total: 200 }, email: "liam.anderson@example.com", field: "DevOps" },
    { name: "Isabella Thomas", score: { obtained: 100, total: 200 }, email: "isabella.thomas@example.com", field: "Database Management" },
    { name: "Oliver Jackson", score: { obtained: 90, total: 200 }, email: "oliver.jackson@example.com", field: "QA Testing" },
];

const universities = [
    { name: "Riphah International University", totalScore: 65000 },
    { name: "Air University", totalScore: 60000 },
    { name: "National University", totalScore: 58000 },
    { name: "Bahria University", totalScore: 54000 },
    { name: "LUMS University", totalScore: 50000 },
    { name: "Nust University", totalScore: 48000 },
];

const sortedUniversities = universities
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((university, index) => ({ ...university, rank: index + 1 }));

const StudentRanking = () => {
    const { universityName } = useParams();
    const navigate = useNavigate();

    const university = sortedUniversities.find(uni => uni.name === universityName);
    const universityRank = university ? university.rank : "N/A";

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            maxWidth: '1200px',
            height: '100vh',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            borderRadius: '12px',
            margin: '0 auto',
            backgroundColor: '#ffffff'
        }}>
            {/* Left Panel */}
            <div style={{
                width: '30%',
                background: 'linear-gradient(145deg, #1a1a2e, #302b63)',
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
                
                <div style={{
                    width: '100%',
                    overflowX: 'auto'
                }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
                    }}>
                        <thead>
                            <tr style={{
                                backgroundColor: '#1a1a2e',
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
                                <tr key={index} style={{
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
                                        {`${student.score.obtained}/${student.score.total}`}
                                    </td>
                                    <td style={{
                                        padding: '15px',
                                        textAlign: 'center'
                                    }}>
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