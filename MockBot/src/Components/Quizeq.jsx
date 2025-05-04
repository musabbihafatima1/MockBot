import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import Baro from '../Components/baro';
import clickSound from '../Assets/click.mp3';

function Quiz({ questions }) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(2100);
  const navigate = useNavigate();

  const clickAudio = new Audio(clickSound);

  useEffect(() => {
    clickAudio.load();
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, [questions]);

  useEffect(() => {
    if (!quizFinished && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0 && !quizFinished) handleSubmit();
  }, [timer, quizFinished]);

  const saveScore = async (score) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/saveEqscore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score }),
      });

      const data = await response.json();
      if (!response.ok) console.error(data.message);
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const handleAnswer = (option) => {
    clickAudio.play();
    setSelectedAnswer(option);
  };

  const getScore = (answer) => {
    const scoreMapping = {
      'Strongly disagree': 1,
      Disagree: 2,
      Neutral: 3,
      Agree: 4,
      'Strongly Agree': 5,
    };
    return scoreMapping[answer] || 0;
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const score = getScore(selectedAnswer);
      setTotalScore((prev) => prev + score);
      setUserAnswers((prev) => [
        ...prev,
        {
          question: shuffledQuestions[currentQuestion].questionText,
          selected: selectedAnswer,
          options: shuffledQuestions[currentQuestion].options,
        },
      ]);
      setSelectedAnswer(null);
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => prev - 1);
    const lastAnswer = userAnswers[currentQuestion - 1];
    setSelectedAnswer(lastAnswer?.selected || null);
  };

  const handleSubmit = useCallback(() => {
    if (!quizFinished) {
      let finalScore = totalScore;
      const updatedUserAnswers = [...userAnswers];
      
      if (selectedAnswer) {
        const score = getScore(selectedAnswer);
        finalScore += score;
        updatedUserAnswers.push({
          question: shuffledQuestions[currentQuestion].questionText,
          selected: selectedAnswer,
          options: shuffledQuestions[currentQuestion].options,
        });
      }

      saveScore(finalScore);
      setQuizFinished(true);

      navigate('/scoreboard', {
        state: {
          correct: finalScore,
          totalQuestions: shuffledQuestions.length,
          userAnswers: updatedUserAnswers,
          quizType: 'eq',
        },
      });
    }
  }, [quizFinished, totalScore, userAnswers, selectedAnswer, currentQuestion, shuffledQuestions, navigate]);

  // Prevent tab switching and submit on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !quizFinished) {
        handleSubmit();
      }
    };

    const handleBeforeUnload = (e) => {
      if (!quizFinished) {
        e.preventDefault();
        handleSubmit();
        return '';
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleSubmit, quizFinished]);

  const isLastQuestion = currentQuestion === shuffledQuestions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  if (shuffledQuestions.length === 0) return <div>Loading...</div>;

  return (
    <div className="quiz-container">
      <Navbar timer={timer}/>
      <div className="quiz-content">
        <Baro
          questions={shuffledQuestions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />

        <motion.div
          className="quiz-card"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="question">
            {shuffledQuestions[currentQuestion].questionText}
          </div>

          <div className="options">
            {shuffledQuestions[currentQuestion].options.map((option, index) => (
              <motion.div
                key={index}
                className={`option ${selectedAnswer === option ? 'selected' : ''}`}
                onClick={() => handleAnswer(option)}
                whileHover={{ scale: 1.02 }}
              >
                {option}
              </motion.div>
            ))}
          </div>

          <div className="navigation">
            <motion.button
              className="nav-btn"
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              whileTap={{ scale: 0.9 }}
            >
              Prev
            </motion.button>

            {isLastQuestion ? (
              <motion.button
                className="nav-btn submit-btn"
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
              >
                Submit
              </motion.button>
            ) : (
              <motion.button
                className="nav-btn"
                onClick={handleNext}
                disabled={!selectedAnswer}
                whileTap={{ scale: 0.9 }}
              >
                Next
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .quiz-container {
          background-color: #ece8ee;
          min-height: 100vh;
          display: flex;
          margin-top:10px;
          flex-direction: column;
          align-items: center;
          overflow-x: hidden;
          position: relative;
          font-family: 'Poppins', sans-serif;
        }

        .quiz-content {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          padding-top: 85px;
          padding-left: 90px;
          position: relative;
          gap: 20px;
        }

        .quiz-card {
          width: 100%;
          max-width: 550px;
          background-color: #ffffff;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          padding: 25px;
          margin-left: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          min-height: 380px;
        }

        .question {
          margin-top: 5px;
          font-size: 1.25rem;
          font-weight: 600;
          color: #333;
          text-align: center;
          margin-bottom: 20px;
          padding: 0 10px;
          word-break: break-word;
        }

        .options {
          width: 100%;
          margin-top: 10px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .option {
          background-color: #f0f0f0;
          
          border-radius: 12px;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s;
          min-height: 60px;
          text-align: center;
          font-size: 0.95rem;
        }

        .option:hover {
          background-color: #d6c8f7;
        }

        .option.selected {
          background-color: #d6c8f7;
          color: #000;
          font-weight: bold;
        }

        .navigation {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 20px;
        }

        .nav-btn {
          background: #7A70ED;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: background 0.3s;
        }

        .nav-btn:hover {
          background: #5D009F;
        }

        .nav-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .submit-btn {
          background: #4CAF50;
        }

        .submit-btn:hover {
          background: #3e8e41;
        }

        @media (max-width: 768px) {
          .quiz-content {
            padding-left: 0;
            flex-direction: column;
            align-items: center;
          }

          .quiz-card {
            max-width: 90%;
            margin-left: 0;
            margin-top: 20px;
          }

          .options {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .quiz-card {
            max-width: 95%;
            min-height: 340px;
            padding: 18px;
          }

          .question {
            font-size: 1rem;
          }

          .option {
            font-size: 0.85rem;
            padding: 8px 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default Quiz;