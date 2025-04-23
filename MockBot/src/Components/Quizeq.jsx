// import React, { useState, useEffect } from 'react';


// import { useNavigate } from 'react-router-dom';
// import './IQquiz.css';

// function Quiz({ questions }) {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isFlipping, setIsFlipping] = useState(false);
//   const [totalScore, setTotalScore] = useState(0);
//   const [quizFinished, setQuizFinished] = useState(false);
//   const [timer, setTimer] = useState(60);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!quizFinished && timer > 0) {
//       const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//       return () => clearInterval(interval);
//     }
//     if (timer === 0 && !quizFinished) handleSubmit();
//   }, [timer, quizFinished]);

//   const saveScore = async (score) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/auth/saveEqscore', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ score }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         console.log(data.message);
//       } else {
//         console.error(data.message);
//       }
//     } catch (error) {
//       console.error('Error saving score:', error);
//     }
//   };

//   const handleAnswer = (option) => setSelectedAnswer(option);

//   const getScore = (answer) => {
//     const scoreMapping = {
//       'Strongly disagree': 1,
//       Disagree: 2,
//       Neutral: 3,
//       Agree: 4,
//       'Strongly Agree': 5,
//     };
//     return scoreMapping[answer] || 0;
//   };

//   const handleNext = () => {
//     if (selectedAnswer) {
//       const score = getScore(selectedAnswer);
//       setTotalScore((prevScore) => prevScore + score);
//     }
//     setIsFlipping(true);
//     setTimeout(() => {
//       setSelectedAnswer(null);
//       setCurrentQuestion((prev) => prev + 1);
//       setIsFlipping(false);
//     }, 600);
//   };

//   const handleSubmit = () => {
//     if (selectedAnswer) {
//       const score = getScore(selectedAnswer);
//       setTotalScore((prevScore) => {
//         const finalScore = prevScore + score;

//         saveScore(finalScore);
//         return finalScore;
//       });
//     }
//     setQuizFinished(true);
//   };

//   const isLastQuestion = currentQuestion === questions.length - 1;

//   const getResult = () => {
//     if (totalScore >= 130) return 'High Emotional Intelligence';
//     if (totalScore >= 95) return 'Moderate Emotional Intelligence';
//     return 'Low Emotional Intelligence';
//   };

//   return (
//     <div className="eq-quiz-special">
//       <button className="eq-back-arroww" onClick={() => navigate('/Userpage')}>
//         ←
//       </button>

//       <div className={`eq-cardit ${isFlipping ? 'flip' : ''}`}>
//         {!quizFinished ? (
//           <>
//             <div className="eq-timerdo">
//               <p className="eq-quiz-timerr">Time Left: {timer}s</p>
//             </div>

//             <h2>Question {currentQuestion + 1}</h2>
//             <p className="eq-questionred">{questions[currentQuestion].questionText}</p>
//             <div className="eq-options">
//               {questions[currentQuestion].options.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleAnswer(option)}
//                   className={`eq-option ${selectedAnswer === option ? 'selected' : ''}`}>
//                   {option}
//                 </button>
//               ))}
//             </div>
//             {isLastQuestion ? (
//               <button
//                 className="eq-submit-btn"
//                 onClick={handleSubmit}
//                 disabled={!selectedAnswer}>
//                 Submit
//               </button>
//             ) : (
//               <button
//                 className="eq-next-btn"
//                 onClick={handleNext}
//                 disabled={!selectedAnswer}>
//                 Next Question
//               </button>
//             )}
//           </>
//         ) : (
//           <div className="eq-score-display">
//             <div className="eq-score-box">
//               <h3>Quiz Completed!</h3>
//               <p className="eq-total-scores">
//                 Your Total Score: <strong>{totalScore}</strong> <br />
//                 Status: <strong>{getResult()}</strong>
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Quiz;

import React, { useState, useEffect } from 'react';
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
  const [timer, setTimer] = useState(60);
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

  const handleSubmit = () => {
    if (selectedAnswer) {
      const score = getScore(selectedAnswer);
      const finalScore = totalScore + score;

      saveScore(finalScore);
      const updatedUserAnswers = [
        ...userAnswers,
        {
          question: shuffledQuestions[currentQuestion].questionText,
          selected: selectedAnswer,
          options: shuffledQuestions[currentQuestion].options,
        },
      ];

      setUserAnswers(updatedUserAnswers);
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
  };

  const isLastQuestion = currentQuestion === shuffledQuestions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  if (shuffledQuestions.length === 0) return <div>Loading...</div>;

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <div style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px'
      }}>
        <Baro
          questions={shuffledQuestions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop:'120px',
            marginLeft:'80px',
            width: '100%',
            maxWidth: '500px',
            borderRadius: '12px',
            backgroundColor: '#5D009F',
            padding: '20px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{
            backgroundColor: '#212832',
            color: 'yellow',
            fontSize: '1.1rem',
            padding: '10px',
            borderRadius: '50px 50px 0 0',
            width: '80px',
            textAlign: 'center',
            marginBottom: '-5px'
          }}>
            {timer}s
          </div>

          <div style={{
            backgroundColor: '#2a2132',
            color: '#fff',
            padding: '15px',
            fontSize: '1.2rem',
            fontWeight: '600',
            borderRadius: '8px',
            textAlign: 'center',
            width: '100%',
            marginBottom: '20px',
            minHeight: '60px'
          }}>
            {shuffledQuestions[currentQuestion].questionText}
          </div>

          {/* Options in two columns */}
          <div style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '10px'
          }}>
            {shuffledQuestions[currentQuestion].options.map((option, index) => (
              <motion.div
                key={index}
                style={{
                  flex: '0 0 48%',
                  backgroundColor: selectedAnswer === option ? '#b399d4' : '#ffffff',
                  border: '1px solid #7A70ED',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  color: selectedAnswer === option ? '#000' : '#333',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box'
                }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: '#e6e6e6'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </motion.div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 'auto',
            marginTop: '20px'
          }}>
            <motion.button
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              whileTap={{ scale: 0.9 }}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 'bold',
                borderRadius: '5px',
                backgroundColor: '#7A70ED',
                color: 'white',
                border: 'none',
                cursor: isFirstQuestion ? 'not-allowed' : 'pointer',
                opacity: isFirstQuestion ? 0.5 : 1,
                width: '80px'
              }}
            >
              Prev
            </motion.button>

            {isLastQuestion ? (
              <motion.button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                whileTap={{ scale: 0.9 }}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                  backgroundColor: '#7A70ED',
                  color: 'white',
                  border: 'none',
                  cursor: selectedAnswer ? 'pointer' : 'not-allowed',
                  opacity: selectedAnswer ? 1 : 0.5,
                  width: '100px'
                }}
              >
                Submit
              </motion.button>
            ) : (
              <motion.button
                onClick={handleNext}
                disabled={!selectedAnswer}
                whileTap={{ scale: 0.9 }}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                  backgroundColor: '#7A70ED',
                  color: 'white',
                  border: 'none',
                  cursor: selectedAnswer ? 'pointer' : 'not-allowed',
                  opacity: selectedAnswer ? 1 : 0.5,
                  width: '80px'
                }}
              >
                Next
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Quiz;
