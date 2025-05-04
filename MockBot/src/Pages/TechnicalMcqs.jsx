// import React, { useState, useEffect, useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "axios";
// import Navbar from "../Components/Navbar";
// import Baro from "../Components/baro";

// const TechnicalMcqs = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const fieldName = location.state?.fieldName || "General Knowledge";
//   const token = localStorage.getItem("token");

//   const [state, setState] = useState({
//     loading: true,
//     error: null,
//     questions: [],
//     currentQuestion: 0,
//     selectedOption: null,
//     answers: {},
//     timer: 27000, 
//     isSubmitted: false,
//     aiModel: null
//   });

//   const parseMCQs = (rawData) => {
//     try {
//       if (!rawData) return [];
      
//       if (Array.isArray(rawData)) {
//         return rawData.map(q => ({
//           question: q.question,
//           options: q.options,
//           correct: typeof q.correctAnswer === 'number' 
//             ? q.correctAnswer 
//             : (q.correctAnswer || -1)
//         }));
//       }
      
//       const questionBlocks = rawData.split(/(Q\d+\.)/g);
//       const questions = [];
      
//       for (let i = 1; i < questionBlocks.length; i += 2) {
//         try {
//           const block = questionBlocks[i] + questionBlocks[i + 1];
//           const lines = block.split('\n').map(l => l.trim()).filter(l => l);
          
//           const question = {
//             question: lines[0].replace(/^Q\d+\.\s*/, ''),
//             options: [],
//             correct: -1
//           };

//           lines.slice(1).forEach(line => {
//             if (/^[A-D]\)/.test(line)) {
//               question.options.push(line.replace(/^[A-D]\)\s*/, ''));
//             }
//             if (line.startsWith('Correct Answer:')) {
//               const answer = line.split(': ')[1].trim().toUpperCase();
//               question.correct = answer.charCodeAt(0) - 'A'.charCodeAt(0);
//             }
//           });

//           if (question.options.length === 4 && question.correct >= 0) {
//             questions.push(question);
//           }
//         } catch (e) {
//           console.error('Error parsing block:', e);
//         }
//       }
//       return questions;
//     } catch (e) {
//       console.error("Parsing error:", e);
//       return [];
//     }
//   };

//   const getFallbackQuestions = (topic) => {
//     return [
//       {
//         question: `What is the primary focus of ${topic}?`,
//         options: [
//           "Core concepts",
//           "Basic principles",
//           "Fundamental theories",
//           "All of the above"
//         ],
//         correct: 3
//       },
//       {
//         question: `Which tool is NOT typically used in ${topic}?`,
//         options: [
//           "Standard toolkit",
//           "Specialized software",
//           "Unrelated technology",
//           "Common frameworks"
//         ],
//         correct: 2
//       }
//     ];
//   };

//   const fetchQuestions = async () => {
//     setState(prev => ({ ...prev, loading: true, error: null }));
    
//     try {
//       const response = await axios.post('http://localhost:5000/api/generate-mcqs', 
//         { 
//           topic: fieldName,
//           count: 50
//         },
//         { timeout: 150000 }
//       );

//       const parsedQuestions = parseMCQs(response.data.questions);
      
//       setState({
//         loading: false,
//         questions: parsedQuestions.length > 0 ? parsedQuestions : getFallbackQuestions(fieldName),
//         currentQuestion: 0,
//         selectedOption: null,
//         answers: {},
//         timer: 2700,
//         isSubmitted: false,
//         aiModel: response.data.model || 'fallback',
//         error: parsedQuestions.length === 0 ? 'No valid questions generated' : null
//       });

//     } catch (error) {
//       console.error('Failed to load questions:', error);
      
//       setState({
//         loading: false,
//         error: 'AI service unavailable - using fallback questions',
//         questions: getFallbackQuestions(fieldName),
//         aiModel: 'fallback',
//         currentQuestion: 0,
//         selectedOption: null,
//         answers: {},
//         timer: 2700,
//         isSubmitted: false
//       });
//     }
//   };


//   useEffect(() => {
//     fetchQuestions();
//   }, [fieldName]);


//   useEffect(() => {
//     if (state.loading || state.isSubmitted) return;

