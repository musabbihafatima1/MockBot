import React, { useState, useEffect } from 'react';
import './Eq.css';

function Eqmcqs() {
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Sample information for the typewriter effect
  const mcqList = [
    "Prepare for job interviews with AI-powered EQ MCQs designed to enhance your emotional intelligence.",
    "Assess your skills in self-awareness, empathy, and interpersonal communication.",
    "Challenge yourself with various difficulty levels and monitor your progress.",
    "Receive instant feedback on your responses to boost your emotional competency.",
    "Stay informed about the latest trends in emotional intelligence for successful interviews."
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
    <div className="eq-page-wrapper">
      {/* Main Container */}
      <div className="eq-content-wrapper">
        {/* Left Column with Heading and Text */}
        <div className="eq-text-area">
          <h1 className="eq-title">Step 3: Take AI-powered Emotional Qoutient MCQs</h1>
          <p className="eq-description">
          Enhance your emotional intelligence with AI-generated EQ MCQs. Build self-awareness and interpersonal skills to confidently tackle workplace challenges and excel in interviews!
          </p>
        </div>

        {/* Right Column with MCQ typewriter effect */}
        <div className="eq-mcq-area">
          <div className="eq-mcq-box">
            <div className="eq-mcq-text">{typedText}</div> {/* Updated to show typed text */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Eqmcqs;
