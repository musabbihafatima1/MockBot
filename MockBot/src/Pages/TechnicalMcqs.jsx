// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "axios";
// import Navbar from "../Components/Navbar";
// import Baro from "../Components/baro";

// const TechnicalMcqs = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const fieldName = location.state?.fieldName || "General Knowledge";

//     const [state, setState] = useState({
//         loading: true,
//         error: null,
//         questions: [],
//         currentQuestion: 0,
//         selectedOption: null,
//         answers: {},
//         timer: 60,
//         isSubmitted: false,
//         aiModel: null
//     });

//     // Parse raw questions from API
//     const parseMCQs = (rawText) => {
//         if (!rawText) return [];
        
//         try {
//             // Try parsing as JSON if it's already structured
//             if (typeof rawText === 'object') return rawText;
            
//             // Parse raw text format
//             return rawText.split(/\n(?=Q\d+\.)/)
//                 .filter(q => q.trim())
//                 .map(block => {
//                     const lines = block.trim().split('\n');
//                     const question = lines[0].replace(/^Q\d+\.\s*/, '').trim();
//                     const options = lines.slice(1, 5)
//                         .filter(l => l.trim())
//                         .map(l => l.replace(/^[a-d]\)\s*/, '').trim());
//                     return { question, options };
//                 })
//                 .filter(q => q.question && q.options.length === 4);
//         } catch (e) {
//             console.error("Parsing error:", e);
//             return [];
//         }
//     };

//     // Simple fallback questions
//     const getFallbackQuestions = (topic) => {
//         return [
//             {
//                 question: `What is the primary focus of ${topic}?`,
//                 options: [
//                     "Option A: Core concepts",
//                     "Option B: Basic principles",
//                     "Option C: Fundamental theories",
//                     "Option D: All of the above"
//                 ]
//             },
//             {
//                 question: `Which tool is NOT typically used in ${topic}?`,
//                 options: [
//                     "Standard toolkit",
//                     "Specialized software",
//                     "Unrelated technology",
//                     "Common frameworks"
//                 ]
//             }
//         ];
//     };

//     // Fetch questions from backend
//     const fetchQuestions = async () => {
//         setState(prev => ({ ...prev, loading: true, error: null }));
        
//         try {
//             const response = await axios.post('http://localhost:5000/api/generate-mcqs', 
//                 { 
//                     topic: fieldName,
//                     count: 10 // Number of questions needed
//                 },
//                 { timeout: 15000 }
//             );

//             setState({
//                 loading: false,
//                 questions: parseMCQs(response.data.questions) || [],
//                 currentQuestion: 0,
//                 selectedOption: null,
//                 answers: {},
//                 timer: 60,
//                 isSubmitted: false,
//                 aiModel: response.data.model || 'fallback',
//                 error: null
//             });

//         } catch (error) {
//             console.error('Failed to load questions:', error);
            
//             setState({
//                 loading: false,
//                 error: 'AI service unavailable - using fallback questions',
//                 questions: getFallbackQuestions(fieldName),
//                 aiModel: 'fallback',
//                 currentQuestion: 0,
//                 selectedOption: null,
//                 answers: {},
//                 timer: 60,
//                 isSubmitted: false
//             });
//         }
//     };

//     useEffect(() => {
//         fetchQuestions();
//     }, [fieldName]);

//     // Timer logic
//     useEffect(() => {
//         if (state.loading || state.isSubmitted) return;

//         const timer = setInterval(() => {
//             setState(prev => ({
//                 ...prev,
//                 timer: prev.timer > 0 ? prev.timer - 1 : 0
//             }));
//         }, 1000);

//         return () => clearInterval(timer);
//     }, [state.loading, state.isSubmitted]);

//     // Handle option selection
//     const handleOptionSelect = (option) => {
//         setState(prev => ({
//             ...prev,
//             selectedOption: option,
//             answers: { ...prev.answers, [prev.currentQuestion]: option }
//         }));
//     };

//     // Navigation between questions
//     const handleNavigation = (direction) => {
//         setState(prev => {
//             const newIndex = direction === 'next' 
//                 ? Math.min(prev.currentQuestion + 1, prev.questions.length - 1)
//                 : Math.max(prev.currentQuestion - 1, 0);
            
//             return {
//                 ...prev,
//                 currentQuestion: newIndex,
//                 selectedOption: prev.answers[newIndex] || null
//             };
//         });
//     };

//     // Submit quiz
//     const handleSubmit = () => {
//         const correctCount = Object.values(state.answers).filter(Boolean).length;
//         navigate("/scoreboard", { 
//             state: { 
//                 correct: correctCount, 
//                 total: state.questions.length,
//                 topic: fieldName
//             } 
//         });
//     };

//     // Loading state
//     if (state.loading) {
//         return (
//             <div className="loading-container">
//                 <div className="spinner"></div>
//                 <p>Generating questions about {fieldName}...</p>
//                 <style jsx>{`
//                     .loading-container {
//                         display: flex;
//                         flex-direction: column;
//                         align-items: center;
//                         justify-content: center;
//                         height: 100vh;
//                     }
//                     .spinner {
//                         border: 5px solid #f3f3f3;
//                         border-top: 5px solid #5D009F;
//                         border-radius: 50%;
//                         width: 50px;
//                         height: 50px;
//                         animation: spin 1s linear infinite;
//                     }
//                     @keyframes spin {
//                         0% { transform: rotate(0deg); }
//                         100% { transform: rotate(360deg); }
//                     }
//                 `}</style>
//             </div>
//         );
//     }

//     // Error state
//     if (state.error && state.questions.length === 0) {
//         return (
//             <div className="error-container">
//                 <h2>⚠️ Generation Failed</h2>
//                 <p>{state.error}</p>
//                 <button 
//                     onClick={() => window.location.reload()}
//                     className="retry-btn"
//                 >
//                     Retry
//                 </button>
//                 <style jsx>{`
//                     .error-container {
//                         display: flex;
//                         flex-direction: column;
//                         align-items: center;
//                         justify-content: center;
//                         height: 100vh;
//                         background: #ece8ee;
//                         font-family: Poppins, sans-serif;
//                     }
//                     .retry-btn {
//                         padding: 12px 24px;
//                         background: #5D009F;
//                         color: white;
//                         border: none;
//                         border-radius: 5px;
//                         cursor: pointer;
//                         font-size: 16px;
//                         margin-top: 20px;
//                     }
//                 `}</style>
//             </div>
//         );
//     }

//     const currentQ = state.questions[state.currentQuestion];

//     return (
//         <div className="quiz-container">
//             <Navbar />
//             <div className="quiz-content">
//                 <Baro
//                     questions={state.questions}
//                     currentQuestion={state.currentQuestion}
//                     setCurrentQuestion={(index) => {
//                         setState(prev => ({
//                             ...prev,
//                             currentQuestion: index,
//                             selectedOption: prev.answers[index] || null
//                         }));
//                     }}
//                 />

//                 <motion.div
//                     className="quiz-card"
//                     initial={{ opacity: 0, y: -50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <div className="timer">
//                         {state.timer}s
//                     </div>

//                     {state.aiModel && (
//                         <div className="model-indicator">
//                             {state.aiModel === 'fallback' ? (
//                                 <span style={{color: 'orange'}}>Using fallback questions</span>
//                             ) : (
//                                 <span style={{color: 'lightgreen'}}>Powered by {state.aiModel}</span>
//                             )}
//                         </div>
//                     )}

//                     {currentQ && (
//                         <div className="question">
//                             {currentQ.question}
//                         </div>
//                     )}

//                     <div className="options">
//                         {currentQ?.options?.map((option, index) => (
//                             <motion.div
//                                 key={index}
//                                 className={`option ${state.selectedOption === option ? 'selected' : ''}`}
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => handleOptionSelect(option)}
//                             >
//                                 <span className="option-letter">
//                                     {String.fromCharCode(65 + index)}
//                                 </span>
//                                 {option}
//                             </motion.div>
//                         ))}
//                     </div>

//                     <div className="navigation">
//                         <motion.button
//                             className="nav-btn"
//                             onClick={() => handleNavigation('prev')}
//                             disabled={state.currentQuestion === 0 || state.isSubmitted}
//                             whileTap={{ scale: 0.9 }}
//                         >
//                             Prev
//                         </motion.button>

//                         {state.currentQuestion < state.questions.length - 1 ? (
//                             <motion.button
//                                 className="nav-btn"
//                                 onClick={() => handleNavigation('next')}
//                                 disabled={!state.selectedOption || state.isSubmitted}
//                                 whileTap={{ scale: 0.9 }}
//                             >
//                                 Next
//                             </motion.button>
//                         ) : (
//                             <motion.button
//                                 className="nav-btn"
//                                 onClick={handleSubmit}
//                                 disabled={!state.selectedOption || state.isSubmitted}
//                                 whileTap={{ scale: 0.9 }}
//                             >
//                                 Submit
//                             </motion.button>
//                         )}
//                     </div>
//                 </motion.div>
//             </div>