//     const interval = setInterval(() => {
//       setState(prev => ({
//         ...prev,
//         timer: prev.timer > 0 ? prev.timer - 1 : 0
//       }));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [state.loading, state.isSubmitted]);



//   const submitTestResults = useCallback(async () => {
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/auth/saveTechnicalScore',
//         {
//           topic: fieldName,
//           answers: state.answers,
//           correctAnswers: state.questions.map(q => q.correct),
//           timeTaken: 2700 - state.timer
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//           }
//         }
//       );

//       if (!response.data.success) {
//         console.error("Failed to submit test results:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error submitting test results:", error);
//     }
//   }, [fieldName, state.answers, state.questions, token, state.timer]);


//   //saving the technical questions function
//   const saveTechnicalQuestions = useCallback(async () => {
//     try {
//       await axios.post('http://localhost:5000/api/save-technical-questions', {
//         topic: fieldName,
//         questions: state.questions,
//         model: state.aiModel
//       });
//     } catch (error) {
//       console.error('Failed to save questions:', error);
//     }
//   }, [fieldName, state.questions, state.aiModel]);



//   const handleSubmit = useCallback(() => {
//     if (state.isSubmitted) return;

//     try {
//       saveTechnicalQuestions();
      
//     } catch (error) {
//       console.error('Submission error:', error);
//     }

//     const correctCount = state.questions.reduce((count, question, index) => {
//       const userAnswer = state.answers[index];
//       return userAnswer !== undefined && userAnswer === question.correct 
//         ? count + 1 
//         : count;
//     }, 0);

//     submitTestResults();

    
    
    
//     navigate("/scoreboard", {
//       state: {
//         correct: correctCount,
//         total: state.questions.length,
//         topic: fieldName,
//         quizType: "technical"
//       }
//     });

//     setState(prev => ({ ...prev, isSubmitted: true }));
//   }, [state.isSubmitted, state.questions, state.answers, fieldName, navigate, submitTestResults]);

//   useEffect(() => {
//     if (state.timer === 0 && !state.isSubmitted) {
//       handleSubmit();
//     }
//   }, [state.timer, state.isSubmitted, handleSubmit]);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'hidden' && !state.isSubmitted) {
//         handleSubmit();
//       }
//     };

//     const handleBeforeUnload = (e) => {
//       if (!state.isSubmitted) {
//         e.preventDefault();
//         handleSubmit();
//         return '';
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, [state.isSubmitted, handleSubmit]);

//   const handleOptionSelect = (optionIndex) => {
//     setState(prev => ({
//       ...prev,
//       selectedOption: optionIndex,
//       answers: { ...prev.answers, [prev.currentQuestion]: optionIndex }
//     }));
//   };

//   const handleNavigation = (direction) => {
//     setState(prev => {
//       const newIndex = direction === 'next' 
//         ? Math.min(prev.currentQuestion + 1, prev.questions.length - 1)
//         : Math.max(prev.currentQuestion - 1, 0);
      
//       return {
//         ...prev,
//         currentQuestion: newIndex,
//         selectedOption: prev.answers[newIndex] ?? null
//       };
//     });
//   };

//   if (state.loading) {
//     return (
//       <div style={{
//         position: "fixed",
//         inset: 0,
//         display: "flex",
//         flexDirection: 'column', 
//         gap: '16px',
//         justifyContent: "center",
//         alignItems: "center",
//         background: "white",
//         zIndex: 9999,
//       }}>
//         <div style={{
//           background: "linear-gradient(145deg, black, #5D009F)",
//           borderRadius: "50%",
//           width: "90px",
//           height: "90px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           animation: "spin 1.5s linear infinite",
//           boxShadow: "0 0 10px rgba(93, 0, 159, 0.3)",
//         }}>
//           <div style={{
//             fontSize: "15px",
//             fontWeight: "bold",
//             color: "white",
//             textTransform: "uppercase",
//             letterSpacing: "1px",
//           }}>
//             MockBot
//           </div>
//         </div>
//         <p>Preparing Test for {fieldName}</p>
//         <style>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   if (state.error && state.questions.length === 0) {
//     return (
//       <div className="error-container">
//         <h2>⚠️ Generation Failed</h2>
//         <p>{state.error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           className="retry-btn"
//         >
//           Retry
//         </button>
//         <style jsx>{`
//           .error-container {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             height: 100vh;
//             background: #ece8ee;
//             font-family: Poppins, sans-serif;
//           }
//           .retry-btn {
//             padding: 12px 24px;
//             background: #5D009F;
//             color: white;
//             border: none;
//             border-radius: 5px;
//             cursor: pointer;
//             font-size: 16px;
//             margin-top: 20px;
//           }
//         `}</style>
//       </div>
//     );
//   }

