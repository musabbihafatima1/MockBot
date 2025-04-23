
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import bgImage from "../Assets/background.jpg";
// import "./Scoreboard.css";

// const Scoreboard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const {
//     correct = 0,
//     totalQuestions = location.state?.quizType === "iq" ? 12 : 33,
//     userAnswers = [],
//     quizType = "eq", // default to EQ if not specified
//   } = location.state || {};

//   const maxScore = quizType === "iq" ? 12 : totalQuestions * 5;
//   const percentage = ((correct / maxScore) * 100).toFixed(2);

//   const getEQMessage = () => {
//     if (correct >= 132) {
//       return {
//         title: "Emotionally Strong",
//         message:
//           "You have high emotional intelligence,<br/> which means you're highly self-aware, empathetic, and skilled at managing emotions.",
//       };
//     } else if (correct >= 99) {
//       return {
//         title: "Moderately Emotionally Aware",
//         message:
//           "You show a good level of emotional intelligence, but there's still some room for development in handling complex emotional scenarios.",
//       };
//     } else {
//       return {
//         title: "Emotionally Weak",
//         message:
//           "Your emotional intelligence score is low. This suggests areas where you can grow — consider practicing mindfulness, empathy, and self-regulation.",
//       };
//     }
//   };

//   const getIQMessage = () => {
//     if (correct >= 10) {
//       return {
//         title: "Highly Intelligent",
//         message:
//           "You scored well on the IQ test, demonstrating strong problem-solving and analytical skills.",
//       };
//     } else if (correct >= 6) {
//       return {
//         title: "Moderate Intelligence",
//         message:
//           "Your IQ score indicates a decent ability to solve problems and think critically. Keep practicing!",
//       };
//     } else {
//       return {
//         title: "Needs Improvement",
//         message:
//           "Your IQ score is on the lower side. Consider more cognitive training and logical puzzles to sharpen your mind.",
//       };
//     }
//   };

//   const generateShareLink = () => {
//     const baseUrl = window.location.origin;
//     const shareableLink = `${baseUrl}/score?correct=${correct}&total=${maxScore}&type=${quizType}`;
//     navigator.clipboard.writeText(shareableLink);
//     alert("Score link copied to clipboard!");
//   };

//   const getQuizRoute = () => (quizType === "iq" ? "/iqquiz" : "/eqquiz");

//   const { title, message } =
//     quizType === "iq" ? getIQMessage() : getEQMessage();

//   return (
//     <>
//       <Navbar />
//       <div
//         className="scoreboard-container"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       >
//         <div className="score-circle">
//           <h2>{quizType === "iq" ? "IQ Score" : "EQ Score"}</h2>
//           <p className="score-percentage">
//             {correct} / {maxScore}
//           </p>
//         </div>

//         <h3 className="score-message">{title}</h3>
//         <p
//           className="score-subtext"
//           dangerouslySetInnerHTML={{ __html: message }}
//         ></p>

//         <div className="score-details">
//           <div className="score-box">
//             <p>Total Questions</p>
//             <span>{totalQuestions}</span>
//           </div>
//           <div className="score-box correct">
//             <p>Total Score</p>
//             <span>{correct}</span>
//           </div>
//           <div className="score-box">
//             <p>Max Score</p>
//             <span>{maxScore}</span>
//           </div>
//           <div className="score-box">
//             <p>Percentage</p>
//             <span>{percentage} %</span>
//           </div>
//         </div>

//         <div className="score-buttons">
//           <button onClick={() => navigate("/userpage")}>Home</button>
//           <button onClick={generateShareLink}>Share Score</button>
//           <button
//             onClick={() =>
//               navigate("/review", {
//                 state: { userAnswers, quizType, correct, totalQuestions },
//               })
//             }
//           >
//             Review Answers
//           </button>
//           <button onClick={() => navigate(getQuizRoute())}>Play Again</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Scoreboard;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import bgImage from "../Assets/background.jpg";
import "./Scoreboard.css";

const Scoreboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    correct = 0,
    totalQuestions = location.state?.quizType === "iq" ? 12 : 
                     location.state?.quizType === "technical" ? 50 : 33,
    userAnswers = [],
    quizType = "eq", // default to EQ if not specified
  } = location.state || {};

  // Define max scores based on quiz type
  const maxScores = {
    iq: 12,
    eq: 132,
    technical: 50
  };

  const maxScore = maxScores[quizType] || totalQuestions * 5;
  const percentage = ((correct / maxScore) * 100).toFixed(2);

  // Score interpretation messages
  const getScoreMessage = () => {
    const messages = {
      iq: {
        high: {
          title: "Highly Intelligent",
          message: "You scored well on the IQ test, demonstrating strong problem-solving and analytical skills."
        },
        medium: {
          title: "Moderate Intelligence",
          message: "Your IQ score indicates a decent ability to solve problems and think critically. Keep practicing!"
        },
        low: {
          title: "Needs Improvement",
          message: "Your IQ score is on the lower side. Consider more cognitive training and logical puzzles to sharpen your mind."
        }
      },
      eq: {
        high: {
          title: "Emotionally Strong",
          message: "You have high emotional intelligence, which means you're highly self-aware, empathetic, and skilled at managing emotions."
        },
        medium: {
          title: "Moderately Emotionally Aware",
          message: "You show a good level of emotional intelligence, but there's still some room for development in handling complex emotional scenarios."
        },
        low: {
          title: "Emotionally Weak",
          message: "Your emotional intelligence score is low. This suggests areas where you can grow — consider practicing mindfulness, empathy, and self-regulation."
        }
      },
      technical: {
        high: {
          title: "Technical Expert",
          message: "Excellent technical skills! You demonstrate strong knowledge of software engineering concepts."
        },
        medium: {
          title: "Intermediate Technical Skills",
          message: "You have a good foundation of technical knowledge with room for improvement in some areas."
        },
        low: {
          title: "Technical Beginner",
          message: "Your technical skills need development. Consider more practice with coding and software engineering concepts."
        }
      }
    };

    if (quizType === "iq") {
      if (correct >= 10) return messages.iq.high;
      if (correct >= 6) return messages.iq.medium;
      return messages.iq.low;
    } else if (quizType === "eq") {
      if (correct >= 99) return messages.eq.high;
      if (correct >= 66) return messages.eq.medium;
      return messages.eq.low;
    } else { // technical
      if (correct >= 40) return messages.technical.high;
      if (correct >= 25) return messages.technical.medium;
      return messages.technical.low;
    }
  };

  const generateShareLink = () => {
    const baseUrl = window.location.origin;
    const shareableLink = `${baseUrl}/score?correct=${correct}&total=${maxScore}&type=${quizType}`;
    navigator.clipboard.writeText(shareableLink);
    alert("Score link copied to clipboard!");
  };

  const getQuizRoute = () => {
    switch(quizType) {
      case "iq": return "/iqquiz";
      case "technical": return "/technicalquiz";
      default: return "/eqquiz";
    }
  };

  const { title, message } = getScoreMessage();

  // Save score to backend
  React.useEffect(() => {
    const saveScore = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        let endpoint = '';
        if (quizType === 'iq') endpoint = '/saveIqscore';
        else if (quizType === 'eq') endpoint = '/saveEqscore';
        else if (quizType === 'technical') endpoint = '/saveTechnicalScore';

        await fetch(`http://localhost:5000/api/auth${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ score: correct })
        });
      } catch (error) {
        console.error('Error saving score:', error);
      }
    };

    saveScore();
  }, [correct, quizType]);

  return (
    <>
      <Navbar />
      <div
        className="scoreboard-container"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="score-circle">
          <h2>
            {quizType === "iq" ? "IQ Score" : 
             quizType === "technical" ? "Technical Score" : "EQ Score"}
          </h2>
          <p className="score-percentage">
            {correct} / {maxScore}
          </p>
        </div>

        <h3 className="score-message">{title}</h3>
        <p className="score-subtext">{message}</p>

        <div className="score-details">
          <div className="score-box">
            <p>Total Questions</p>
            <span>{totalQuestions}</span>
          </div>
          <div className="score-box correct">
            <p>Total Score</p>
            <span>{correct}</span>
          </div>
          <div className="score-box">
            <p>Max Score</p>
            <span>{maxScore}</span>
          </div>
          <div className="score-box">
            <p>Percentage</p>
            <span>{percentage} %</span>
          </div>
        </div>

        <div className="score-buttons">
          <button onClick={() => navigate("/userpage")}>Home</button>
          <button onClick={generateShareLink}>Share Score</button>
          <button
            onClick={() =>
              navigate("/review", {
                state: { userAnswers, quizType, correct, totalQuestions },
              })
            }
          >
            Review Answers
          </button>
          <button onClick={() => navigate(getQuizRoute())}>Play Again</button>
        </div>
      </div>
    </>
  );
};

export default Scoreboard;