//             <style jsx>{`
//                 .quiz-container {
//                     margin: 0;
//                     font-family: "Poppins, sans-serif";
//                     background-color: #ece8ee;
//                     height: 100vh;
//                     overflow: hidden;
//                 }
//                 .quiz-content {
//                     width: 100%;
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     min-height: calc(100vh - 120px);
//                     padding-top: 120px;
//                     padding-bottom: 60px;
//                 }
//                 .quiz-card {
//                     margin-left: 100px;
//                     width: 600px;
//                     min-height: 400px;
//                     border-radius: 8px;
//                     background-color: #5D009F;
//                     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
//                     padding: 20px;
//                     display: flex;
//                     flex-direction: column;
//                     align-items: center;
//                     position: relative;
//                 }
//                 .timer {
//                     background-color: #212832;
//                     color: yellow;
//                     font-size: 1.2rem;
//                     padding: 12px;
//                     border-radius: 50px 50px 0 0;
//                     text-align: center;
//                     width: 100px;
//                     height: 50px;
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     margin-bottom: -5px;
//                 }
//                 .model-indicator {
//                     position: absolute;
//                     top: 10px;
//                     right: 20px;
//                     font-size: 0.8rem;
//                     padding: 5px 10px;
//                     border-radius: 15px;
//                     background: rgba(0,0,0,0.3);
//                 }
//                 .question {
//                     background-color: #2a2132;
//                     color: #fff;
//                     padding: 15px;
//                     font-size: 1.5rem;
//                     font-weight: 600;
//                     border-radius: 8px;
//                     text-align: center;
//                     width: 100%;
//                 }
//                 .options {
//                     margin: 20px 0;
//                     width: 100%;
//                 }
//                 .option {
//                     background-color: #49334d;
//                     border: 1px solid #7A70ED;
//                     margin: 10px 0;
//                     padding: 10px;
//                     border-radius: 30px;
//                     text-align: start;
//                     display: flex;
//                     align-items: center;
//                     cursor: pointer;
//                     transition: background-color 0.3s ease-in-out;
//                 }
//                 .option.selected {
//                     background-color: #dae90bb5;
//                 }
//                 .option-letter {
//                     background-color: #7A70ED;
//                     margin: 0 10px;
//                     padding: 6px 11px;
//                     font-size: 12px;
//                     border-radius: 50px;
//                 }
//                 .navigation {
//                     display: flex;
//                     justify-content: space-between;
//                     width: 100%;
//                     margin-top: 20px;
//                 }
//                 .nav-btn {
//                     padding: 12px 24px;
//                     font-size: 16px;
//                     font-weight: bold;
//                     border-radius: 5px;
//                     background-color: #7A70ED;
//                     color: white;
//                     border: none;
//                     cursor: pointer;
//                     height: 60px;
//                     width: 80px;
//                 }
//                 .nav-btn:disabled {
//                     opacity: 0.5;
//                     pointer-events: none;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default TechnicalMcqs;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import useWebLLM from "../hooks/useWebLLM";
// import Navbar from "../Components/Navbar";
// import Baro from "../Components/baro";

// const TechnicalMcqs = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const fieldName = location.state?.fieldName || "Software Engineering";
//   const { generateMCQs, progress, error: llmError, ready } = useWebLLM();

//   const [state, setState] = useState({
//     loading: true, // Start with loading true
//     error: null,
//     questions: [],
//     currentQuestion: 0,
//     selectedOption: null,
//     answers: {},
//     timer: 60,
//     isSubmitted: false,
//     aiModel: null,
//     showQuestions: false // New state to control question visibility
//   });

//   // Enhanced software engineering questions
//   const getFallbackQuestions = () => {
//     return [
//       // 10 Easy Questions
//       {
//         question: "What does HTML stand for?",
//         options: [
//           "Hyper Text Markup Language",
//           "High Tech Modern Language",
//           "Hyperlinks and Text Markup Language",
//           "Home Tool Markup Language"
//         ],
//         answer: 0,
//         difficulty: "easy"
//       },
//       {
//         question: "Which of these is NOT a programming language?",
//         options: ["Python", "Java", "HTML", "C++"],
//         answer: 2,
//         difficulty: "easy"
//       },
//       {
//         question: "What is the correct file extension for Python files?",
//         options: [".pt", ".pyt", ".py", ".python"],
//         answer: 2,
//         difficulty: "easy"
//       },
//       {
//         question: "Which symbol is used for single-line comments in JavaScript?",
//         options: ["//", "/*", "#", "--"],
//         answer: 0,
//         difficulty: "easy"
//       },
//       {
//         question: "What does CSS stand for?",
//         options: [
//           "Creative Style Sheets",
//           "Computer Style Sheets",
//           "Cascading Style Sheets",
//           "Colorful Style Sheets"
//         ],
//         answer: 2,
//         difficulty: "easy"
//       },
//       {
//         question: "Which of these is a JavaScript framework?",
//         options: ["Django", "Laravel", "React", "Flask"],
//         answer: 2,
//         difficulty: "easy"
//       },
//       {
//         question: "What does API stand for?",
//         options: [
//           "Application Programming Interface",
//           "Advanced Programming Interface",
//           "Automated Programming Interface",
//           "Application Process Integration"
//         ],
//         answer: 0,
//         difficulty: "easy"
//       },
//       {
//         question: "Which data type is used to store true/false values?",
//         options: ["String", "Boolean", "Integer", "Float"],
//         answer: 1,
//         difficulty: "easy"
//       },
//       {
//         question: "What does SQL stand for?",
//         options: [
//           "Structured Query Language",
//           "Simple Query Language",
//           "Standard Query Language",
//           "System Query Language"
//         ],
//         answer: 0,
//         difficulty: "easy"
//       },
//       {
//         question: "Which operator is used for equality comparison in JavaScript?",
//         options: ["==", "=", "===", "!="],
//         answer: 2,
//         difficulty: "easy"
//       },

//       // 15 Medium Questions
//       {
//         question: "What is the time complexity of a binary search algorithm?",
//         options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
//         answer: 2,
//         difficulty: "medium"
//       },
//       {
//         question: "Which design pattern ensures only one instance of a class exists?",
//         options: [
//           "Factory Pattern",
//           "Singleton Pattern",
//           "Observer Pattern",
//           "Decorator Pattern"
//         ],
//         answer: 1,
//         difficulty: "medium"
//       },
//       {
//         question: "What is the purpose of the 'virtual DOM' in React?",
//         options: [
//           "To improve security",
//           "To optimize performance",
//           "To enable server-side rendering",
//           "To simplify state management"
//         ],
//         answer: 1,
//         difficulty: "medium"
//       },
//       {
//         question: "Which HTTP status code means 'Not Found'?",
//         options: ["200", "302", "404", "500"],
//         answer: 2,
//         difficulty: "medium"
//       },
//       {
//         question: "What is the main advantage of using RESTful APIs?",
//         options: [
//           "They are faster than SOAP",
//           "They use less bandwidth",
//           "They are stateless and scalable",
//           "They support binary data transfer"
//         ],
//         answer: 2,
//         difficulty: "medium"
//       },
//       {
//         question: "Which of these is NOT a NoSQL database?",
//         options: ["MongoDB", "Cassandra", "PostgreSQL", "Redis"],
//         answer: 2,
//         difficulty: "medium"
//       },
//       {
//         question: "What is the purpose of Docker containers?",
//         options: [
//           "To virtualize hardware",
//           "To package and isolate applications",
//           "To manage database connections",
//           "To optimize network traffic"
//         ],
//         answer: 1,
//         difficulty: "medium"
//       },
//       {
//         question: "Which testing approach tests individual components in isolation?",
//         options: [
//           "Integration testing",
//           "Unit testing",
//           "System testing",
//           "Acceptance testing"
//         ],
//         answer: 1,
//         difficulty: "medium"
//       },
//       {
//         question: "What is the purpose of the 'git rebase' command?",
//         options: [
//           "To merge branches",
//           "To rewrite commit history",
//           "To create a new branch",
//           "To undo the last commit"
//         ],
//         answer: 1,
//         difficulty: "medium"
//       },
//       {
//         question: "Which principle states that a class should have only one reason to change?",
//         options: [
//           "DRY Principle",
//           "KISS Principle",
//           "SOLID Principle",
//           "YAGNI Principle"
//         ],
//         answer: 2,
//         difficulty: "medium"
//       },
//       {
//         question: "What does CORS stand for in web development?",
//         options: [
//           "Cross-Origin Resource Sharing",
//           "Centralized Origin Request System",
//           "Common Object Request Standard",
//           "Cross-Origin Request Security"
//         ],
//         answer: 0,
//         difficulty: "medium"
//       },
//       {
//         question: "Which algorithm is used for shortest path finding in graphs?",
//         options: [
//           "Bubble Sort",
//           "Dijkstra's Algorithm",
//           "Quick Sort",
//           "Binary Search"
//         ],
//         answer: 1,
//         difficulty: "medium"
//       },
//       {
//         question: "What is the purpose of the 'use strict' directive in JavaScript?",
//         options: [
//           "To enable ES6 features",
//           "To enforce stricter parsing and error handling",
//           "To improve performance",
//           "To enable type checking"
//         ],
//         answer: 1,
//         difficulty: "medium"
//       },
//       {
//         question: "Which of these is a microservices communication protocol?",
//         options: ["gRPC", "HTML", "CSS", "SQL"],
//         answer: 0,
//         difficulty: "medium"
//       },
//       {
//         question: "What is the main purpose of the Observer pattern?",
//         options: [
//           "To create objects without specifying the exact class",
//           "To define a one-to-many dependency between objects",
//           "To add responsibilities to objects dynamically",
//           "To provide a unified interface to a set of interfaces"
//         ],
//         answer: 1,
//         difficulty: "medium"
//       },