//   const currentQ = state.questions[state.currentQuestion];

//   return (
//     <div className="quiz-container">
//       <Navbar timer={state.timer} />

//       <div className="quiz-content">
//         <Baro
//           questions={state.questions}
//           currentQuestion={state.currentQuestion}
//           setCurrentQuestion={(index) => {
//             setState(prev => ({
//               ...prev,
//               currentQuestion: index,
//               selectedOption: prev.answers[index] ?? null
//             }));
//           }}
//         />

//         <motion.div
//           className="quiz-card"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
          

//           {/* Replace the model indicator code with this */}
// <div className="difficulty-indicator">
//   {state.currentQuestion < 10 ? (
//     <span style={{ color: '#4CAF50' }}>Level: Easy</span>
//   ) : state.currentQuestion < 25 ? (
//     <span style={{ color: '#FF9800' }}>Level: Medium</span>
//   ) : (
//     <span style={{ color: '#F44336' }}>Level: Difficult</span>
//   )}
// </div>

//           {currentQ && (
//             <div className="question">{currentQ.question}</div>
//           )}

//           <div className="options">
//             {currentQ?.options?.map((option, index) => (
//               <motion.div
//                 key={index}
//                 className={`option ${state.selectedOption === index ? 'selected' : ''}`}
//                 onClick={() => handleOptionSelect(index)}
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <span className="option-letter">{String.fromCharCode(65 + index)}</span>
//                 {option}
//               </motion.div>
//             ))}
//           </div>

//           <div className="navigation">
//             <motion.button
//               className="nav-btn"
//               onClick={() => handleNavigation('prev')}
//               disabled={state.currentQuestion === 0 || state.isSubmitted}
//               whileTap={{ scale: 0.9 }}
//             >
//               Prev
//             </motion.button>

//             {state.currentQuestion < state.questions.length - 1 ? (
//               <motion.button
//                 className="nav-btn"
//                 onClick={() => handleNavigation('next')}
//                 disabled={state.isSubmitted}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 Next
//               </motion.button>
//             ) : (
//               <motion.button
//                 className="nav-btn submit-btn"
//                 onClick={handleSubmit}
//                 disabled={state.isSubmitted}
//                 whileTap={{ scale: 0.9 }}
//                 whileHover={{ scale: 1.05 }}
//               >
//                 Submit
//               </motion.button>
//             )}
//           </div>
//         </motion.div>
//       </div>

//       <style jsx>{`
//         .quiz-container {
//           background-color: #ece8ee;
//           min-height: 100vh;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           overflow-x: hidden;
//           position: relative;
//           font-family: 'Poppins', sans-serif;
//         }
//         .quiz-content {
//           display: flex;
//           justify-content: center;
//           align-items: flex-start;
//           width: 100%;
//           padding-top: 85px;
//           padding-left: 90px;
//           position: relative;
//           gap: 20px;
//         }
//         .quiz-card {
//           width: 100%;
//           max-width: 650px;
//           background-color: #ffffff;
//           border-radius: 20px;
//           box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
//           padding: 25px;
//           margin-left: 100px;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           position: relative;
//           min-height: 380px;
//         }
       
//         .difficulty-indicator {
          
//             position: absolute;
//             top: 15px;
//             center: 0px;
//             padding: 5px 10px;
//             border-radius: 12px;
//             font-size: 0.8rem;
//             font-weight: bold;
//             background: rgba(0,0,0,0.1);

