import React, { useState, useEffect } from 'react';
import './Homepage.css'; 
import { Link } from 'react-router-dom';

function App() {
  const [answerIndex, setAnswerIndex] = useState(null); // Initialize as null
  const [visibleOptions, setVisibleOptions] = useState([]);

  // Question and MCQ options
  const question = "Can you work with JavaScript?";
  const options = [
    'Yes, I can build websites using JavaScript.',
    'No, I am not familiar with JavaScript.',
    'I have basic knowledge of JavaScript.',
  ];

  // Typewriter effect for options (only runs once)
  useEffect(() => {
    setVisibleOptions(options.slice(0, 3)); // Limit options to the first three elements
  }, [options]);

  const handleAnswerChange = (e) => {
    setAnswerIndex(parseInt(e.target.value));
  };

  return (
    <div className="app">
      {/* Gradient Background */}
      <div className="gradient-background"></div> {/* Added background */}

      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>MockBot</h1>
        </div>
        <div className="login-section">
          <button className="signup-btn" ><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/selection'>Signup</Link></button>
          <button className="login-btn"><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/selection'>Login</Link></button>
        </div>
      </header>

      {/* Main Section */}
      <main className="main">
        {/* Left Side - White Background */}
        <div className="left-side">
          <div className="content">
            <h1>
              Crush <span>Every Question</span>
            </h1>
            <p>Prepare for an upcoming interview with the power of AI.</p>
            <button className="cta-btn"><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/selection'>Start now ✦ free</Link></button>
          </div>
        </div>

        {/* Right Side - Gradient Background */}
        <div className="right-side">
          {/* Floating Answer Box */}
          <div className="answer-box">
            <div className="question">"{question}"</div>
            <div className="personal-answer">
              <p>Your Personalized Answer...</p>
              {/* Display MCQ options with a static list */}
              {visibleOptions.map((option, index) => (
                <label key={index} className="mcq-option">
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={answerIndex === index}
                    onChange={handleAnswerChange}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