//       // 25 Hard Questions
//       {
//         question: "What is the time complexity of the Floyd-Warshall algorithm?",
//         options: ["O(n)", "O(n²)", "O(n³)", "O(n log n)"],
//         answer: 2,
//         difficulty: "hard"
//       },
//       {
//         question: "Which of these is NOT a CAP theorem tradeoff?",
//         options: [
//           "Consistency",
//           "Availability",
//           "Partition tolerance",
//           "Durability"
//         ],
//         answer: 3,
//         difficulty: "hard"
//       },
//       {
//         question: "What is the purpose of the Paxos algorithm?",
//         options: [
//           "Sorting large datasets",
//           "Achieving consensus in distributed systems",
//           "Compressing data",
//           "Encrypting network traffic"
//         ],
//         answer: 1,
//         difficulty: "hard"
//       },
//       {
//         question: "Which of these is NOT a characteristic of functional programming?",
//         options: [
//           "Immutable data",
//           "Pure functions",
//           "Side effects",
//           "First-class functions"
//         ],
//         answer: 2,
//         difficulty: "hard"
//       },
//       {
//         question: "What does the 'S' stand for in the SOLID principles?",
//         options: [
//           "Single Responsibility Principle",
//           "Stable Dependencies Principle",
//           "Secure Coding Principle",
//           "Static Typing Principle"
//         ],
//         answer: 0,
//         difficulty: "hard"
//       },
//       {
//         question: "Which of these is NOT a common cache invalidation strategy?",
//         options: [
//           "Write-through",
//           "Write-behind",
//           "Write-around",
//           "Write-over"
//         ],
//         answer: 3,
//         difficulty: "hard"
//       },
//       {
//         question: "What is the main purpose of the Circuit Breaker pattern?",
//         options: [
//           "To prevent cascading failures in distributed systems",
//           "To optimize database queries",
//           "To secure API endpoints",
//           "To manage memory allocation"
//         ],
//         answer: 0,
//         difficulty: "hard"
//       },
//       {
//         question: "Which of these is NOT a common distributed consensus algorithm?",
//         options: ["Paxos", "Raft", "MapReduce", "ZAB"],
//         answer: 2,
//         difficulty: "hard"
//       },
//       {
//         question: "What is the main advantage of using GraphQL over REST?",
//         options: [
//           "Faster network performance",
//           "Built-in caching",
//           "Client-specified data requirements",
//           "Better security"
//         ],
//         answer: 2,
//         difficulty: "hard"
//       },
//       {
//         question: "Which of these is NOT a common garbage collection algorithm?",
//         options: [
//           "Mark-and-sweep",
//           "Reference counting",
//           "Generational collection",
//           "Pointer arithmetic"
//         ],
//         answer: 3,
//         difficulty: "hard"
//       },
//       {
//         question: "What is the main purpose of the Bloom filter data structure?",
//         options: [
//           "To test whether an element is a member of a set",
//           "To sort elements efficiently",
//           "To compress data",
//           "To encrypt messages"
//         ],
//         answer: 0,
//         difficulty: "hard"
//       },
//       {
//         question: "Which of these is NOT a common database indexing technique?",
//         options: [
//           "B-tree",
//           "Hash index",
//           "Bitmap index",
//           "Linear scan"
//         ],
//         answer: 3,
//         difficulty: "hard"
//       },
//       {
//         question: "What is the main purpose of the Strangler Fig pattern?",
//         options: [
//           "To gradually replace a legacy system",
//           "To optimize database queries",
//           "To secure API endpoints",
//           "To manage memory allocation"
//         ],
//         answer: 0,
//         difficulty: "hard"
//       },
//       {
//         question: "Which of these is NOT a common message queue protocol?",
//         options: ["AMQP", "MQTT", "STOMP", "HTTPS"],
//         answer: 3,
//         difficulty: "hard"
//       },
//       {
//         question: "What is the main purpose of the CQRS pattern?",
//         options: [
//           "To separate read and write operations",
//           "To optimize database queries",
//           "To secure API endpoints",
//           "To manage memory allocation"
//         ],
//         answer: 0,
//         difficulty: "hard"
//       },
//       {
//         question: "Which of these is NOT a common database sharding strategy?",
//         options: [
//           "Range-based sharding",
//           "Hash-based sharding",
//           "Directory-based sharding",
//           "Index-based sharding"
//         ],
//         answer: 3,
//         difficulty: "hard"
//       },
//       {
//         question: "What is the main purpose of the Saga pattern?",
//         options: [
//           "To manage distributed transactions",
//           "To optimize database queries",
//           "To secure API endpoints",
//           "To manage memory allocation"
//         ],
//         answer: 0,
//         difficulty: "hard"
//       },
//       {
//         question: "Which of these is NOT a common load balancing algorithm?",
//         options: [
//           "Round robin",
//           "Least connections",
//           "IP hash",
//           "Binary search"
//         ],
//         answer: 3,
//         difficulty: "hard"
//       },
//       {
//         question: "What is the main purpose of the Event Sourcing pattern?",
//         options: [
//           "To persist state changes as a sequence of events",
//           "To optimize database queries",
//           "To secure API endpoints",
//           "To manage memory allocation"
//         ],
//         answer: 0,
//         difficulty: "hard"
//       },
//       {
//         question: "Which of these is NOT a common concurrency control mechanism?",
//         options: [
//           "Optimistic locking",
//           "Pessimistic locking",
//           "Multiversion concurrency control",
//           "Singlethreaded execution"
//         ],
//         answer: 3,
//         difficulty: "hard"
//       },
//       {
//         question: "What is the main purpose of the Sidecar pattern?",
//         options: [
//           "To deploy helper components alongside main components",
//           "To optimize database queries",
//           "To secure API endpoints",
//           "To manage memory allocation"
//         ],
//         answer: 0,
//         difficulty: "hard"
//       },
//       {
//         question: "Which of these is NOT a common API authentication method?",
//         options: [
//           "OAuth 2.0",
//           "JWT",
//           "Basic Auth",
//           "TCP handshake"
//         ],
//         answer: 3,
//         difficulty: "hard"
//       },
//       {
//         question: "What is the main purpose of the Bulkhead pattern?",
//         options: [
//           "To isolate failures in one part of a system",
//           "To optimize database queries",
//           "To secure API endpoints",
//           "To manage memory allocation"
//         ],
//         answer: 0,
//         difficulty: "hard"
//       },
//       {
//         question: "Which of these is NOT a common database replication strategy?",
//         options: [
//           "Master-slave replication",
//           "Multi-master replication",
//           "Peer-to-peer replication",
//           "Single-node replication"
//         ],
//         answer: 3,
//         difficulty: "hard"
//       },
//       {
//         question: "What is the main purpose of the Backpressure pattern?",
//         options: [
//           "To handle data streams where the producer is faster than the consumer",
//           "To optimize database queries",
//           "To secure API endpoints",
//           "To manage memory allocation"
//         ],
//         answer: 0,
//         difficulty: "hard"
//       }
//     ];
//   };

//   // Fetch questions with 7-second loading delay
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const questions = getFallbackQuestions();
//       // Shuffle questions
//       for (let i = questions.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [questions[i], questions[j]] = [questions[j], questions[i]];
//       }
      
//       setState(prev => ({
//         ...prev,
//         loading: false,
//         questions: questions.slice(0, 5),
//         showQuestions: true
//       }));
//     }, 7000); // 7 second delay

//     return () => clearTimeout(timer);
//   }, []);

//   // Timer logic for quiz
//   useEffect(() => {
//     if (state.loading || state.isSubmitted || !state.showQuestions) return;

//     const timer = setInterval(() => {
//       setState(prev => ({
//         ...prev,
//         timer: prev.timer > 0 ? prev.timer - 1 : 0
//       }));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [state.loading, state.isSubmitted, state.showQuestions]);

//   // Loading screen with spinning MockBot logo
//   if (state.loading || !state.showQuestions) {
//     return (
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         backgroundColor: '#ece8ee',
//         fontFamily: 'Poppins, sans-serif'
//       }}>
//         <div style={{
//           width: '150px',
//           height: '150px',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginBottom: '20px',
//           animation: 'spin 2s linear infinite'
//         }}>
//           <div style={{
//             backgroundColor: '#5D009F',
//             color: 'white',
//             width: '100%',
//             height: '100%',
//             borderRadius: '50%',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             fontSize: '24px',
//             fontWeight: 'bold',
//             boxShadow: '0 0 20px rgba(93, 0, 159, 0.5)'
//           }}>
//             MockBot
//           </div>
//         </div>
//         <p style={{ fontSize: '18px', color: '#5D009F' }}>Preparing your questions...</p>
//         <style>
//           {`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}
//         </style>
//       </div>
//     );
//   }

//   // Handle option selection
//   const handleOptionSelect = (option) => {
//     setState(prev => ({
//       ...prev,
//       selectedOption: option,
//       answers: { ...prev.answers, [prev.currentQuestion]: option }
//     }));
//   };

//   // Navigation between questions
//   const handleNavigation = (direction) => {
//     setState(prev => {
//       const newIndex = direction === 'next' 
//         ? Math.min(prev.currentQuestion + 1, prev.questions.length - 1)
//         : Math.max(prev.currentQuestion - 1, 0);
      
//       return {
//         ...prev,
//         currentQuestion: newIndex,
//         selectedOption: prev.answers[newIndex] || null
//       };
//     });
//   };

