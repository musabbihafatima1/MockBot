// import React from "react";
// import "./baro.css";

// const Baro = ({ questions, currentQuestion, setCurrentQuestion }) => {
//   return (
//     <div className="questionbar">
//       {questions.map((q, index) => (
//         <div
//           key={index}
//           className={`sidebar-item ${index === currentQuestion ? "active" : ""}`}
//           onClick={() => setCurrentQuestion(index)}
//         >
//           {index + 1}. {q.question.substring(0, 15)}...
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Baro;
import React from "react";
import "./baro.css";

const Baro = ({ questions, currentQuestion, setCurrentQuestion }) => {
  if (!questions || questions.length === 0) {
    return null; // handle if no questions passed
  }

  return (
    <div className="questionbar">
      {questions.map((q, index) => (
        <div
          key={index}
          className={`sidebar-item ${index === currentQuestion ? "active" : ""}`}
          onClick={() => setCurrentQuestion(index)}
        >
          {index + 1}. {q.questionText?.substring(0, 15) || q.question?.substring(0, 15)}...
        </div>
      ))}
    </div>
  );
};

export default Baro;