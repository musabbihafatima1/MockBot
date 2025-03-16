// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Navbar from "../Components/Navbar"; // Separate Navbar component
// import Baro from "../Components/baro"; // Sidebar component
// import clickSound from "../Assets/click.mp3"; // Placeholder for sound

// const App = () => {
//   const [timer, setTimer] = useState(60);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const navigate = useNavigate();
//   const audio = new Audio(clickSound);

//   const questions = [
//     {
//       question: "What does UI stand for in UI/UX design?",
//       options: ["User Interaction", "User Integration", "User Interface", "Universal Interface"],
//     },
//     {
//       question: "Which principle is essential in UX design for ensuring ease of use?",
//       options: ["Consistency", "Aesthetics", "Flexibility", "Adaptability"],
//     },
//     {
//       question: "Which color scheme is typically used to ensure accessibility for visually impaired users?",
//       options: ["Monochromatic", "High Contrast", "Triadic", "Muted Colors"],
//     },
//     {
//       question: "What is the main goal of a wireframe in UI/UX design?",
//       options: ["To add animations", "To determine the color scheme", "To outline the layout and structure", "To finalize the typography"],
//     },
//     {
//       question: "Which of the following tools is commonly used for prototyping in UI/UX design?",
//       options: ["Adobe Lightroom", "Figma", "Visual Studio Code", "Blender"],
//     },
//   ];

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

//   const handleSubmit = () => {
//     setIsSubmitted(true);
//     const correctAnswers = ["User Interface", "Consistency", "High Contrast", "To outline the layout and structure", "Figma"];
//     let correctCount = 0;

//     if (selectedOption === correctAnswers[currentQuestion]) {
//       correctCount++;
//     }

//     navigate("/scoreboard", {
//       state: {
//         correct: correctCount,
//         totalQuestions: questions.length,
//       },
//     });
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
//           <div style={{ backgroundColor: "#2a2132", color: "#fff", padding: "15px", fontSize: "1.5rem", fontWeight: "600", borderRadius: "8px", textAlign: "center", width: "100%" }}>
//             {questions[currentQuestion].question}
//           </div>

//           {/* Options */}
//           <div style={{ margin: "20px 0", width: "100%" }}>
//             {questions[currentQuestion].options.map((option, index) => (
//               <motion.div
//                 key={index}
//                 style={{ backgroundColor: "#49334d", border: "1px solid #7A70ED", margin: "10px 0", padding: "10px", borderRadius: "30px", textAlign: "start", display: "flex", alignItems: "center", cursor: "pointer", transition: "background-color 0.3s ease-in-out", ...(selectedOption === option && { backgroundColor: "#dae90bb5" }) }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => {
//                   setSelectedOption(option);
//                   playSound();
//                 }}
//               >
//                 <span style={{ backgroundColor: "#7A70ED", margin: "0 10px", padding: "6px 11px", fontSize: "12px", borderRadius: "50px" }}>
//                   {String.fromCharCode(65 + index)}
//                 </span>
//                 {option}
//               </motion.div>
//             ))}
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
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar"; // Separate Navbar component
import Baro from "../Components/baro"; // Sidebar component
import clickSound from "../Assets/click.mp3"; // Placeholder for sound
import axios from "axios"; // Import axios for API requests

