import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./StudentRanking.css";

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

// Sort universities by total score and calculate rank
const sortedUniversities = universities
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((university, index) => ({ ...university, rank: index + 1 }));

const StudentRanking = () => {
    const { universityName } = useParams();
    const navigate = useNavigate();

    // Find university rank based on name
    const university = sortedUniversities.find(uni => uni.name === universityName);
    const universityRank = university ? university.rank : "N/A";

    return (
        <div className="ranking-container">
            <div className="left-panel">
                <button className="back-button" onClick={() => navigate(-1)}>
                    &#8592;
                </button>
                <div className="university-name">{universityName}</div>
                <div className="university-rank">
                    Rank in Country: <span>{universityRank}</span>
                </div>
            </div>
            <div className="right-panel">
                <div className="ranking-header">TOP STUDENTS</div>
                <table className="ranking-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Student Name</th>
                            <th>Score</th>
                            <th>Email</th>
                            <th>Technical IT Field</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{student.name}</td>
                                <td>{`${student.score.obtained}/${student.score.total}`}</td>
                                <td>
                                    <a href={`mailto:${student.email}`} className="email-link">
                                        {student.email}
                                    </a>
                                </td>
                                <td>{student.field}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentRanking;