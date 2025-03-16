/*
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./IQquiz.css";

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timer, setTimer] = useState(60); // Timer state
  const navigate = useNavigate();

  // Timer logic
  useEffect(() => {
    if (!quizFinished && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    if (timer === 0 && !quizFinished) {
      handleSubmit(); // Submit the quiz when the timer runs out
    }
  }, [timer, quizFinished]);

  const handleAnswer = (index) => setSelectedAnswer(index);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      // Add 1 to totalScore if the answer is correct
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setTotalScore((prev) => prev + 1);
      }
    }

    setIsFlipping(true);
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentQuestion((prev) => prev + 1);
      setIsFlipping(false);
    }, 600);
  };

  const handlePrevious = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentQuestion((prev) => prev - 1);
      setIsFlipping(false);
    }, 600);
  };

  const saveScore = async (score) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/saveIqscore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  const handleSubmit = async () => {
    // Save the score to the backend
    saveScore(totalScore);
    setQuizFinished(true);
  };

  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  return (
    <div className="bgiq">
      <div className="quiz-special">
      <div className="quiz-timer">Time Left: {timer}s</div> 
        <button className="quiz-back-arrow-iq" onClick={() => navigate("/Userpage")}>
          ←
        </button>

        {quizFinished ? (
          <div className="quiz-score-display">
            <div className="quiz-score-box">
              <h3>Quiz Completed!</h3>
              <p>Your Total Score: <strong>{totalScore}/12</strong></p>
            </div>
          </div>
        ) : (
          <div className={`quiz-card ${isFlipping ? "flipping" : ""}`}>
           
            <h2>Question {currentQuestion + 1}</h2>
            <p>{questions[currentQuestion].questionText}</p>
            {questions[currentQuestion].image && (
              <img
                src={questions[currentQuestion].image}
                alt="Question Visual"
                className="quiz-question-image"
              />
            )}
            <div className="quiz-options">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`quiz-option ${selectedAnswer === index ? "quiz-option-selected" : ""}`}
                  onClick={() => handleAnswer(index)}
                >
                  <img src={option.src} alt={option.label} className="quiz-option-image" />
                </div>
              ))}
            </div>

            <div className="quiz-navigation">
              <button
                className="quiz-nav-btn"
                onClick={handlePrevious}
                disabled={isFirstQuestion}
              >
                Previous
              </button>
              {isLastQuestion ? (
                <button
                  className="quiz-submit-btn"
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="quiz-nav-btn"
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;*/
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./IQquiz.css";

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timer, setTimer] = useState(60); // Timer state
  const navigate = useNavigate();

  // Timer logic
  useEffect(() => {
    if (!quizFinished && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    if (timer === 0 && !quizFinished) {
      handleSubmit(); // Submit the quiz when the timer runs out
    }
  }, [timer, quizFinished]);

  const handleAnswer = (index) => setSelectedAnswer(index);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      // Add 1 to totalScore if the answer is correct
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setTotalScore((prev) => prev + 1);
      }
    }

    setIsFlipping(true);
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentQuestion((prev) => prev + 1);
      setIsFlipping(false);
    }, 600);
  };

  const handlePrevious = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentQuestion((prev) => prev - 1);
      setIsFlipping(false);
    }, 600);
  };

  const saveScore = async (score) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/saveIqscore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  const handleSubmit = async () => {
    // Save the score to the backend
    saveScore(totalScore);
    setQuizFinished(true);
  };

  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  return (
    <div className="iq-bgiq">
      <div className="iq-quiz-container">
        <button className="iq-quiz-back-arrow" onClick={() => navigate("/Userpage")}>
          ←
        </button>

        {quizFinished ? (
          <div className="iq-quiz-score-display">
            <div className="iq-quiz-score-box">
              <h3>Quiz Completed!</h3>
              <p>Your Total Score: <strong>{totalScore}/12</strong></p>
            </div>
          </div>
        ) : (
          <div className={`iq-quiz-card ${isFlipping ? "flipping" : ""}`}>
            <div className="iq-quiz-timer">Time Left: {timer}s</div> {/* Timer display */}
            <h2>Question {currentQuestion + 1}</h2>
            <p>{questions[currentQuestion].questionText}</p>
            {questions[currentQuestion].image && (
              <img
                src={questions[currentQuestion].image}
                alt="Question Visual"
                className="iq-quiz-question-image"
              />
            )}
            <div className="iq-quiz-options">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`iq-quiz-option ${selectedAnswer === index ? "iq-quiz-option-selected" : ""}`}
                  onClick={() => handleAnswer(index)}
                >
                  <img src={option.src} alt={option.label} className="iq-quiz-option-image" />
                </div>
              ))}
            </div>

            <div className="iq-quiz-navigation">
              <button
                className="iq-quiz-nav-btn"
                onClick={handlePrevious}
                disabled={isFirstQuestion}
              >
                Previous
              </button>
              {isLastQuestion ? (
                <button
                  className="iq-quiz-submit-btn"
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="iq-quiz-nav-btn"
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;