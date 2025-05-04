import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userAnswers = [], quizType = "iq", correct = 0, totalQuestions = 0 } = location.state || {};

  const goBackToQuiz = () => {
    navigate(-1);
  };

  const renderEQReview = () => {
    return (
      <>
        {userAnswers.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#F4E6FF",
              padding: "25px",
              marginBottom: "25px",
              borderLeft: "8px solid #5D009F",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              color: "#000000",
            }}
          >
            <h4 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>
              Q{index + 1}: {item.question}
            </h4>

            <p style={{ marginBottom: "10px" }}>
              <strong>Your Answer:</strong>{" "}
              <span
                style={{
                  color: "#000000",
                  fontWeight: "bold",
                }}
              >
                {item.selected}
              </span>
            </p>
          </div>
        ))}

        <div
          style={{
            backgroundColor: "#E7F9EA",
            padding: "25px",
            borderRadius: "12px",
            textAlign: "center",
            marginTop: "40px",
            color: "#000000",
          }}
        >
          <h3 style={{ color: "#5D009F", fontSize: "1.5rem", marginBottom: "10px" }}>
            Your Emotional Intelligence Score: {correct} / {totalQuestions * 5}
          </h3>
          <p>
            Higher scores indicate higher emotional intelligence.
            <br />
            Lower scores suggest areas for potential growth and development.
          </p>
        </div>
      </>
    );
  };

  const renderIQOrTechnicalReview = () => {
    return userAnswers.map((item, index) => {
      const isCorrect = item.selected === item.correct;
      return (
        <div
          key={index}
          style={{
            backgroundColor: isCorrect ? "#E7F9EA" : "#F4E6FF",
            padding: "25px",
            marginBottom: "25px",
            borderLeft: `8px solid ${isCorrect ? "#2ecc71" : "#5D009F"}`,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            color: "#000000",
          }}
        >
          <h4 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>
            Q{index + 1}: {item.question}
          </h4>

          <p style={{ marginBottom: "10px" }}>
            <strong>Your Answer:</strong>{" "}
            <span
              style={{
                color: "#000000",
                fontWeight: "bold",
              }}
            >
              {item.selected}
            </span>
          </p>

          {!isCorrect && (
            <p>
              <strong>Correct Answer:</strong>{" "}
              <span style={{ color: "#000000", fontWeight: "bold" }}>
                {item.correct}
              </span>
            </p>
          )}
        </div>
      );
    });
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#F4F4F4",
        minHeight: "100vh",
        color: "#000000",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          textAlign: "center",
          color: "#5D009F",
          marginBottom: "40px",
        }}
      >
        Review Your Answers
      </h2>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {quizType === "eq" ? renderEQReview() : renderIQOrTechnicalReview()}

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={goBackToQuiz}
            style={{
              padding: "14px 30px",
              backgroundColor: "#5D009F",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#48017a")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#5D009F")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;