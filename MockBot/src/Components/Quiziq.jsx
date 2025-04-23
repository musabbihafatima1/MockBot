
// import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import "./IQquiz.css";

// function Quiz({ questions }) {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isFlipping, setIsFlipping] = useState(false);
//   const [totalScore, setTotalScore] = useState(0);
//   const [quizFinished, setQuizFinished] = useState(false);
//   const [timer, setTimer] = useState(60); // Timer state
//   const navigate = useNavigate();

//   // Timer logic
//   useEffect(() => {
//     if (!quizFinished && timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     }

//     if (timer === 0 && !quizFinished) {
//       handleSubmit(); // Submit the quiz when the timer runs out
//     }
//   }, [timer, quizFinished]);

//   const handleAnswer = (index) => setSelectedAnswer(index);

//   const handleNext = () => {
//     if (selectedAnswer !== null) {
//       // Add 1 to totalScore if the answer is correct
//       if (selectedAnswer === questions[currentQuestion].correctAnswer) {
//         setTotalScore((prev) => prev + 1);
//       }
//     }

//     setIsFlipping(true);
//     setTimeout(() => {
//       setSelectedAnswer(null);
//       setCurrentQuestion((prev) => prev + 1);
//       setIsFlipping(false);
//     }, 600);
//   };

//   const handlePrevious = () => {
//     setIsFlipping(true);
//     setTimeout(() => {
//       setSelectedAnswer(null);
//       setCurrentQuestion((prev) => prev - 1);
//       setIsFlipping(false);
//     }, 600);
//   };

//   const saveScore = async (score) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:5000/api/auth/saveIqscore", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ score }),
//       });
//       const data = await response.json();
//       alert(data.message);
//     } catch (error) {
//       console.error("Error saving score:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     // Save the score to the backend
//     saveScore(totalScore);
//     setQuizFinished(true);
//   };

//   const isLastQuestion = currentQuestion === questions.length - 1;
//   const isFirstQuestion = currentQuestion === 0;

//   return (
//     <div className="iq-bgiq">
//       <div className="iq-quiz-container">
//         <button className="iq-quiz-back-arrow" onClick={() => navigate("/Userpage")}>
//           ←
//         </button>

//         {quizFinished ? (
//           <div className="iq-quiz-score-display">
//             <div className="iq-quiz-score-box">
//               <h3>Quiz Completed!</h3>
//               <p>Your Total Score: <strong>{totalScore}/12</strong></p>
//             </div>
//           </div>
//         ) : (
//           <div className={`iq-quiz-card ${isFlipping ? "flipping" : ""}`}>
//             <div className="iq-quiz-timer">Time Left: {timer}s</div> {/* Timer display */}
//             <h2>Question {currentQuestion + 1}</h2>
//             <p>{questions[currentQuestion].questionText}</p>
//             {questions[currentQuestion].image && (
//               <img
//                 src={questions[currentQuestion].image}
//                 alt="Question Visual"
//                 className="iq-quiz-question-image"
//               />
//             )}
//             <div className="iq-quiz-options">
//               {questions[currentQuestion].options.map((option, index) => (
//                 <div
//                   key={index}
//                   className={`iq-quiz-option ${selectedAnswer === index ? "iq-quiz-option-selected" : ""}`}
//                   onClick={() => handleAnswer(index)}
//                 >
//                   <img src={option.src} alt={option.label} className="iq-quiz-option-image" />
//                 </div>
//               ))}
//             </div>