//   // Submit quiz
//   const handleSubmit = () => {
//     const correctCount = state.questions.reduce((count, q, index) => {
//       return count + (state.answers[index] === q.options[q.answer] ? 1 : 0);
//     }, 0);
    
//     navigate("/scoreboard", { 
//       state: { 
//         correct: correctCount, 
//         total: state.questions.length,
//         topic: fieldName
//       } 
//     });
//   };

//   const currentQ = state.questions[state.currentQuestion];

//   return (
//     <div style={{ 
//       margin: 0,
//       fontFamily: 'Poppins, sans-serif',
//       backgroundColor: '#ece8ee',
//       height: '100vh',
//       overflow: 'hidden'
//     }}>
//       <Navbar />
//       <div style={{
//         width: '100%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: 'calc(100vh - 120px)',
//         paddingTop: '120px',
//         paddingBottom: '60px'
//       }}>
//         <Baro
//           questions={state.questions}
//           currentQuestion={state.currentQuestion}
//           setCurrentQuestion={(index) => {
//             setState(prev => ({
//               ...prev,
//               currentQuestion: index,
//               selectedOption: prev.answers[index] || null
//             }));
//           }}
//         />

//         <motion.div
//           style={{
//             marginLeft: '100px',
//             width: '600px',
//             minHeight: '400px',
//             borderRadius: '8px',
//             backgroundColor: '#5D009F',
//             boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
//             padding: '20px',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             position: 'relative'
//           }}
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div style={{
//             backgroundColor: '#212832',
//             color: 'yellow',
//             fontSize: '1.2rem',
//             padding: '12px',
//             borderRadius: '50px 50px 0 0',
//             textAlign: 'center',
//             width: '100px',
//             height: '50px',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginBottom: '-5px'
//           }}>
//             {state.timer}s
//           </div>

//           {currentQ && (
//             <div style={{
//               backgroundColor: '#2a2132',
//               color: '#fff',
//               padding: '15px',
//               fontSize: '1.5rem',
//               fontWeight: '600',
//               borderRadius: '8px',
//               textAlign: 'center',
//               width: '100%'
//             }}>
//               {currentQ.question}
//             </div>
//           )}

//           <div style={{ margin: '20px 0', width: '100%' }}>
//             {currentQ?.options?.map((option, index) => (
//               <motion.div
//                 key={index}
//                 style={{
//                   backgroundColor: state.selectedOption === option ? '#dae90bb5' : '#49334d',
//                   border: '1px solid #7A70ED',
//                   margin: '10px 0',
//                   padding: '10px',
//                   borderRadius: '30px',
//                   textAlign: 'start',
//                   display: 'flex',
//                   alignItems: 'center',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.3s ease-in-out'
//                 }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleOptionSelect(option)}
//               >
//                 <span style={{
//                   backgroundColor: '#7A70ED',
//                   margin: '0 10px',
//                   padding: '6px 11px',
//                   fontSize: '12px',
//                   borderRadius: '50px'
//                 }}>
//                   {String.fromCharCode(65 + index)}
//                 </span>
//                 {option}
//               </motion.div>
//             ))}
//           </div>

//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             width: '100%',
//             marginTop: '20px'
//           }}>
//             <motion.button
//               style={{
//                 padding: '12px 24px',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 borderRadius: '5px',
//                 backgroundColor: '#7A70ED',
//                 color: 'white',
//                 border: 'none',
//                 cursor: 'pointer',
//                 height: '60px',
//                 width: '80px',
//                 opacity: state.currentQuestion === 0 || state.isSubmitted ? 0.5 : 1,
//                 pointerEvents: state.currentQuestion === 0 || state.isSubmitted ? 'none' : 'auto'
//               }}
//               onClick={() => handleNavigation('prev')}
//               whileTap={{ scale: 0.9 }}
//             >
//               Prev
//             </motion.button>

//             {state.currentQuestion < state.questions.length - 1 ? (
//               <motion.button
//                 style={{
//                   padding: '12px 24px',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   borderRadius: '5px',
//                   backgroundColor: '#7A70ED',
//                   color: 'white',
//                   border: 'none',
//                   cursor: 'pointer',
//                   height: '60px',
//                   width: '80px',
//                   opacity: !state.selectedOption || state.isSubmitted ? 0.5 : 1,
//                   pointerEvents: !state.selectedOption || state.isSubmitted ? 'none' : 'auto'
//                 }}
//                 onClick={() => handleNavigation('next')}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 Next
//               </motion.button>
//             ) : (
//               <motion.button
//                 style={{
//                   padding: '12px 24px',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   borderRadius: '5px',
//                   backgroundColor: '#7A70ED',
//                   color: 'white',
//                   border: 'none',
//                   cursor: 'pointer',
//                   height: '60px',
//                   width: '80px',
//                   opacity: !state.selectedOption || state.isSubmitted ? 0.5 : 1,
//                   pointerEvents: !state.selectedOption || state.isSubmitted ? 'none' : 'auto'
//                 }}
//                 onClick={handleSubmit}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 Submit
//               </motion.button>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default TechnicalMcqs;


//2nd  copy
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import useWebLLM from "../hooks/useWebLLM";
// import Navbar from "../Components/Navbar";
// import Baro from "../Components/baro";

// const TechnicalMcqs = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const fieldName = location.state?.fieldName || "Software Engineering";
//   const { generateMCQs, progress, error: llmError, ready } = useWebLLM();

//   const [state, setState] = useState({
//     loading: true,
//     error: null,
//     questions: [],
//     currentQuestion: 0,
//     selectedOption: null,
//     answers: {},
//     timer: 60,
//     isSubmitted: false,
//     aiModel: null,
//     showQuestions: false,
//     score: 0
//   });

//   // Enhanced software engineering questions (50 total)
//   const getFallbackQuestions = () => {
//     return [
//       {
//         id: 1,
//         question: "What does HTML stand for?",
//         options: [
//           "Hyper Text Markup Language",
//           "High Tech Modern Language",
//           "Hyperlinks and Text Markup Language",
//           "Home Tool Markup Language"
//         ],
//         answer: 0,
//         difficulty: "easy"
//       },{
//                 question: "Which of these is NOT a programming language?",
//                 options: ["Python", "Java", "HTML", "C++"],
//                 answer: 2,
//                 difficulty: "easy"
//               },
//               {
//                 question: "What is the correct file extension for Python files?",
//                 options: [".pt", ".pyt", ".py", ".python"],
//                 answer: 2,
//                 difficulty: "easy"
//               },
//               {
//                 question: "Which symbol is used for single-line comments in JavaScript?",
//                 options: ["//", "/*", "#", "--"],
//                 answer: 0,
//                 difficulty: "easy"
//               },
//               {
//                 question: "What does CSS stand for?",
//                 options: [
//                   "Creative Style Sheets",
//                   "Computer Style Sheets",
//                   "Cascading Style Sheets",
//                   "Colorful Style Sheets"
//                 ],
//                 answer: 2,
//                 difficulty: "easy"
//               },
//               {
//                 question: "Which of these is a JavaScript framework?",
//                 options: ["Django", "Laravel", "React", "Flask"],
//                 answer: 2,
//                 difficulty: "easy"
//               },
//               {
//                 question: "What does API stand for?",
//                 options: [
//                   "Application Programming Interface",
//                   "Advanced Programming Interface",
//                   "Automated Programming Interface",
//                   "Application Process Integration"
//                 ],
//                 answer: 0,
//                 difficulty: "easy"
//               },
//               {
//                 question: "Which data type is used to store true/false values?",
//                 options: ["String", "Boolean", "Integer", "Float"],
//                 answer: 1,
//                 difficulty: "easy"
//               },
//               {
//                 question: "What does SQL stand for?",
//                 options: [
//                   "Structured Query Language",
//                   "Simple Query Language",
//                   "Standard Query Language",
//                   "System Query Language"
//                 ],
//                 answer: 0,
//                 difficulty: "easy"
//               },
//               {
//                 question: "Which operator is used for equality comparison in JavaScript?",
//                 options: ["==", "=", "===", "!="],
//                 answer: 2,
//                 difficulty: "easy"
//               },
        
//               // 15 Medium Questions
//               {
//                 question: "What is the time complexity of a binary search algorithm?",
//                 options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
//                 answer: 2,
//                 difficulty: "medium"
//               },
//               {
//                 question: "Which design pattern ensures only one instance of a class exists?",
//                 options: [
//                   "Factory Pattern",
//                   "Singleton Pattern",
//                   "Observer Pattern",
//                   "Decorator Pattern"
//                 ],
//                 answer: 1,
//                 difficulty: "medium"
//               },
//               {
//                 question: "What is the purpose of the 'virtual DOM' in React?",
//                 options: [
//                   "To improve security",
//                   "To optimize performance",
//                   "To enable server-side rendering",
//                   "To simplify state management"
//                 ],
//                 answer: 1,
//                 difficulty: "medium"
//               },
//               {
//                 question: "Which HTTP status code means 'Not Found'?",
//                 options: ["200", "302", "404", "500"],
//                 answer: 2,
//                 difficulty: "medium"
//               },
//               {
//                 question: "What is the main advantage of using RESTful APIs?",
//                 options: [
//                   "They are faster than SOAP",
//                   "They use less bandwidth",
//                   "They are stateless and scalable",
//                   "They support binary data transfer"
//                 ],
//                 answer: 2,
//                 difficulty: "medium"
//               },
//               {
//                 question: "Which of these is NOT a NoSQL database?",
//                 options: ["MongoDB", "Cassandra", "PostgreSQL", "Redis"],
//                 answer: 2,
//                 difficulty: "medium"
//               },
//               {
//                 question: "What is the purpose of Docker containers?",
//                 options: [
//                   "To virtualize hardware",
//                   "To package and isolate applications",
//                   "To manage database connections",
//                   "To optimize network traffic"
//                 ],
//                 answer: 1,
//                 difficulty: "medium"
//               },
//               {
//                 question: "Which testing approach tests individual components in isolation?",
//                 options: [
//                   "Integration testing",
//                   "Unit testing",
//                   "System testing",
//                   "Acceptance testing"
//                 ],
//                 answer: 1,
//                 difficulty: "medium"
//               },
//               {
//                 question: "What is the purpose of the 'git rebase' command?",
//                 options: [
//                   "To merge branches",
//                   "To rewrite commit history",
//                   "To create a new branch",
//                   "To undo the last commit"
//                 ],
//                 answer: 1,
//                 difficulty: "medium"
//               },
//               {
//                 question: "Which principle states that a class should have only one reason to change?",
//                 options: [
//                   "DRY Principle",
//                   "KISS Principle",
//                   "SOLID Principle",
//                   "YAGNI Principle"
//                 ],
//                 answer: 2,
//                 difficulty: "medium"
//               },
//               {
//                 question: "What does CORS stand for in web development?",
//                 options: [
//                   "Cross-Origin Resource Sharing",
//                   "Centralized Origin Request System",
//                   "Common Object Request Standard",
//                   "Cross-Origin Request Security"
//                 ],
//                 answer: 0,
//                 difficulty: "medium"
//               },
//               {
//                 question: "Which algorithm is used for shortest path finding in graphs?",
//                 options: [
//                   "Bubble Sort",
//                   "Dijkstra's Algorithm",
//                   "Quick Sort",
//                   "Binary Search"
//                 ],
//                 answer: 1,
//                 difficulty: "medium"
//               },
//               {
//                 question: "What is the purpose of the 'use strict' directive in JavaScript?",
//                 options: [
//                   "To enable ES6 features",
//                   "To enforce stricter parsing and error handling",
//                   "To improve performance",
//                   "To enable type checking"
//                 ],
//                 answer: 1,
//                 difficulty: "medium"
//               },
//               {
//                 question: "Which of these is a microservices communication protocol?",
//                 options: ["gRPC", "HTML", "CSS", "SQL"],
//                 answer: 0,
//                 difficulty: "medium"
//               },
//               {
//                 question: "What is the main purpose of the Observer pattern?",
//                 options: [
//                   "To create objects without specifying the exact class",
//                   "To define a one-to-many dependency between objects",
//                   "To add responsibilities to objects dynamically",
//                   "To provide a unified interface to a set of interfaces"
//                 ],
//                 answer: 1,
//                 difficulty: "medium"
//               },
        
//               // 25 Hard Questions
//               {
//                 question: "What is the time complexity of the Floyd-Warshall algorithm?",
//                 options: ["O(n)", "O(n²)", "O(n³)", "O(n log n)"],
//                 answer: 2,
//                 difficulty: "hard"
//               },
//               {
//                 question: "Which of these is NOT a CAP theorem tradeoff?",
//                 options: [
//                   "Consistency",
//                   "Availability",
//                   "Partition tolerance",
//                   "Durability"
//                 ],
//                 answer: 3,
//                 difficulty: "hard"
//               },
//               {
//                 question: "What is the purpose of the Paxos algorithm?",
//                 options: [
//                   "Sorting large datasets",
//                   "Achieving consensus in distributed systems",
//                   "Compressing data",
//                   "Encrypting network traffic"
//                 ],
//                 answer: 1,
//                 difficulty: "hard"
//               },
//               {
//                 question: "Which of these is NOT a characteristic of functional programming?",
//                 options: [
//                   "Immutable data",
//                   "Pure functions",
//                   "Side effects",
//                   "First-class functions"
//                 ],
//                 answer: 2,
//                 difficulty: "hard"
//               },
//               {
//                 question: "What does the 'S' stand for in the SOLID principles?",
//                 options: [
//                   "Single Responsibility Principle",
//                   "Stable Dependencies Principle",
//                   "Secure Coding Principle",
//                   "Static Typing Principle"
//                 ],
//                 answer: 0,
//                 difficulty: "hard"
//               },
//               {
//                 question: "Which of these is NOT a common cache invalidation strategy?",
//                 options: [
//                   "Write-through",
//                   "Write-behind",
//                   "Write-around",
//                   "Write-over"
//                 ],
//                 answer: 3,
//                 difficulty: "hard"
//               },
//               {
//                 question: "What is the main purpose of the Circuit Breaker pattern?",
//                 options: [
//                   "To prevent cascading failures in distributed systems",
//                   "To optimize database queries",
//                   "To secure API endpoints",
//                   "To manage memory allocation"
//                 ],
//                 answer: 0,
//                 difficulty: "hard"
//               },
//               {
//                 question: "Which of these is NOT a common distributed consensus algorithm?",
//                 options: ["Paxos", "Raft", "MapReduce", "ZAB"],
//                 answer: 2,
//                 difficulty: "hard"
//               },
//               {
//                 question: "What is the main advantage of using GraphQL over REST?",
//                 options: [
//                   "Faster network performance",
//                   "Built-in caching",
//                   "Client-specified data requirements",
//                   "Better security"
//                 ],
//                 answer: 2,
//                 difficulty: "hard"
//               },
//               {
//                 question: "Which of these is NOT a common garbage collection algorithm?",
//                 options: [
//                   "Mark-and-sweep",
//                   "Reference counting",
//                   "Generational collection",
//                   "Pointer arithmetic"
//                 ],
//                 answer: 3,
//                 difficulty: "hard"
//               },
//               {
//                 question: "What is the main purpose of the Bloom filter data structure?",
//                 options: [
//                   "To test whether an element is a member of a set",
//                   "To sort elements efficiently",
//                   "To compress data",
//                   "To encrypt messages"
//                 ],
//                 answer: 0,
//                 difficulty: "hard"
//               },
//               {
//                 question: "Which of these is NOT a common database indexing technique?",
//                 options: [
//                   "B-tree",
//                   "Hash index",
//                   "Bitmap index",
//                   "Linear scan"
//                 ],
//                 answer: 3,
//                 difficulty: "hard"
//               },
//               {
//                 question: "What is the main purpose of the Strangler Fig pattern?",
//                 options: [
//                   "To gradually replace a legacy system",
//                   "To optimize database queries",
//                   "To secure API endpoints",
//                   "To manage memory allocation"
//                 ],
//                 answer: 0,
//                 difficulty: "hard"
//               },
//               {
//                 question: "Which of these is NOT a common message queue protocol?",
//                 options: ["AMQP", "MQTT", "STOMP", "HTTPS"],
//                 answer: 3,
//                 difficulty: "hard"
//               },
//               {
//                 question: "What is the main purpose of the CQRS pattern?",
//                 options: [
//                   "To separate read and write operations",
//                   "To optimize database queries",
//                   "To secure API endpoints",
//                   "To manage memory allocation"
//                 ],
//                 answer: 0,
//                 difficulty: "hard"
//               },
//               {
//                 question: "Which of these is NOT a common database sharding strategy?",
//                 options: [
//                   "Range-based sharding",
//                   "Hash-based sharding",
//                   "Directory-based sharding",
//                   "Index-based sharding"
//                 ],
//                 answer: 3,
//                 difficulty: "hard"
//               },
//               {
//                 question: "What is the main purpose of the Saga pattern?",
//                 options: [
//                   "To manage distributed transactions",
//                   "To optimize database queries",
//                   "To secure API endpoints",
//                   "To manage memory allocation"
//                 ],
//                 answer: 0,
//                 difficulty: "hard"
//               },
//               {
//                 question: "Which of these is NOT a common load balancing algorithm?",
//                 options: [
//                   "Round robin",
//                   "Least connections",
//                   "IP hash",
//                   "Binary search"
//                 ],
//                 answer: 3,
//                 difficulty: "hard"
//               },
//               {
//                 question: "What is the main purpose of the Event Sourcing pattern?",
//                 options: [
//                   "To persist state changes as a sequence of events",
//                   "To optimize database queries",
//                   "To secure API endpoints",
//                   "To manage memory allocation"
//                 ],
//                 answer: 0,
//                 difficulty: "hard"
//               },
//               {
//                 question: "Which of these is NOT a common concurrency control mechanism?",
//                 options: [
//                   "Optimistic locking",
//                   "Pessimistic locking",
//                   "Multiversion concurrency control",
//                   "Singlethreaded execution"
//                 ],
//                 answer: 3,
//                 difficulty: "hard"
//               },
//               {
//                 question: "What is the main purpose of the Sidecar pattern?",
//                 options: [
//                   "To deploy helper components alongside main components",
//                   "To optimize database queries",
//                   "To secure API endpoints",
//                   "To manage memory allocation"
//                 ],
//                 answer: 0,
//                 difficulty: "hard"
//               },
//               {
//                 question: "Which of these is NOT a common API authentication method?",
//                 options: [
//                   "OAuth 2.0",
//                   "JWT",
//                   "Basic Auth",
//                   "TCP handshake"
//                 ],
//                 answer: 3,
//                 difficulty: "hard"
//               },
//               {
//                 question: "What is the main purpose of the Bulkhead pattern?",
//                 options: [
//                   "To isolate failures in one part of a system",
//                   "To optimize database queries",
//                   "To secure API endpoints",
//                   "To manage memory allocation"
//                 ],
//                 answer: 0,
//                 difficulty: "hard"
//               },
//               {
//                 question: "Which of these is NOT a common database replication strategy?",
//                 options: [
//                   "Master-slave replication",
//                   "Multi-master replication",
//                   "Peer-to-peer replication",
//                   "Single-node replication"
//                 ],
//                 answer: 3,
//                 difficulty: "hard"
//               },
//               {
//                 question: "What is the main purpose of the Backpressure pattern?",
//                 options: [
//                   "To handle data streams where the producer is faster than the consumer",
//                   "To optimize database queries",
//                   "To secure API endpoints",
//                   "To manage memory allocation"
//                 ],
//                 answer: 0,
//                 difficulty: "hard"
//               }
//     ];
//   };

//   // Calculate score
//   const calculateScore = () => {
//     let score = 0;
//     state.questions.forEach((q, index) => {
//       if (state.answers[index] === q.options[q.answer]) {
//         score += 1;
//       }
//     });
//     return score;
//   };

//   // Handle submission
//   const handleSubmission = () => {
//     const score = calculateScore();
//     setState(prev => ({ ...prev, isSubmitted: true, score }));
    
//     navigate("/scoreboard", { 
//       state: { 
//         correct: score,
//         total: state.questions.length,
//         topic: fieldName,
//         timeUsed: (state.questions.length * 60) - state.timer
//       } 
//     });
//   };

//   // Fetch questions with 7-second loading delay
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const questions = getFallbackQuestions();
//       setState(prev => ({
//         ...prev,
//         loading: false,
//         questions: questions,
//         showQuestions: true,
//         timer: questions.length * 60 // Total time for all questions
//       }));
//     }, 7000);

//     return () => clearTimeout(timer);
//   }, []);

//   // Timer logic for quiz
//   useEffect(() => {
//     if (state.loading || state.isSubmitted || !state.showQuestions) return;

//     const timer = setInterval(() => {
//       setState(prev => {
//         if (prev.timer <= 1) {
//           clearInterval(timer);
//           handleSubmission(); // Auto-submit when time runs out
//           return prev;
//         }
//         return {
//           ...prev,
//           timer: prev.timer - 1
//         };
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [state.loading, state.isSubmitted, state.showQuestions]);

//   // Loading screen with spinning MockBot logo
//   if (state.loading || !state.showQuestions) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//         backgroundColor: '#ece8ee'
//       }}>
//         <div style={{
//           width: '150px',
//           height: '150px',
//           border: '5px solid #f3f3f3',
//           borderTop: '5px solid #5D009F',
//           borderRadius: '50%',
//           animation: 'spin 2s linear infinite',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}>
//           <span style={{
//             color: '#5D009F',
//             fontSize: '24px',
//             fontWeight: 'bold'
//           }}>MockBot</span>
//         </div>
//         <p style={{ 
//           marginTop: '20px', 
//           fontFamily: 'Poppins, sans-serif',
//           color: '#5D009F'
//         }}>
//           Preparing your questions...
//         </p>
//         <style>
//           {`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}
//         </style>
//       </div>
//     );
//   }

//   // Handle option selection
//   const handleOptionSelect = (option) => {
//     setState(prev => ({
//       ...prev,
//       selectedOption: option,
//       answers: { ...prev.answers, [prev.currentQuestion]: option }
//     }));
//   };

//   // Navigation between questions
//   const handleNavigation = (direction) => {
//     setState(prev => {
//       const newIndex = direction === 'next' 
//         ? Math.min(prev.currentQuestion + 1, prev.questions.length - 1)
//         : Math.max(prev.currentQuestion - 1, 0);
      
//       return {
//         ...prev,
//         currentQuestion: newIndex,
//         selectedOption: prev.answers[newIndex] || null
//       };
//     });
//   };

//   const currentQ = state.questions[state.currentQuestion];

//   return (
//     <div style={{ 
//       margin: 0,
//       fontFamily: 'Poppins, sans-serif',
//       backgroundColor: '#ece8ee',
//       height: '100vh',
//       overflow: 'hidden'
//     }}>
//       <Navbar />
//       <div style={{
//         width: '100%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: 'calc(100vh - 120px)',
//         paddingTop: '120px',
//         paddingBottom: '60px'
//       }}>
//         <Baro
//           questions={state.questions}
//           currentQuestion={state.currentQuestion}
//           setCurrentQuestion={(index) => {
//             setState(prev => ({
//               ...prev,
//               currentQuestion: index,
//               selectedOption: prev.answers[index] || null
//             }));
//           }}
//         />

//         <motion.div
//           style={{
//             marginLeft: '100px',
//             width: '600px',
//             minHeight: '400px',
//             borderRadius: '8px',
//             backgroundColor: '#5D009F',
//             boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
//             padding: '20px',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             position: 'relative'
//           }}
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Timer */}
//           <div style={{
//             backgroundColor: '#212832',
//             color: 'yellow',
//             fontSize: '1.2rem',
//             padding: '12px',
//             borderRadius: '50px 50px 0 0',
//             textAlign: 'center',
//             width: '120px',
//             height: '50px',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginBottom: '-5px'
//           }}>
//             {Math.floor(state.timer / 60)}m {state.timer % 60}s
//           </div>

