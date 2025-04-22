// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Navbar from "../Components/Navbar"; // Separate Navbar component
// import Baro from "../Components/baro"; // Sidebar component
// import clickSound from "../Assets/click.mp3"; // Placeholder for sound
// import axios from "axios"; // Import axios for API requests

// const App = () => {
//   const [timer, setTimer] = useState(60);
//   const [questions, setQuestions] = useState([]); // Empty array to store questions fetched from backend
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const navigate = useNavigate();
//   const audio = new Audio(clickSound);

//   // Fetch questions from the backend
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.post("http://localhost:5000/api/generate-mcqs", {
//           topic: "Computer Networks", // 🔁 Replace this with a dynamic topic if needed
//         });
  
//         console.log("✅ MCQs from backend:", response.data.questions);
  
//         // Set the raw string from GPT output into state (you can parse later if needed)
//         const raw = response.data.questions;
  
//         // Optional: split into array of questions based on double line breaks or numbering
//         const parsedQuestions = raw
//           .split(/\n(?=\d+\.)/)
//           .map((block) => {
//             const parts = block.split("\n");
//             const question = parts[0];
//             const options = parts.slice(1, 5);
//             return {
//               question: question?.trim(),
//               options: options.map((opt) => opt?.trim()),
//             };
//           });
  
//         setQuestions(parsedQuestions);
//       } catch (error) {
//         console.error("❌ Error fetching questions:", error.response?.data || error.message);
//       }
//     };
  
//     fetchQuestions();
//   }, []);
  
  

//   // Timer functionality
//   useEffect(() => {
//     if (!isSubmitted && timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//     if (timer === 0 && !isSubmitted) {
//       handleSubmit();
//     }
//   }, [timer, isSubmitted]);

//   const playSound = () => {
//     audio.play();
//   };

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1);
//       setSelectedOption(null);
//     }
//   };

//   const handlePrev = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prev) => prev - 1);
//       setSelectedOption(null);
//     }
//   };

//   const handleSubmit = async () => {
//     setIsSubmitted(true);

//     try {
//       // Submit selected answer to the backend for evaluation
//       const response = await axios.post("http://your-backend-url.com/api/submit", {
//         questionId: questions[currentQuestion]._id, // Assuming each question has an '_id' field
//         selectedOption: selectedOption,
//       });

//       const { correctCount } = response.data;

//       // Navigate to scoreboard after submission
//       navigate("/scoreboard", {
//         state: {
//           correct: correctCount,
//           totalQuestions: questions.length,
//         },
//       });
//     } catch (error) {
//       console.error("Error submitting answer:", error);
//     }
//   };

//   return (
//     <div style={{ margin: 0, fontFamily: "Poppins, sans-serif", backgroundColor: "#ece8ee", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", overflow: "hidden" }}>
//       <Navbar />
//       <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(60vh - 30px)", paddingTop: "120px", paddingBottom: "60px" }}>
//         {/* Sidebar */}
//         <Baro
//           questions={questions}
//           currentQuestion={currentQuestion}
//           setCurrentQuestion={setCurrentQuestion}
//         />

//         {/* Main Quiz Content */}
//         <motion.div
//           style={{ marginLeft:"100px", width: "600px", minHeight: "400px", borderRadius: "8px", backgroundColor: "#5D009F", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Timer Centered */}
//           <div style={{ backgroundColor: "#212832", color: "yellow", fontSize: "1.2rem", padding: "12px", borderRadius: "50px 50px 0 0", textAlign: "center", width: "100px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "-5px" }}>
//             {timer}s
//           </div>

//           {/* Question */}
//           {questions.length > 0 && (
//             <div style={{ backgroundColor: "#2a2132", color: "#fff", padding: "15px", fontSize: "1.5rem", fontWeight: "600", borderRadius: "8px", textAlign: "center", width: "100%" }}>
//               {questions[currentQuestion].question}
//             </div>
//           )}

//           {/* Options */}
//           <div style={{ margin: "20px 0", width: "100%" }}>
//             {questions.length > 0 &&
//               questions[currentQuestion].options.map((option, index) => (
//                 <motion.div
//                   key={index}
//                   style={{ backgroundColor: "#49334d", border: "1px solid #7A70ED", margin: "10px 0", padding: "10px", borderRadius: "30px", textAlign: "start", display: "flex", alignItems: "center", cursor: "pointer", transition: "background-color 0.3s ease-in-out", ...(selectedOption === option && { backgroundColor: "#dae90bb5" }) }}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => {
//                     setSelectedOption(option);
//                     playSound();
//                   }}
//                 >
//                   <span style={{ backgroundColor: "#7A70ED", margin: "0 10px", padding: "6px 11px", fontSize: "12px", borderRadius: "50px" }}>
//                     {String.fromCharCode(65 + index)}
//                   </span>
//                   {option}
//                 </motion.div>
//               ))}
//           </div>

//           {/* Navigation Buttons */}
//           <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
//             <motion.button
//               style={{ padding: "12px 24px", fontSize: "16px", fontWeight: "bold", borderRadius: "5px", backgroundColor: "#7A70ED", color: "white", border: "none", cursor: "pointer", height: "60px", width: "80px", ...(currentQuestion === 0 || isSubmitted && { opacity: 0.5, pointerEvents: "none" }) }}
//               onClick={handlePrev}
//               disabled={currentQuestion === 0 || isSubmitted}
//               whileTap={{ scale: 0.9 }}
//             >
//               Prev
//             </motion.button>

//             <motion.button
//               style={{ padding: "12px 24px", fontSize: "16px", fontWeight: "bold", borderRadius: "5px", backgroundColor: "#7A70ED", color: "white", border: "none", cursor: "pointer", height: "60px", width: "80px", ...(currentQuestion < questions.length - 1 ? {} : { display: "none" }), ...(!selectedOption || isSubmitted && { opacity: 0.5, pointerEvents: "none" }) }}
//               onClick={handleNext}
//               disabled={!selectedOption || isSubmitted}
//               whileTap={{ scale: 0.9 }}
//             >
//               Next
//             </motion.button>

//             <motion.button
//               style={{ padding: "12px 24px", fontSize: "16px", fontWeight: "bold", borderRadius: "5px", backgroundColor: "#7A70ED", color: "white", border: "none", cursor: "pointer", height: "60px", width: "80px", ...(currentQuestion === questions.length - 1 ? {} : { display: "none" }), ...(!selectedOption || isSubmitted && { opacity: 0.5, pointerEvents: "none" }) }}
//               onClick={handleSubmit}
//               disabled={!selectedOption || isSubmitted}
//               whileTap={{ scale: 0.9 }}
//             >
//               Submit
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default App;
// App.js
// TechnicalMcqs.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Baro from "../Components/baro";

const TechnicalMcqs = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const fieldName = location.state?.fieldName || "General Knowledge";

    const [state, setState] = useState({
        loading: true,
        error: null,
        questions: [],
        currentQuestion: 0,
        selectedOption: null,
        answers: {},
        timer: 60,
        isSubmitted: false,
        aiModel: null
    });

    // Parse raw questions from API
    const parseMCQs = (rawText) => {
        if (!rawText) return [];
        
        try {
            // Try parsing as JSON if it's already structured
            if (typeof rawText === 'object') return rawText;
            
            // Parse raw text format
            return rawText.split(/\n(?=Q\d+\.)/)
                .filter(q => q.trim())
                .map(block => {
                    const lines = block.trim().split('\n');
                    const question = lines[0].replace(/^Q\d+\.\s*/, '').trim();
                    const options = lines.slice(1, 5)
                        .filter(l => l.trim())
                        .map(l => l.replace(/^[a-d]\)\s*/, '').trim());
                    return { question, options };
                })
                .filter(q => q.question && q.options.length === 4);
        } catch (e) {
            console.error("Parsing error:", e);
            return [];
        }
    };

    // Simple fallback questions
    const getFallbackQuestions = (topic) => {
        return [
            {
                question: `What is the primary focus of ${topic}?`,
                options: [
                    "Option A: Core concepts",
                    "Option B: Basic principles",
                    "Option C: Fundamental theories",
                    "Option D: All of the above"
                ]
            },
            {
                question: `Which tool is NOT typically used in ${topic}?`,
                options: [
                    "Standard toolkit",
                    "Specialized software",
                    "Unrelated technology",
                    "Common frameworks"
                ]
            }
        ];
    };

    // Fetch questions from backend
    const fetchQuestions = async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        try {
            const response = await axios.post('http://localhost:5001/api/generate-mcqs', 
                { 
                    topic: fieldName,
                    count: 10 // Number of questions needed
                },
                { timeout: 15000 }
            );

            setState({
                loading: false,
                questions: parseMCQs(response.data.questions) || [],
                currentQuestion: 0,
                selectedOption: null,
                answers: {},
                timer: 60,
                isSubmitted: false,
                aiModel: response.data.model || 'fallback',
                error: null
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
                timer: 60,
                isSubmitted: false
            });
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [fieldName]);

    // Timer logic
    useEffect(() => {
        if (state.loading || state.isSubmitted) return;

        const timer = setInterval(() => {
            setState(prev => ({
                ...prev,
                timer: prev.timer > 0 ? prev.timer - 1 : 0
            }));
        }, 1000);

        return () => clearInterval(timer);
    }, [state.loading, state.isSubmitted]);

    // Handle option selection
    const handleOptionSelect = (option) => {
        setState(prev => ({
            ...prev,
            selectedOption: option,
            answers: { ...prev.answers, [prev.currentQuestion]: option }
        }));
    };

    // Navigation between questions
    const handleNavigation = (direction) => {
        setState(prev => {
            const newIndex = direction === 'next' 
                ? Math.min(prev.currentQuestion + 1, prev.questions.length - 1)
                : Math.max(prev.currentQuestion - 1, 0);
            
            return {
                ...prev,
                currentQuestion: newIndex,
                selectedOption: prev.answers[newIndex] || null
            };
        });
    };

    // Submit quiz
    const handleSubmit = () => {
        const correctCount = Object.values(state.answers).filter(Boolean).length;
        navigate("/scoreboard", { 
            state: { 
                correct: correctCount, 
                total: state.questions.length,
                topic: fieldName
            } 
        });
    };

    // Loading state
    if (state.loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Generating questions about {fieldName}...</p>
                <style jsx>{`
                    .loading-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                    }
                    .spinner {
                        border: 5px solid #f3f3f3;
                        border-top: 5px solid #5D009F;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    // Error state
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
            <Navbar />
            <div className="quiz-content">
                <Baro
                    questions={state.questions}
                    currentQuestion={state.currentQuestion}
                    setCurrentQuestion={(index) => {
                        setState(prev => ({
                            ...prev,
                            currentQuestion: index,
                            selectedOption: prev.answers[index] || null
                        }));
                    }}
                />

                <motion.div
                    className="quiz-card"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="timer">
                        {state.timer}s
                    </div>

                    {state.aiModel && (
                        <div className="model-indicator">
                            {state.aiModel === 'fallback' ? (
                                <span style={{color: 'orange'}}>Using fallback questions</span>
                            ) : (
                                <span style={{color: 'lightgreen'}}>Powered by {state.aiModel}</span>
                            )}
                        </div>
                    )}

                    {currentQ && (
                        <div className="question">
                            {currentQ.question}
                        </div>
                    )}

                    <div className="options">
                        {currentQ?.options?.map((option, index) => (
                            <motion.div
                                key={index}
                                className={`option ${state.selectedOption === option ? 'selected' : ''}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleOptionSelect(option)}
                            >
                                <span className="option-letter">
                                    {String.fromCharCode(65 + index)}
                                </span>
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
                                disabled={!state.selectedOption || state.isSubmitted}
                                whileTap={{ scale: 0.9 }}
                            >
                                Next
                            </motion.button>
                        ) : (
                            <motion.button
                                className="nav-btn"
                                onClick={handleSubmit}
                                disabled={!state.selectedOption || state.isSubmitted}
                                whileTap={{ scale: 0.9 }}
                            >
                                Submit
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                .quiz-container {
                    margin: 0;
                    font-family: "Poppins, sans-serif";
                    background-color: #ece8ee;
                    height: 100vh;
                    overflow: hidden;
                }
                .quiz-content {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: calc(100vh - 120px);
                    padding-top: 120px;
                    padding-bottom: 60px;
                }
                .quiz-card {
                    margin-left: 100px;
                    width: 600px;
                    min-height: 400px;
                    border-radius: 8px;
                    background-color: #5D009F;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                }
                .timer {
                    background-color: #212832;
                    color: yellow;
                    font-size: 1.2rem;
                    padding: 12px;
                    border-radius: 50px 50px 0 0;
                    text-align: center;
                    width: 100px;
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: -5px;
                }
                .model-indicator {
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    font-size: 0.8rem;
                    padding: 5px 10px;
                    border-radius: 15px;
                    background: rgba(0,0,0,0.3);
                }
                .question {
                    background-color: #2a2132;
                    color: #fff;
                    padding: 15px;
                    font-size: 1.5rem;
                    font-weight: 600;
                    border-radius: 8px;
                    text-align: center;
                    width: 100%;
                }
                .options {
                    margin: 20px 0;
                    width: 100%;
                }
                .option {
                    background-color: #49334d;
                    border: 1px solid #7A70ED;
                    margin: 10px 0;
                    padding: 10px;
                    border-radius: 30px;
                    text-align: start;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    transition: background-color 0.3s ease-in-out;
                }
                .option.selected {
                    background-color: #dae90bb5;
                }
                .option-letter {
                    background-color: #7A70ED;
                    margin: 0 10px;
                    padding: 6px 11px;
                    font-size: 12px;
                    border-radius: 50px;
                }
                .navigation {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    margin-top: 20px;
                }
                .nav-btn {
                    padding: 12px 24px;
                    font-size: 16px;
                    font-weight: bold;
                    border-radius: 5px;
                    background-color: #7A70ED;
                    color: white;
                    border: none;
                    cursor: pointer;
                    height: 60px;
                    width: 80px;
                }
                .nav-btn:disabled {
                    opacity: 0.5;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
};

export default TechnicalMcqs;