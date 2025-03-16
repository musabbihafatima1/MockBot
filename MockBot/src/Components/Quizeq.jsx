/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './IQquiz.css';

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

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
      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const handleAnswer = (option) => setSelectedAnswer(option);

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
      setTotalScore((prevScore) => prevScore + score);
    }
    setIsFlipping(true);
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentQuestion((prev) => prev + 1);
      setIsFlipping(false);
    }, 600);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      const score = getScore(selectedAnswer);
      setTotalScore((prevScore) => {
        const finalScore = prevScore + score;

        saveScore(finalScore);
        return finalScore;
      });
    }
    setQuizFinished(true);
  };

  const isLastQuestion = currentQuestion === questions.length - 1;

  const getResult = () => {
    if (totalScore >= 130) return 'High Emotional Intelligence';
    if (totalScore >= 95) return 'Moderate Emotional Intelligence';
    return 'Low Emotional Intelligence';
  };

  return (
    <div className="quiz-containerr">
      <button className="back-arroww" onClick={() => navigate('/Userpage')}>
        ←
      </button>

      <div className={`cardit ${isFlipping ? 'flip' : ''}`}>
        {!quizFinished ? (
          <>
            <div className="timerdo">
              <p className="quiz-timerr">Time Left: {timer}s</p>
            </div>

            <h2>Question {currentQuestion + 1}</h2>
            <p className="questionred">{questions[currentQuestion].questionText}</p>
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`option ${selectedAnswer === option ? 'selected' : ''}`}>
                  {option}
                </button>
              ))}
            </div>
            {isLastQuestion ? (
              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={!selectedAnswer}>
                Submit
              </button>
            ) : (
              <button
                className="next-btn"
                onClick={handleNext}
                disabled={!selectedAnswer}>
                Next Question
              </button>
            )}
          </>
        ) : (
          <div className="score-display">
            <div className="score-box">
              <h3>Quiz Completed!</h3>
              <p className="total-scores">
                Your Total Score: <strong>{totalScore}</strong> <br />
                Status: <strong>{getResult()}</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './IQquiz.css';

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

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
      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const handleAnswer = (option) => setSelectedAnswer(option);

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
      setTotalScore((prevScore) => prevScore + score);
    }
    setIsFlipping(true);
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentQuestion((prev) => prev + 1);
      setIsFlipping(false);
    }, 600);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      const score = getScore(selectedAnswer);
      setTotalScore((prevScore) => {
        const finalScore = prevScore + score;

        saveScore(finalScore);
        return finalScore;
      });
    }
    setQuizFinished(true);
  };

  const isLastQuestion = currentQuestion === questions.length - 1;

  const getResult = () => {
    if (totalScore >= 130) return 'High Emotional Intelligence';
    if (totalScore >= 95) return 'Moderate Emotional Intelligence';
    return 'Low Emotional Intelligence';
  };

  return (
    <div className="eq-quiz-special">
      <button className="eq-back-arroww" onClick={() => navigate('/Userpage')}>
        ←
      </button>

      <div className={`eq-cardit ${isFlipping ? 'flip' : ''}`}>
        {!quizFinished ? (
          <>
            <div className="eq-timerdo">
              <p className="eq-quiz-timerr">Time Left: {timer}s</p>
            </div>

            <h2>Question {currentQuestion + 1}</h2>
            <p className="eq-questionred">{questions[currentQuestion].questionText}</p>
            <div className="eq-options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`eq-option ${selectedAnswer === option ? 'selected' : ''}`}>
                  {option}
                </button>
              ))}
            </div>
            {isLastQuestion ? (
              <button
                className="eq-submit-btn"
                onClick={handleSubmit}
                disabled={!selectedAnswer}>
                Submit
              </button>
            ) : (
              <button
                className="eq-next-btn"
                onClick={handleNext}
                disabled={!selectedAnswer}>
                Next Question
              </button>
            )}
          </>
        ) : (
          <div className="eq-score-display">
            <div className="eq-score-box">
              <h3>Quiz Completed!</h3>
              <p className="eq-total-scores">
                Your Total Score: <strong>{totalScore}</strong> <br />
                Status: <strong>{getResult()}</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;