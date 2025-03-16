import React from 'react';
import './Interviewscreen.css';

const InterviewScreen = () => {
  return (
    <div className="interview-container">
      <div className="left-section">
        <h1>Make your next job interview stress-free  <br/> Thanks to AI</h1>
      </div>

      <div className="right-section">
        <div className="interview-comparison">
          <h4>Without Interviews by AI</h4>
          <h4>With Interviews by AI</h4>
        </div>
        <div className="comparison-row">
          <div className="without-ai">
            <span className="cross-icon">✖</span> Unprepared
          </div>
          <div className="arrow">→</div>
          <div className="with-ai">
            <span className="check-icon">✔</span> Organized and ready
          </div>
        </div>

        <div className="comparison-row">
          <div className="without-ai">
            <span className="cross-icon">✖</span> Nervous
          </div>
          <div className="arrow">→</div>
          <div className="with-ai">
            <span className="check-icon">✔</span> Confident answers
          </div>
        </div>

        <div className="comparison-row">
          <div className="without-ai">
            <span className="cross-icon">✖</span> Ghosted
          </div>
          <div className="arrow">→</div>
          <div className="with-ai">
            <span className="check-icon">✔</span> Receive final offers
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewScreen;
