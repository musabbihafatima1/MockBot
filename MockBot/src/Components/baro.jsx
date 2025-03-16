import React from "react";
import "./baro.css";

const Baro = ({ questions, currentQuestion, setCurrentQuestion }) => {
  return (
    <div className="questionbar">
      {questions.map((q, index) => (
        <div
          key={index}
          className={`sidebar-item ${index === currentQuestion ? "active" : ""}`}
          onClick={() => setCurrentQuestion(index)}
        >
          {index + 1}. {q.question.substring(0, 15)}...
        </div>
      ))}
    </div>
  );
};

export default Baro;