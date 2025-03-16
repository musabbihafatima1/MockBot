// src/pages/EQPage.js
import React from "react";
import "./Instrunctions.css";
import { Link } from "react-router-dom";

const EQPage = () => {
  const content = {
    title: "Emotional Quotient (EQ)",
    steps: [
      {
        number: 1,
        title: "Emotional Quotient MCQs",
        description:
          "Answer multiple-choice questions designed to measure your emotional quotient.",
      },
      {
        number: 2,
        title: "Timed Questions",
        description:
          "Each question is timed, and your response speed contributes to your Emotional Quotient score.",
      },
      {
        number: 3,
        title: "Score Calculation",
        description:
          "Your EQ score is calculated based on the accuracy and speed of your responses.",
      },
      {
        number: 4,
        title: "Results Storage",
        description:
          "Your test results are stored in your profile for future review and analysis.",
      },
    ],
    quizPath: "/eqquiz",
  };

  return (
    <div className="how-it-works">
      {/* Back Arrow */}
      <div className="back-arrow">
        <Link to="/userpage">← </Link>
      </div>

      {/* Content */}
      <h2 className="subtitle">{content.title}</h2>
      <div className="steps">
        {content.steps.map((step) => (
          <div className="step" key={step.number}>
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Start Button */}
      <div className="start-button">
        <Link to={content.quizPath}>
          <button>Start</button>
        </Link>
      </div>
    </div>
  );
};

export default EQPage;