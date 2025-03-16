import React, { useState, useEffect } from 'react';
import './Technicalmcqs.css';

function Technicalmcqs() {
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Sample information for the typewriter effect
  const mcqList = [
    "Prepare for job interviews with AI-powered technical MCQs tailored to sharpen your IT skills.",
    "Test your knowledge in areas like JavaScript, HTML, CSS, databases, and more.",
    "Challenge yourself with different difficulty levels and track your performance.",
    "Gain real-time feedback on your answers and get ready for top company interviews.",
    "Stay updated with the latest trends and questions in technical interviews."
  ];

  // Typewriter effect
  useEffect(() => {
    const currentText = mcqList[textIndex];
    
    if (charIndex < currentText.length) {
      setTimeout(() => {
        setTypedText(typedText + currentText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 70); // Speed of typing (in ms)
    } else {
      setTimeout(() => {
        // Move to the next text or loop back to the beginning
        setTextIndex((textIndex + 1) % mcqList.length);
        setTypedText('');
        setCharIndex(0);
      }, 2000); // Pause after full sentence is typed out before looping
    }
  }, [typedText, charIndex, textIndex]);

  return (
    <div className="page-container">
      {/* Main Heading */}
      <h1 className="heading">How it works?</h1>
      <p className="subheading2">Become interview-ready with AI live support</p>

      {/* Main Container */}
      <div className="container">
        {/* Left Column with Heading and Text */}
        <div className="left-content">
          <h1 className="main-heading">Step 1: Take AI-powered IT MCQs</h1>
          <p className="subheading">
            Use AI-generated technical MCQs to sharpen your IT skills. With tailored questions designed to boost your confidence, you'll be ready to succeed in no time. Test your knowledge in areas that matter most for tech interviews!
          </p>
        </div>

        {/* Right Column with MCQ typewriter effect */}
        <div className="right-content">
          <div className="mcq-section">
            <div className="mcq-display">{typedText}</div> {/* Updated to show typed text */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Technicalmcqs;