//         }
//         .question {
//           margin-top: 50px;
//           font-size: 1.25rem;
//           font-weight: 600;
//           color: #333;
//           text-align: center;
//           margin-bottom: 20px;
//           padding: 0 10px;
//           word-break: break-word;
//         }
//         .options {
//           width: 100%;
//           margin-top: 10px;
//         }
//         .option {
//           background-color: #f0f0f0;
//           margin: 8px 0;
//           padding: 10px 16px;
//           border-radius: 12px;
//           color: #333;
//           display: flex;
//           align-items: center;
//           cursor: pointer;
//           transition: background 0.3s;
//         }
//         .option:hover {
//           background-color: #d6c8f7;
//         }
//         .option.selected {
//           background-color: #d6c8f7;
//           color: #000;
//           font-weight: bold;
//         }
//         .option-letter {
//           background: #7A70ED;
//           color: white;
//           padding: 6px 12px;
//           border-radius: 50%;
//           margin-right: 12px;
//           font-weight: bold;
//           font-size: 14px;
//         }
//         .navigation {
//           display: flex;
//           justify-content: space-between;
//           width: 100%;
//           margin-top: 20px;
//         }
//         .nav-btn {
//           background: #7A70ED;
//           color: white;
//           border: none;
//           padding: 10px 20px;
//           border-radius: 8px;
//           cursor: pointer;
//           font-size: 14px;
//           font-weight: 600;
//           transition: background 0.3s;
//         }
//         .nav-btn:hover {
//           background: #5D009F;
//         }
//         .nav-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }
//         .submit-btn {
//           background: #4CAF50;
//         }
//         .submit-btn:hover {
//           background: #3e8e41;
//         }

//         @media (max-width: 768px) {
//           .quiz-content {
//             padding-left: 0;
//             flex-direction: column;
//             align-items: center;
//           }
//           .quiz-card {
//             max-width: 90%;
//             margin-left: 0;
//             margin-top: 20px;
//           }
//         }

//         @media (max-width: 480px) {
//           .quiz-card {
//             max-width: 95%;
//             min-height: 340px;
//             padding: 18px;
//           }
//           .question {
//             font-size: 1rem;
//             margin-top: 40px;
//           }
//           .option {
//             font-size: 0.85rem;
//             padding: 8px 14px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TechnicalMcqs;

import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Baro from "../Components/baro";