const App = () => {
  const [timer, setTimer] = useState(60);
  const [questions, setQuestions] = useState([]); // Empty array to store questions fetched from backend
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const audio = new Audio(clickSound);

  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/generate-questions"); // Adjust URL to your backend API
        setQuestions(response.data.questions); // Assuming the API response has 'questions' as the key
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Timer functionality
  useEffect(() => {
    if (!isSubmitted && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timer, isSubmitted]);

  const playSound = () => {
    audio.play();
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOption(null);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);

    try {
      // Submit selected answer to the backend for evaluation
      const response = await axios.post("http://your-backend-url.com/api/submit", {
        questionId: questions[currentQuestion]._id, // Assuming each question has an '_id' field
        selectedOption: selectedOption,
      });

      const { correctCount } = response.data;

      // Navigate to scoreboard after submission
      navigate("/scoreboard", {
        state: {
          correct: correctCount,
          totalQuestions: questions.length,
        },
      });
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div style={{ margin: 0, fontFamily: "Poppins, sans-serif", backgroundColor: "#ece8ee", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", overflow: "hidden" }}>
      <Navbar />
      <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(60vh - 30px)", paddingTop: "120px", paddingBottom: "60px" }}>
        {/* Sidebar */}
        <Baro
          questions={questions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />

        {/* Main Quiz Content */}
        <motion.div
          style={{ marginLeft:"100px", width: "600px", minHeight: "400px", borderRadius: "8px", backgroundColor: "#5D009F", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Timer Centered */}
          <div style={{ backgroundColor: "#212832", color: "yellow", fontSize: "1.2rem", padding: "12px", borderRadius: "50px 50px 0 0", textAlign: "center", width: "100px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "-5px" }}>
            {timer}s
          </div>

          {/* Question */}
          {questions.length > 0 && (
            <div style={{ backgroundColor: "#2a2132", color: "#fff", padding: "15px", fontSize: "1.5rem", fontWeight: "600", borderRadius: "8px", textAlign: "center", width: "100%" }}>
              {questions[currentQuestion].question}
            </div>
          )}

          {/* Options */}
          <div style={{ margin: "20px 0", width: "100%" }}>
            {questions.length > 0 &&
              questions[currentQuestion].options.map((option, index) => (
                <motion.div
                  key={index}
                  style={{ backgroundColor: "#49334d", border: "1px solid #7A70ED", margin: "10px 0", padding: "10px", borderRadius: "30px", textAlign: "start", display: "flex", alignItems: "center", cursor: "pointer", transition: "background-color 0.3s ease-in-out", ...(selectedOption === option && { backgroundColor: "#dae90bb5" }) }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedOption(option);
                    playSound();
                  }}
                >
                  <span style={{ backgroundColor: "#7A70ED", margin: "0 10px", padding: "6px 11px", fontSize: "12px", borderRadius: "50px" }}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </motion.div>
              ))}
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
            <motion.button
              style={{ padding: "12px 24px", fontSize: "16px", fontWeight: "bold", borderRadius: "5px", backgroundColor: "#7A70ED", color: "white", border: "none", cursor: "pointer", height: "60px", width: "80px", ...(currentQuestion === 0 || isSubmitted && { opacity: 0.5, pointerEvents: "none" }) }}
              onClick={handlePrev}
              disabled={currentQuestion === 0 || isSubmitted}
              whileTap={{ scale: 0.9 }}
            >
              Prev
            </motion.button>

            <motion.button
              style={{ padding: "12px 24px", fontSize: "16px", fontWeight: "bold", borderRadius: "5px", backgroundColor: "#7A70ED", color: "white", border: "none", cursor: "pointer", height: "60px", width: "80px", ...(currentQuestion < questions.length - 1 ? {} : { display: "none" }), ...(!selectedOption || isSubmitted && { opacity: 0.5, pointerEvents: "none" }) }}
              onClick={handleNext}
              disabled={!selectedOption || isSubmitted}
              whileTap={{ scale: 0.9 }}
            >
              Next
            </motion.button>

            <motion.button
              style={{ padding: "12px 24px", fontSize: "16px", fontWeight: "bold", borderRadius: "5px", backgroundColor: "#7A70ED", color: "white", border: "none", cursor: "pointer", height: "60px", width: "80px", ...(currentQuestion === questions.length - 1 ? {} : { display: "none" }), ...(!selectedOption || isSubmitted && { opacity: 0.5, pointerEvents: "none" }) }}
              onClick={handleSubmit}
              disabled={!selectedOption || isSubmitted}
              whileTap={{ scale: 0.9 }}
            >
              Submit
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;