//             <div className="iq-quiz-navigation">
//               <button
//                 className="iq-quiz-nav-btn"
//                 onClick={handlePrevious}
//                 disabled={isFirstQuestion}
//               >
//                 Previous
//               </button>
//               {isLastQuestion ? (
//                 <button
//                   className="iq-quiz-submit-btn"
//                   onClick={handleSubmit}
//                   disabled={selectedAnswer === null}
//                 >
//                   Submit
//                 </button>
//               ) : (
//                 <button
//                   className="iq-quiz-nav-btn"
//                   onClick={handleNext}
//                   disabled={selectedAnswer === null}
//                 >
//                   Next
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Quiz;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Baro from "../Components/baro";
import clickSound from "../Assets/click.mp3";

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
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    if (timer === 0 && !quizFinished) {
      handleSubmit();
    }
  }, [timer, quizFinished]);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    clickAudio.play();
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === shuffledQuestions[currentQuestion].correctAnswer;
      if (isCorrect) setTotalScore((prev) => prev + 1);
      setUserAnswers((prev) => [
        ...prev,
        {
          question: shuffledQuestions[currentQuestion].questionText,
          selected: selectedAnswer,
          correct: shuffledQuestions[currentQuestion].correctAnswer,
          options: shuffledQuestions[currentQuestion].options,
        },
      ]);
    }
    setSelectedAnswer(null);
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setSelectedAnswer(null);
    setCurrentQuestion((prev) => prev - 1);
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
    await saveScore(totalScore);
    setQuizFinished(true);
  
    navigate("/scoreboard", {
      state: {
        correct: totalScore,
        totalQuestions: shuffledQuestions.length,
        userAnswers: [
          ...userAnswers,
          {
            question: shuffledQuestions[currentQuestion].questionText,
            selected: selectedAnswer,
            correct: shuffledQuestions[currentQuestion].correctAnswer,
            options: shuffledQuestions[currentQuestion].options,
          },
        ],
        quizType: "iq", 
      },
    });
  };
  

  const isLastQuestion = currentQuestion === shuffledQuestions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  return (
    <div
      style={{
        margin: 0,
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100vh" }}>
        <Baro
          questions={shuffledQuestions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            style={{
              width: "700px",
              minHeight: "620px",
              borderRadius: "8px",
              backgroundColor: "#5D009F",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
              padding: "20px",
              marginTop:"80px",
              marginLeft:'100px',
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Timer */}
            <div
              style={{
                backgroundColor: "#212832",
                color: "yellow",
                fontSize: "1.2rem",
                padding: "12px",
                borderRadius: "50px 50px 0 0",
                textAlign: "center",
                width: "100px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "-5px",
              }}
            >
              {timer}s
            </div>

            {/* Question */}
            <div
              style={{
                backgroundColor: "#2a2132",
                color: "#fff",
                padding: "15px",
                fontSize: "1.2rem",
                fontWeight: "600",
                borderRadius: "8px",
                textAlign: "center",
                width: "100%",
                marginBottom: "15px",
                minHeight: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {shuffledQuestions[currentQuestion]?.questionText}
            </div>

            {/* Image */}
            {shuffledQuestions[currentQuestion]?.image && (
              <img
                src={shuffledQuestions[currentQuestion].image}
                alt="Visual"
                style={{
                  maxWidth: "200px",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "15px",
                }}
              />
            )}

            {/* Options */}
            <div
              style={{
                margin: "20px 0",
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              {shuffledQuestions[currentQuestion]?.options.map((option, index) => (
                <motion.div
                  key={index}
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #7A70ED",
                    padding: "10px",
                    borderRadius: "12px",
                    textAlign: "center",
                    color: "#000",
                    cursor: "pointer",
                    flex: "0 0 calc(50% - 10px)",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ...(selectedAnswer === index && {
                      backgroundColor: "#dae90bb5",
                      color: "#000",
                    }),
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(index)}
                >
                  <img
                    src={option.src}
                    alt={option.label}
                    style={{ maxWidth: "50px", margin: "0 10px" }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <motion.button
                style={{
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  backgroundColor: "#7A70ED",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  height: "60px",
                  width: "80px",
                  ...(isFirstQuestion && {
                    opacity: 0.5,
                    pointerEvents: "none",
                  }),
                }}
                onClick={handlePrevious}
                disabled={isFirstQuestion}
                whileTap={{ scale: 0.9 }}
              >
                Prev
              </motion.button>

              {isLastQuestion ? (
                <motion.button
                  style={{
                    padding: "12px 24px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    backgroundColor: "#7A70ED",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    height: "60px",
                    width: "100px",
                    ...(selectedAnswer === null && {
                      opacity: 0.5,
                      pointerEvents: "none",
                    }),
                  }}
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  whileTap={{ scale: 0.9 }}
                >
                  Submit
                </motion.button>
              ) : (
                <motion.button
                  style={{
                    padding: "12px 24px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    backgroundColor: "#7A70ED",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    height: "60px",
                    width: "80px",
                    ...(selectedAnswer === null && {
                      opacity: 0.5,
                      pointerEvents: "none",
                    }),
                  }}
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  whileTap={{ scale: 0.9 }}
                >
                  Next
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