//           {/* Question Count */}
//           <div style={{
//             position: 'absolute',
//             top: '10px',
//             left: '20px',
//             color: 'white',
//             fontSize: '0.9rem'
//           }}>
//             Question {state.currentQuestion + 1} of {state.questions.length}
//           </div>

//           {/* Difficulty Indicator */}
//           {currentQ && (
//             <div style={{
//               position: 'absolute',
//               top: '10px',
//               right: '20px',
//               color: currentQ.difficulty === 'easy' ? '#4CAF50' : 
//                     currentQ.difficulty === 'medium' ? '#FFC107' : '#F44336',
//               fontSize: '0.9rem',
//               fontWeight: 'bold'
//             }}>
//               {currentQ.difficulty.toUpperCase()}
//             </div>
//           )}

//           {/* Question */}
//           {currentQ && (
//             <div style={{
//               backgroundColor: '#2a2132',
//               color: '#fff',
//               padding: '15px',
//               fontSize: '1.5rem',
//               fontWeight: '600',
//               borderRadius: '8px',
//               textAlign: 'center',
//               width: '100%',
//               marginTop: '10px'
//             }}>
//               {currentQ.question}
//             </div>
//           )}

//           {/* Options */}
//           <div style={{ margin: '20px 0', width: '100%' }}>
//             {currentQ?.options?.map((option, index) => (
//               <motion.div
//                 key={index}
//                 style={{
//                   backgroundColor: state.selectedOption === option ? '#dae90bb5' : '#49334d',
//                   border: '1px solid #7A70ED',
//                   margin: '10px 0',
//                   padding: '10px',
//                   borderRadius: '30px',
//                   textAlign: 'start',
//                   display: 'flex',
//                   alignItems: 'center',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.3s ease-in-out'
//                 }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleOptionSelect(option)}
//               >
//                 <span style={{
//                   backgroundColor: '#7A70ED',
//                   margin: '0 10px',
//                   padding: '6px 11px',
//                   fontSize: '12px',
//                   borderRadius: '50px'
//                 }}>
//                   {String.fromCharCode(65 + index)}
//                 </span>
//                 {option}
//               </motion.div>
//             ))}
//           </div>

