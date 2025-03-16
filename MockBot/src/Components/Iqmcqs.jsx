import React, { useState, useEffect } from 'react';
import './Iq.css';

function Iqmcqs() {
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Sample information for the typewriter effect
  const mcqList = [
    "Enhance your interview readiness with AI-powered IQ MCQs designed to boost logical reasoning and problem-solving skills.",
    "Test your cognitive abilities with questions covering pattern recognition, critical thinking, and analytical reasoning.",
    "Tackle varying levels of difficulty and monitor your progress as you improve.",
    "Receive instant feedback on your responses to refine your strategy and timing.",
    "Stay sharp with the latest IQ challenges that align with top industry interview standards."
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
    <div className="iq-page-container">
      {/* Main Container */}
      <div className="iq-main-container">
        {/* Left Column with MCQ typewriter effect */}
        <div className="iq-mcq-content">
          <div className="iq-mcq-section">
            <div className="iq-mcq-display">{typedText}</div>
          </div>
        </div>

        {/* Right Column with Heading and Text */}
        <div className="iq-text-content">
          <h1 className="iq-heading"> Step 2: Take AI-powered Intelligent Qoutient MCQs</h1>
          <p className="iq-subheading">
          Prepare for interviews with AI-driven IQ MCQs that enhance problem-solving and cognitive skills, offering instant feedback and progress tracking. Perfect for technical job candidates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Iqmcqs;