const TechnicalMcqs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fieldName = location.state?.fieldName || "General Knowledge";
  const token = localStorage.getItem("token");

  const [state, setState] = useState({
    loading: true,
    error: null,
    questions: [],
    currentQuestion: 0,
    selectedOption: null,
    answers: {},
    timer: 27000, 
    isSubmitted: false,
    aiModel: null
  });

  const parseMCQs = (rawData) => {
    try {
      if (!rawData) return [];
      
      if (Array.isArray(rawData)) {
        return rawData.map(q => ({
          question: q.question,
          options: q.options,
          correct: typeof q.correctAnswer === 'number' 
            ? q.correctAnswer 
            : (q.correctAnswer || -1)
        }));
      }
      
      const questionBlocks = rawData.split(/(Q\d+\.)/g);
      const questions = [];
      
      for (let i = 1; i < questionBlocks.length; i += 2) {
        try {
          const block = questionBlocks[i] + questionBlocks[i + 1];
          const lines = block.split('\n').map(l => l.trim()).filter(l => l);
          
          const question = {
            question: lines[0].replace(/^Q\d+\.\s*/, ''),
            options: [],
            correct: -1
          };

          lines.slice(1).forEach(line => {
            if (/^[A-D]\)/.test(line)) {
              question.options.push(line.replace(/^[A-D]\)\s*/, ''));
            }
            if (line.startsWith('Correct Answer:')) {
              const answer = line.split(': ')[1].trim().toUpperCase();
              question.correct = answer.charCodeAt(0) - 'A'.charCodeAt(0);
            }
          });

          if (question.options.length === 4 && question.correct >= 0) {
            questions.push(question);
          }
        } catch (e) {
          console.error('Error parsing block:', e);
        }
      }
      return questions;
    } catch (e) {
      console.error("Parsing error:", e);
      return [];
    }
  };

  const getFallbackQuestions = (topic) => {
    return [
      {
        question: `What is the primary focus of ${topic}?`,
        options: [
          "Core concepts",
          "Basic principles",
          "Fundamental theories",
          "All of the above"
        ],
        correct: 3
      },
      {
        question: `Which tool is NOT typically used in ${topic}?`,
        options: [
          "Standard toolkit",
          "Specialized software",
          "Unrelated technology",
          "Common frameworks"
        ],
        correct: 2
      }
    ];
  };

  const fetchQuestions = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await axios.post('http://localhost:5000/api/generate-mcqs', 
        { 
          topic: fieldName,
          count: 50
        },
        { timeout: 150000 }
      );

      const parsedQuestions = parseMCQs(response.data.questions);
      
      setState({
        loading: false,
        questions: parsedQuestions.length > 0 ? parsedQuestions : getFallbackQuestions(fieldName),
        currentQuestion: 0,
        selectedOption: null,
        answers: {},
        timer: 2700,
        isSubmitted: false,
        aiModel: response.data.model || 'fallback',
        error: parsedQuestions.length === 0 ? 'No valid questions generated' : null
      });

    } catch (error) {
      console.error('Failed to load questions:', error);
      
      setState({
        loading: false,
        error: 'AI service unavailable - using fallback questions',
        questions: getFallbackQuestions(fieldName),
        aiModel: 'fallback',
        currentQuestion: 0,
        selectedOption: null,
        answers: {},
        timer: 2700,
        isSubmitted: false
      });
    }
  };


  useEffect(() => {
    fetchQuestions();
  }, [fieldName]);


  useEffect(() => {
    if (state.loading || state.isSubmitted) return;

    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        timer: prev.timer > 0 ? prev.timer - 1 : 0
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [state.loading, state.isSubmitted]);



  const submitTestResults = useCallback(async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/saveTechnicalScore',
        {
          topic: fieldName,
          answers: state.answers,
          correctAnswers: state.questions.map(q => q.correct),
          timeTaken: 2700 - state.timer
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.data.success) {
        console.error("Failed to submit test results:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting test results:", error);
    }
  }, [fieldName, state.answers, state.questions, token, state.timer]);


  //saving the technical questions function
  const saveTechnicalQuestions = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/save-technical-questions', {
        topic: fieldName,
        questions: state.questions,
        model: state.aiModel
      });
    } catch (error) {
      console.error('Failed to save questions:', error);
    }
  }, [fieldName, state.questions, state.aiModel]);



  const handleSubmit = useCallback(() => {
    if (state.isSubmitted) return;
  
    try {
      saveTechnicalQuestions();
    } catch (error) {
      console.error('Submission error:', error);
    }
  
    const userAnswers = state.questions.map((question, index) => ({
      question: question.question,
      options: question.options,
      selected: question.options[state.answers[index]] || 'No answer',
      correct: question.options[question.correct],
      codeSnippet: question.codeSnippet, // Add this if available
      explanation: question.explanation // Add this if available
    }));
  
    const correctCount = userAnswers.filter(answer => 
      answer.selected === answer.correct
    ).length;
  
    submitTestResults();
  
    navigate("/scoreboard", {
      state: {
        correct: correctCount,
        total: state.questions.length,
        userAnswers, // Send full answers array
        quizType: "technical",
        fieldName
      }
    });
  
    setState(prev => ({ ...prev, isSubmitted: true }));
  }, [state.isSubmitted, state.questions, state.answers, fieldName, navigate, submitTestResults]);
  

  useEffect(() => {
    if (state.timer === 0 && !state.isSubmitted) {
      handleSubmit();
    }
  }, [state.timer, state.isSubmitted, handleSubmit]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !state.isSubmitted) {
        handleSubmit();
      }
    };

    const handleBeforeUnload = (e) => {
      if (!state.isSubmitted) {
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
  }, [state.isSubmitted, handleSubmit]);

  const handleOptionSelect = (optionIndex) => {
    setState(prev => ({
      ...prev,
      selectedOption: optionIndex,
      answers: { ...prev.answers, [prev.currentQuestion]: optionIndex }
    }));
  };

  const handleNavigation = (direction) => {
    setState(prev => {
      const newIndex = direction === 'next' 
        ? Math.min(prev.currentQuestion + 1, prev.questions.length - 1)
        : Math.max(prev.currentQuestion - 1, 0);
      
      return {
        ...prev,
        currentQuestion: newIndex,
        selectedOption: prev.answers[newIndex] ?? null
      };
    });
  };

  if (state.loading) {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: 'column', 
        gap: '16px',
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        zIndex: 9999,
      }}>
        <div style={{
          background: "linear-gradient(145deg, black, #5D009F)",
          borderRadius: "50%",
          width: "90px",
          height: "90px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          animation: "spin 1.5s linear infinite",
          boxShadow: "0 0 10px rgba(93, 0, 159, 0.3)",
        }}>
          <div style={{
            fontSize: "15px",
            fontWeight: "bold",
            color: "white",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}>
            MockBot
          </div>
        </div>
        <p>Preparing Test for {fieldName}</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (state.error && state.questions.length === 0) {
    return (
      <div className="error-container">
        <h2>⚠️ Generation Failed</h2>
        <p>{state.error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="retry-btn"
        >
          Retry
        </button>
        <style jsx>{`
          .error-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: #ece8ee;
            font-family: Poppins, sans-serif;
          }
          .retry-btn {
            padding: 12px 24px;
            background: #5D009F;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
          }
        `}</style>
      </div>
    );
  }

  const currentQ = state.questions[state.currentQuestion];

  return (
    <div className="quiz-container">
      <Navbar timer={state.timer} />

      <div className="quiz-content">
        <Baro
          questions={state.questions}
          currentQuestion={state.currentQuestion}
          setCurrentQuestion={(index) => {
            setState(prev => ({
              ...prev,
              currentQuestion: index,
              selectedOption: prev.answers[index] ?? null
            }));
          }}
        />

        <motion.div
          className="quiz-card"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          

          {/* Replace the model indicator code with this */}
<div className="difficulty-indicator">
  {state.currentQuestion < 10 ? (
    <span style={{ color: '#4CAF50' }}>Level: Easy</span>
  ) : state.currentQuestion < 25 ? (
    <span style={{ color: '#FF9800' }}>Level: Medium</span>
  ) : (
    <span style={{ color: '#F44336' }}>Level: Difficult</span>
  )}
</div>

          {currentQ && (
            <div className="question">{currentQ.question}</div>
          )}

          <div className="options">
            {currentQ?.options?.map((option, index) => (
              <motion.div
                key={index}
                className={`option ${state.selectedOption === index ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(index)}
                whileHover={{ scale: 1.02 }}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                {option}
              </motion.div>
            ))}
          </div>

          <div className="navigation">
            <motion.button
              className="nav-btn"
              onClick={() => handleNavigation('prev')}
              disabled={state.currentQuestion === 0 || state.isSubmitted}
              whileTap={{ scale: 0.9 }}
            >
              Prev
            </motion.button>

            {state.currentQuestion < state.questions.length - 1 ? (
              <motion.button
                className="nav-btn"
                onClick={() => handleNavigation('next')}
                disabled={state.isSubmitted}
                whileTap={{ scale: 0.9 }}
              >
                Next
              </motion.button>
            ) : (
              <motion.button
                className="nav-btn submit-btn"
                onClick={handleSubmit}
                disabled={state.isSubmitted}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
              >
                Submit
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
          max-width: 650px;
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
       
        .difficulty-indicator {
          
            position: absolute;
            top: 15px;
            center: 0px;
            padding: 5px 10px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: bold;
            background: rgba(0,0,0,0.1);

        }
        .question {
          margin-top: 50px;
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
        }
        .option {
          background-color: #f0f0f0;
          margin: 8px 0;
          padding: 10px 16px;
          border-radius: 12px;
          color: #333;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: background 0.3s;
        }
        .option:hover {
          background-color: #d6c8f7;
        }
        .option.selected {
          background-color: #d6c8f7;
          color: #000;
          font-weight: bold;
        }
        .option-letter {
          background: #7A70ED;
          color: white;
          padding: 6px 12px;
          border-radius: 50%;
          margin-right: 12px;
          font-weight: bold;
          font-size: 14px;
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
        }

        @media (max-width: 480px) {
          .quiz-card {
            max-width: 95%;
            min-height: 340px;
            padding: 18px;
          }
          .question {
            font-size: 1rem;
            margin-top: 40px;
          }
          .option {
            font-size: 0.85rem;
            padding: 8px 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default TechnicalMcqs;