//           {/* Navigation Buttons */}
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             width: '100%',
//             marginTop: '20px'
//           }}>
//             <motion.button
//               style={{
//                 padding: '12px 24px',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 borderRadius: '5px',
//                 backgroundColor: '#7A70ED',
//                 color: 'white',
//                 border: 'none',
//                 cursor: 'pointer',
//                 height: '60px',
//                 width: '80px',
//                 opacity: state.currentQuestion === 0 ? 0.5 : 1,
//                 pointerEvents: state.currentQuestion === 0 ? 'none' : 'auto'
//               }}
//               onClick={() => handleNavigation('prev')}
//               whileTap={{ scale: 0.9 }}
//             >
//               Prev
//             </motion.button>

//             {state.currentQuestion < state.questions.length - 1 ? (
//               <motion.button
//                 style={{
//                   padding: '12px 24px',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   borderRadius: '5px',
//                   backgroundColor: '#7A70ED',
//                   color: 'white',
//                   border: 'none',
//                   cursor: 'pointer',
//                   height: '60px',
//                   width: '80px'
//                 }}
//                 onClick={() => handleNavigation('next')}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 Next
//               </motion.button>
//             ) : (
//               <motion.button
//                 style={{
//                   padding: '12px 24px',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   borderRadius: '5px',
//                   backgroundColor: '#7A70ED',
//                   color: 'white',
//                   border: 'none',
//                   cursor: 'pointer',
//                   height: '60px',
//                   width: '80px'
//                 }}
//                 onClick={handleSubmission}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 Submit
//               </motion.button>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default TechnicalMcqs;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useWebLLM from "../hooks/useWebLLM";
import Navbar from "../Components/Navbar";
import Baro from "../Components/baro";
import axios from "axios";

