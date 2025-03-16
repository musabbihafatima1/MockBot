// src/pages/TechnicalPage.js
import React from "react";
import "./Instrunctions.css";
import { Link } from "react-router-dom";

const TechnicalPage = () => {
  const content = {
    title: "Technical Skills",
    steps: [
      {
        number: 1,
        title: "Technical MCQs",
        description:
          "Answer AI-generated multiple-choice questions related to your chosen technical field.",
      },
      {
        number: 2,
        title: "Field Selection",
        description:
          "Select a technical field to generate related multiple-choice questions.",
      },
      {
        number: 3,
        title: "Submission & Scoring",
        description:
          "Submit your answers after completing the test and receive your score.",
      },
    ],
    quizPath: "/Technical",
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

export default TechnicalPage;