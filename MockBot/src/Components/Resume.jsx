import React, { useState, useEffect } from 'react';
import './Resume.css';

function Resume() {
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Sample information for the typewriter effect
  const resumeTips = [
    "Convert your resume to PDF format to maintain consistent formatting across all platforms.",
    "Ensure your resume is ATS-compatible to increase your chances of passing initial screening filters.",
    "Use an Applicant Tracking System (ATS) analysis tool to optimize your resume for software used by many employers.",
    "Standardize the structure of your resume to align with formatting standards and make it more readable for recruiters.",
    "Improve your resume's visibility by tailoring it for compatibility with screening software recruiters use."
  ];

  // Typewriter effect
  useEffect(() => {
    const currentText = resumeTips[textIndex];
    
    if (charIndex < currentText.length) {
      setTimeout(() => {
        setTypedText(typedText + currentText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 70); // Speed of typing (in ms)
    } else {
      setTimeout(() => {
        // Move to the next text or loop back to the beginning
        setTextIndex((textIndex + 1) % resumeTips.length);
        setTypedText('');
        setCharIndex(0);
      }, 2000); // Pause after full sentence is typed out before looping
    }
  }, [typedText, charIndex, textIndex]);

  return (
    <div className="resume-page-container">
      {/* Main Container */}
      <div className="resume-main-container">
        {/* Left Column with Resume Tips typewriter effect */}
        <div className="resume-tips-content">
          <div className="resume-tips-section">
            <div className="resume-tips-display">{typedText}</div>
          </div>
        </div>

        {/* Right Column with Heading and Text */}
        <div className="resume-text-content">
          <h1 className="resume-heading"> Step 4: Resume Optimization</h1>
          <p className="resume-subheading">
          Optimize your resume with our PDF converter and ATS checker to boost your chances of passing employer screenings and landing interviews.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Resume;