const TechnicalMcqs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fieldName = location.state?.fieldName || "Software Engineering";
  const { generateMCQs, progress, error: llmError, ready } = useWebLLM();

  const [state, setState] = useState({
    loading: true,
    error: null,
    questions: [],
    currentQuestion: 0,
    selectedOption: null,
    answers: {},
    timer: 60,
    isSubmitted: false,
    aiModel: null,
    showQuestions: false,
    score: 0,
    testId: null // Added to track test ID
  });

  // API configuration
  const API_BASE_URL = "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  // Fetch questions from backend
  const fetchQuestions = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/tests/start`,
        { field: fieldName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.success) {
        return {
          questions: response.data.questions,
          testId: response.data.testId,
          timePerQuestion: response.data.timePerQuestion || 60
        };
      }
      throw new Error(response.data.message || "Failed to fetch questions");
    } catch (error) {
      console.error("Error fetching questions:", error);
      // Fallback to local questions if API fails
      return {
        questions: getFallbackQuestions(),
        testId: null,
        timePerQuestion: 60
      };
    }
  };

  // Submit test results to backend
  const submitTestResults = async () => {
    if (!state.testId) return; // Skip if using fallback questions

    try {
      const response = await axios.post(
        `${API_BASE_URL}/tests/submit`,
        {
          testId: state.testId,
          answers: state.answers,
          timeTaken: (state.questions.length * 60) - state.timer
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
  };

  // Calculate score
  const calculateScore = () => {
    let score = 0;
    state.questions.forEach((q, index) => {
      if (state.answers[index] === q.options[q.answer]) {
        score += 1;
      }
    });
    return score;
  };

  // Handle submission
  const handleSubmission = async () => {
    const score = calculateScore();
    setState(prev => ({ ...prev, isSubmitted: true, score }));
    
    // Submit results to backend
    await submitTestResults();
    
    navigate("/scoreboard", { 
      state: { 
        correct: score,
        total: state.questions.length,
        topic: fieldName,
        timeUsed: (state.questions.length * 60) - state.timer,
        testId: state.testId // Pass test ID to scoreboard
      } 
    });
  };

  // Fetch questions with loading delay
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const { questions, testId, timePerQuestion } = await fetchQuestions();
        
        setState(prev => ({
          ...prev,
          loading: false,
          questions,
          testId,
          showQuestions: true,
          timer: questions.length * timePerQuestion
        }));
      } catch (error) {
        console.error("Error loading questions:", error);
        // Fallback to local questions
        setState(prev => ({
          ...prev,
          loading: false,
          questions: getFallbackQuestions(),
          showQuestions: true,
          timer: getFallbackQuestions().length * 60
        }));
      }
    };

    const timer = setTimeout(loadQuestions, 2000); // Shorter loading time for better UX
    return () => clearTimeout(timer);
  }, [fieldName]);

  // Timer logic for quiz
  useEffect(() => {
    if (state.loading || state.isSubmitted || !state.showQuestions) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timer <= 1) {
          clearInterval(timer);
          handleSubmission(); // Auto-submit when time runs out
          return prev;
        }
        return {
          ...prev,
          timer: prev.timer - 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.loading, state.isSubmitted, state.showQuestions]);

  // Loading screen with spinning MockBot logo
  if (state.loading || !state.showQuestions) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#ece8ee'
      }}>
        <div style={{
          width: '150px',
          height: '150px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #5D009F',
          borderRadius: '50%',
          animation: 'spin 2s linear infinite',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span style={{
            color: '#5D009F',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>MockBot</span>
        </div>
        <p style={{ 
          marginTop: '20px', 
          fontFamily: 'Poppins, sans-serif',
          color: '#5D009F'
        }}>
          Preparing your {fieldName} questions...
        </p>
        {progress > 0 && (
          <div style={{
            width: '200px',
            height: '10px',
            backgroundColor: '#e0e0e0',
            borderRadius: '5px',
            marginTop: '20px'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#5D009F',
              borderRadius: '5px',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        )}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

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

  const currentQ = state.questions[state.currentQuestion];

  return (
    <div style={{ 
      margin: 0,
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: '#ece8ee',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <Navbar />
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 120px)',
        paddingTop: '120px',
        paddingBottom: '60px'
      }}>
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
          style={{
            marginLeft: '100px',
            width: '600px',
            minHeight: '400px',
            borderRadius: '8px',
            backgroundColor: '#5D009F',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Timer */}
          <div style={{
            backgroundColor: '#212832',
            color: 'yellow',
            fontSize: '1.2rem',
            padding: '12px',
            borderRadius: '50px 50px 0 0',
            textAlign: 'center',
            width: '120px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '-5px'
          }}>
            {Math.floor(state.timer / 60)}m {state.timer % 60}s
          </div>

          {/* Question Count */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '20px',
            color: 'white',
            fontSize: '0.9rem'
          }}>
            Question {state.currentQuestion + 1} of {state.questions.length}
          </div>

          {/* Difficulty Indicator */}
          {currentQ && (
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '20px',
              color: currentQ.difficulty === 'easy' ? '#4CAF50' : 
                    currentQ.difficulty === 'medium' ? '#FFC107' : '#F44336',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
              {currentQ.difficulty.toUpperCase()}
            </div>
          )}

          {/* Question */}
          {currentQ && (
            <div style={{
              backgroundColor: '#2a2132',
              color: '#fff',
              padding: '15px',
              fontSize: '1.5rem',
              fontWeight: '600',
              borderRadius: '8px',
              textAlign: 'center',
              width: '100%',
              marginTop: '10px'
            }}>
              {currentQ.question}
            </div>
          )}

          {/* Options */}
          <div style={{ margin: '20px 0', width: '100%' }}>
            {currentQ?.options?.map((option, index) => (
              <motion.div
                key={index}
                style={{
                  backgroundColor: state.selectedOption === option ? '#dae90bb5' : '#49334d',
                  border: '1px solid #7A70ED',
                  margin: '10px 0',
                  padding: '10px',
                  borderRadius: '30px',
                  textAlign: 'start',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease-in-out'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOptionSelect(option)}
              >
                <span style={{
                  backgroundColor: '#7A70ED',
                  margin: '0 10px',
                  padding: '6px 11px',
                  fontSize: '12px',
                  borderRadius: '50px'
                }}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '20px'
          }}>
            <motion.button
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '5px',
                backgroundColor: '#7A70ED',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                height: '60px',
                width: '80px',
                opacity: state.currentQuestion === 0 ? 0.5 : 1,
                pointerEvents: state.currentQuestion === 0 ? 'none' : 'auto'
              }}
              onClick={() => handleNavigation('prev')}
              whileTap={{ scale: 0.9 }}
            >
              Prev
            </motion.button>

            {state.currentQuestion < state.questions.length - 1 ? (
              <motion.button
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                  backgroundColor: '#7A70ED',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  height: '60px',
                  width: '80px'
                }}
                onClick={() => handleNavigation('next')}
                whileTap={{ scale: 0.9 }}
              >
                Next
              </motion.button>
            ) : (
              <motion.button
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                  backgroundColor: '#7A70ED',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  height: '60px',
                  width: '80px'
                }}
                onClick={handleSubmission}
                whileTap={{ scale: 0.9 }}
              >
                Submit
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Keep the getFallbackQuestions function as before
const getFallbackQuestions = () => {
  return [
    {id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    answer: 0,
    difficulty: "easy"
  },{
            question: "Which of these is NOT a programming language?",
            options: ["Python", "Java", "HTML", "C++"],
            answer: 2,
            difficulty: "easy"
          },
          {
            question: "What is the correct file extension for Python files?",
            options: [".pt", ".pyt", ".py", ".python"],
            answer: 2,
            difficulty: "easy"
          },
          {
            question: "Which symbol is used for single-line comments in JavaScript?",
            options: ["//", "/*", "#", "--"],
            answer: 0,
            difficulty: "easy"
          },
          {
            question: "What does CSS stand for?",
            options: [
              "Creative Style Sheets",
              "Computer Style Sheets",
              "Cascading Style Sheets",
              "Colorful Style Sheets"
            ],
            answer: 2,
            difficulty: "easy"
          },
          {
            question: "Which of these is a JavaScript framework?",
            options: ["Django", "Laravel", "React", "Flask"],
            answer: 2,
            difficulty: "easy"
          },
          {
            question: "What does API stand for?",
            options: [
              "Application Programming Interface",
              "Advanced Programming Interface",
              "Automated Programming Interface",
              "Application Process Integration"
            ],
            answer: 0,
            difficulty: "easy"
          },
          {
            question: "Which data type is used to store true/false values?",
            options: ["String", "Boolean", "Integer", "Float"],
            answer: 1,
            difficulty: "easy"
          },
          {
            question: "What does SQL stand for?",
            options: [
              "Structured Query Language",
              "Simple Query Language",
              "Standard Query Language",
              "System Query Language"
            ],
            answer: 0,
            difficulty: "easy"
          },
          {
            question: "Which operator is used for equality comparison in JavaScript?",
            options: ["==", "=", "===", "!="],
            answer: 2,
            difficulty: "easy"
          },
    
          // 15 Medium Questions
          {
            question: "What is the time complexity of a binary search algorithm?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
            answer: 2,
            difficulty: "medium"
          },
          {
            question: "Which design pattern ensures only one instance of a class exists?",
            options: [
              "Factory Pattern",
              "Singleton Pattern",
              "Observer Pattern",
              "Decorator Pattern"
            ],
            answer: 1,
            difficulty: "medium"
          },
          {
            question: "What is the purpose of the 'virtual DOM' in React?",
            options: [
              "To improve security",
              "To optimize performance",
              "To enable server-side rendering",
              "To simplify state management"
            ],
            answer: 1,
            difficulty: "medium"
          },
          {
            question: "Which HTTP status code means 'Not Found'?",
            options: ["200", "302", "404", "500"],
            answer: 2,
            difficulty: "medium"
          },
          {
            question: "What is the main advantage of using RESTful APIs?",
            options: [
              "They are faster than SOAP",
              "They use less bandwidth",
              "They are stateless and scalable",
              "They support binary data transfer"
            ],
            answer: 2,
            difficulty: "medium"
          },
          {
            question: "Which of these is NOT a NoSQL database?",
            options: ["MongoDB", "Cassandra", "PostgreSQL", "Redis"],
            answer: 2,
            difficulty: "medium"
          },
          {
            question: "What is the purpose of Docker containers?",
            options: [
              "To virtualize hardware",
              "To package and isolate applications",
              "To manage database connections",
              "To optimize network traffic"
            ],
            answer: 1,
            difficulty: "medium"
          },
          {
            question: "Which testing approach tests individual components in isolation?",
            options: [
              "Integration testing",
              "Unit testing",
              "System testing",
              "Acceptance testing"
            ],
            answer: 1,
            difficulty: "medium"
          },
          {
            question: "What is the purpose of the 'git rebase' command?",
            options: [
              "To merge branches",
              "To rewrite commit history",
              "To create a new branch",
              "To undo the last commit"
            ],
            answer: 1,
            difficulty: "medium"
          },
          {
            question: "Which principle states that a class should have only one reason to change?",
            options: [
              "DRY Principle",
              "KISS Principle",
              "SOLID Principle",
              "YAGNI Principle"
            ],
            answer: 2,
            difficulty: "medium"
          },
          {
            question: "What does CORS stand for in web development?",
            options: [
              "Cross-Origin Resource Sharing",
              "Centralized Origin Request System",
              "Common Object Request Standard",
              "Cross-Origin Request Security"
            ],
            answer: 0,
            difficulty: "medium"
          },
          {
            question: "Which algorithm is used for shortest path finding in graphs?",
            options: [
              "Bubble Sort",
              "Dijkstra's Algorithm",
              "Quick Sort",
              "Binary Search"
            ],
            answer: 1,
            difficulty: "medium"
          },
          {
            question: "What is the purpose of the 'use strict' directive in JavaScript?",
            options: [
              "To enable ES6 features",
              "To enforce stricter parsing and error handling",
              "To improve performance",
              "To enable type checking"
            ],
            answer: 1,
            difficulty: "medium"
          },
          {
            question: "Which of these is a microservices communication protocol?",
            options: ["gRPC", "HTML", "CSS", "SQL"],
            answer: 0,
            difficulty: "medium"
          },
          {
            question: "What is the main purpose of the Observer pattern?",
            options: [
              "To create objects without specifying the exact class",
              "To define a one-to-many dependency between objects",
              "To add responsibilities to objects dynamically",
              "To provide a unified interface to a set of interfaces"
            ],
            answer: 1,
            difficulty: "medium"
          },
    
          // 25 Hard Questions
          {
            question: "What is the time complexity of the Floyd-Warshall algorithm?",
            options: ["O(n)", "O(n²)", "O(n³)", "O(n log n)"],
            answer: 2,
            difficulty: "hard"
          },
          {
            question: "Which of these is NOT a CAP theorem tradeoff?",
            options: [
              "Consistency",
              "Availability",
              "Partition tolerance",
              "Durability"
            ],
            answer: 3,
            difficulty: "hard"
          },
          {
            question: "What is the purpose of the Paxos algorithm?",
            options: [
              "Sorting large datasets",
              "Achieving consensus in distributed systems",
              "Compressing data",
              "Encrypting network traffic"
            ],
            answer: 1,
            difficulty: "hard"
          },
          {
            question: "Which of these is NOT a characteristic of functional programming?",
            options: [
              "Immutable data",
              "Pure functions",
              "Side effects",
              "First-class functions"
            ],
            answer: 2,
            difficulty: "hard"
          },
          {
            question: "What does the 'S' stand for in the SOLID principles?",
            options: [
              "Single Responsibility Principle",
              "Stable Dependencies Principle",
              "Secure Coding Principle",
              "Static Typing Principle"
            ],
            answer: 0,
            difficulty: "hard"
          },
          {
            question: "Which of these is NOT a common cache invalidation strategy?",
            options: [
              "Write-through",
              "Write-behind",
              "Write-around",
              "Write-over"
            ],
            answer: 3,
            difficulty: "hard"
          },
          {
            question: "What is the main purpose of the Circuit Breaker pattern?",
            options: [
              "To prevent cascading failures in distributed systems",
              "To optimize database queries",
              "To secure API endpoints",
              "To manage memory allocation"
            ],
            answer: 0,
            difficulty: "hard"
          },
          {
            question: "Which of these is NOT a common distributed consensus algorithm?",
            options: ["Paxos", "Raft", "MapReduce", "ZAB"],
            answer: 2,
            difficulty: "hard"
          },
          {
            question: "What is the main advantage of using GraphQL over REST?",
            options: [
              "Faster network performance",
              "Built-in caching",
              "Client-specified data requirements",
              "Better security"
            ],
            answer: 2,
            difficulty: "hard"
          },
          {
            question: "Which of these is NOT a common garbage collection algorithm?",
            options: [
              "Mark-and-sweep",
              "Reference counting",
              "Generational collection",
              "Pointer arithmetic"
            ],
            answer: 3,
            difficulty: "hard"
          },
          {
            question: "What is the main purpose of the Bloom filter data structure?",
            options: [
              "To test whether an element is a member of a set",
              "To sort elements efficiently",
              "To compress data",
              "To encrypt messages"
            ],
            answer: 0,
            difficulty: "hard"
          },
          {
            question: "Which of these is NOT a common database indexing technique?",
            options: [
              "B-tree",
              "Hash index",
              "Bitmap index",
              "Linear scan"
            ],
            answer: 3,
            difficulty: "hard"
          },
          {
            question: "What is the main purpose of the Strangler Fig pattern?",
            options: [
              "To gradually replace a legacy system",
              "To optimize database queries",
              "To secure API endpoints",
              "To manage memory allocation"
            ],
            answer: 0,
            difficulty: "hard"
          },
          {
            question: "Which of these is NOT a common message queue protocol?",
            options: ["AMQP", "MQTT", "STOMP", "HTTPS"],
            answer: 3,
            difficulty: "hard"
          },
          {
            question: "What is the main purpose of the CQRS pattern?",
            options: [
              "To separate read and write operations",
              "To optimize database queries",
              "To secure API endpoints",
              "To manage memory allocation"
            ],
            answer: 0,
            difficulty: "hard"
          },
          {
            question: "Which of these is NOT a common database sharding strategy?",
            options: [
              "Range-based sharding",
              "Hash-based sharding",
              "Directory-based sharding",
              "Index-based sharding"
            ],
            answer: 3,
            difficulty: "hard"
          },
          {
            question: "What is the main purpose of the Saga pattern?",
            options: [
              "To manage distributed transactions",
              "To optimize database queries",
              "To secure API endpoints",
              "To manage memory allocation"
            ],
            answer: 0,
            difficulty: "hard"
          },
          {
            question: "Which of these is NOT a common load balancing algorithm?",
            options: [
              "Round robin",
              "Least connections",
              "IP hash",
              "Binary search"
            ],
            answer: 3,
            difficulty: "hard"
          },
          {
            question: "What is the main purpose of the Event Sourcing pattern?",
            options: [
              "To persist state changes as a sequence of events",
              "To optimize database queries",
              "To secure API endpoints",
              "To manage memory allocation"
            ],
            answer: 0,
            difficulty: "hard"
          },
          {
            question: "Which of these is NOT a common concurrency control mechanism?",
            options: [
              "Optimistic locking",
              "Pessimistic locking",
              "Multiversion concurrency control",
              "Singlethreaded execution"
            ],
            answer: 3,
            difficulty: "hard"
          },
          {
            question: "What is the main purpose of the Sidecar pattern?",
            options: [
              "To deploy helper components alongside main components",
              "To optimize database queries",
              "To secure API endpoints",
              "To manage memory allocation"
            ],
            answer: 0,
            difficulty: "hard"
          },
          {
            question: "Which of these is NOT a common API authentication method?",
            options: [
              "OAuth 2.0",
              "JWT",
              "Basic Auth",
              "TCP handshake"
            ],
            answer: 3,
            difficulty: "hard"
          },
          {
            question: "What is the main purpose of the Bulkhead pattern?",
            options: [
              "To isolate failures in one part of a system",
              "To optimize database queries",
              "To secure API endpoints",
              "To manage memory allocation"
            ],
            answer: 0,
            difficulty: "hard"
          },
          {
            question: "Which of these is NOT a common database replication strategy?",
            options: [
              "Master-slave replication",
              "Multi-master replication",
              "Peer-to-peer replication",
              "Single-node replication"
            ],
            answer: 3,
            difficulty: "hard"
          },
          {
            question: "What is the main purpose of the Backpressure pattern?",
            options: [
              "To handle data streams where the producer is faster than the consumer",
              "To optimize database queries",
              "To secure API endpoints",
              "To manage memory allocation"
            ],
            answer: 0,
            difficulty: "hard"
          }]
};

export default TechnicalMcqs;