import React from "react";
import "./TechnicalScreen.css";
import { Link } from "react-router-dom";

function TechnicalScreen() {
  const technicalFields = [
    "Business Analyst",
    "Product Manager",
    "Software Engineer",
    "Marketing Specialist",
    "Customer Service Representative",
    "Sales Representative",
    "Human Resources Specialist",
    "Data Analyst",
    "UX/UI Designer",
    "QA Engineer",
  ];

  return (
    <div className="job-selection-container">
      <header className="mock-header">
        <div className="mock-logo">
          <h1>
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/userpage">
              MockBot
            </Link>
          </h1>
        </div>
      </header>
      <main className="job-selection">
        <h2>Select any IT Technical Field</h2>
        <div className="job-options">
          {technicalFields.map((field) => (
            <Link
              key={field}
              style={{ textDecoration: "none", color: "inherit" }}
              to={{
                pathname: "/TechnicalMcqs",
                state: { fieldName: field }, // Pass selected field
              }}
            >
              <button className="job-option">{field}</button>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default TechnicalScreen;