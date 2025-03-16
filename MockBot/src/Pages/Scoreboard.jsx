import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar"; // Using existing Navbar component
import bgImage from "../Assets/background.jpg"; // Importing background image
import "./Scoreboard.css";

const Scoreboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correct, totalQuestions, userAnswers } = location.state || { correct: 0, totalQuestions: 1, userAnswers: [] };

  const wrong = totalQuestions - correct;
  const scorePercentage = ((correct / totalQuestions) * 100).toFixed(2);

  const getScoreMessage = () => {
    if (scorePercentage === "100.00") return "Excellent!";
    if (scorePercentage >= "75.00") return "Great Job!";
    if (scorePercentage >= "50.00") return "Average";
    return "Keep Trying!";
  };

  // Function to generate a shareable link
  const generateShareLink = () => {
    const baseUrl = window.location.origin;
    const shareableLink = `${baseUrl}/score?correct=${correct}&total=${totalQuestions}`;
    navigator.clipboard.writeText(shareableLink);
    alert("Score link copied to clipboard!");
  };

  return (
    <>
      <Navbar /> {/* Imported Navbar component */}
      <div 
        className="scoreboard-container" 
        style={{ backgroundImage: `url(${bgImage})` }} // Background set dynamically
      >
        <div className="score-circle">
          <h2>Your Score</h2>
          <p className="score-percentage">{scorePercentage} %</p>
        </div>
        <h3 className="score-message">{getScoreMessage()}</h3>
        <p className="score-subtext">You're getting there!</p>

        <div className="score-details">
          <div className="score-box">
            <p>Attempted</p>
            <span>100.00%</span>
          </div>
          <div className="score-box">
            <p>Total Questions</p>
            <span>{totalQuestions}</span>
          </div>
          <div className="score-box correct">
            <p>Correct</p>
            <span>{correct}</span>
          </div>
          <div className="score-box wrong">
            <p>Wrong</p>
            <span>{wrong}</span>
          </div>
        </div>

        <div className="score-buttons">
        <button onClick={() => navigate("/userpage")}>Home</button>

          <button onClick={generateShareLink}>Share Score</button>
          <button onClick={() => navigate("/review", { state: { userAnswers } })}>Review Answer</button>
          <button onClick={() => navigate("/technicalmcqs")}>Play Again</button>
        </div>
      </div>
    </>
  );
};

export default Scoreboard;