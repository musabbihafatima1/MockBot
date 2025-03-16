import React from 'react';
import Quiz from '../Components/Quiziq.jsx';
import q1 from "../Pictures/Imageone.jpeg";
import option1q1 from '../Pictures/o1.jpeg';
import option2q1 from '../Pictures/1o2.jpeg';
import option3q1 from '../Pictures/1o3.jpeg';
import option4q1 from '../Pictures/1o4.jpeg';
import option5q1 from '../Pictures/1o5.jpeg';
import q2 from "../Pictures/questiontwo.png";
import q2op1 from "../Pictures/q2o1.png";
import q2op2 from "../Pictures/q2o2.png";
import q2op3 from "../Pictures/q2o3.png";
import q2op4 from "../Pictures/q2o4.png";
import q2op5 from "../Pictures/q2o5.png";
import q2op6 from "../Pictures/q2o6.png";
import q3 from "../Pictures/questionthree.png";
import q3op1 from "../Pictures/q3o1.png";
import q3op2 from "../Pictures/q3o2.png";
import q3op3 from "../Pictures/q3o3.png";
import q3op4 from "../Pictures/q3o4.png";
import q3op5 from "../Pictures/q3o5.png";
import q3op6 from "../Pictures/q3o6.png";
import q4 from "../Pictures/questionfour.png";
import q4op1 from "../Pictures/q4o1.png";
import q4op2 from "../Pictures/q4o2.png";
import q4op3 from "../Pictures/q4o3.png";
import q4op4 from "../Pictures/q4o4.png";
import q4op5 from "../Pictures/q4o5.png";
import q4op6 from "../Pictures/q4o6.png";
import q5 from "../Pictures/questionfive.png";
import q5op1 from "../Pictures/q5o1.png";
import q5op2 from "../Pictures/q5o2.png";
import q5op3 from "../Pictures/q5o3.png";
import q5op4 from "../Pictures/q5o4.png";
import q5op5 from "../Pictures/q5o5.png";
import q5op6 from "../Pictures/q5o6.png";
import q6 from "../Pictures/questionsix.png";
import q6op1 from "../Pictures/q6o1.png";
import q6op2 from "../Pictures/q6o2.png";
import q6op3 from "../Pictures/q6o3.png";
import q6op4 from "../Pictures/q6o4.png";
import q6op5 from "../Pictures/q6o5.png";
import q6op6 from "../Pictures/q6o6.png";
import q7 from "../Pictures/questionseven.png";
import q7op1 from "../Pictures/q7o1.png";
import q7op2 from "../Pictures/q7o2.png";
import q7op3 from "../Pictures/q7o3.png";
import q7op4 from "../Pictures/q7o4.png";
import q7op5 from "../Pictures/q7o5.png";
import q7op6 from "../Pictures/q7o6.png";
import q8 from "../Pictures/questioneight.png";
import q8op1 from "../Pictures/q8o1.png";
import q8op2 from "../Pictures/q8o2.png";
import q8op3 from "../Pictures/q8o3.png";
import q8op4 from "../Pictures/q8o4.png";
import q8op5 from "../Pictures/q8o5.png";
import q8op6 from "../Pictures/q8o6.png";
import q9 from "../Pictures/questionnine.png";
import q9op1 from "../Pictures/q9o1.png";
import q9op2 from "../Pictures/q9o2.png";
import q9op3 from "../Pictures/q9o3.png";
import q9op4 from "../Pictures/q9o4.png";
import q9op5 from "../Pictures/q9o5.png";
import q9op6 from "../Pictures/q9o6.png";
import q10 from "../Pictures/questionten.png";
import q10op1 from "../Pictures/q10o1.png";
import q10op2 from "../Pictures/q10o2.png";
import q10op3 from "../Pictures/q10o3.png";
import q10op4 from "../Pictures/q10o4.png";
import q10op5 from "../Pictures/q10o5.png";
import q10op6 from "../Pictures/q10o6.png";
import q11 from "../Pictures/questioneleven.png";
import q11op1 from "../Pictures/q11o1.png";
import q11op2 from "../Pictures/q11o2.png";
import q11op3 from "../Pictures/q11o3.png";
import q11op4 from "../Pictures/q11o4.png";
import q11op5 from "../Pictures/q11o5.png";
import q11op6 from "../Pictures/q11o6.png";
import q12 from "../Pictures/questiontwelve.png";
import q12op1 from "../Pictures/q12o1.png";
import q12op2 from "../Pictures/q12o2.png";
import q12op3 from "../Pictures/q12o3.png";
import q12op4 from "../Pictures/q12o4.png";
import q12op5 from "../Pictures/q12o5.png";
import q12op6 from "../Pictures/q12o6.png";


const questions = [
  {
    questionText: "Fill the following with the correct shape",
    image: q1, // Reference to the question image
    options: [
      { src: option1q1, label: "Option 1" },
      { src: option2q1, label: "Option 2" },
      { src: option3q1, label: "Option 3" },
      { src: option4q1, label: "Option 4" },
      { src: option5q1, label: "Option 5" },
    ],
    correctAnswer: 3,
  },
  {
    questionText: "Fill the following with the correct shape",
    image: q2, // Reference to the question image
    options: [
      { src: q2op1, label: "Option 1" },
      { src: q2op2, label: "Option 2" },
      { src: q2op3, label: "Option 3" },
      { src: q2op4, label: "Option 4" },
      { src: q2op5, label: "Option 5" },
      { src: q2op6, label: "Option 6" },
    ],
    correctAnswer: 4,
  },
  {
    questionText: "Fill the following with the correct shape",
    image: q3, // Reference to the question image
    options: [
      { src: q3op1, label: "Option 1" },
      { src: q3op2, label: "Option 2" },
      { src: q3op3, label: "Option 3" },
      { src: q3op4, label: "Option 4" },
      { src: q3op5, label: "Option 5" },
      { src: q3op6, label: "Option 6" },
    ],
    correctAnswer: 0,
  },
  {
    questionText: "Fill the following with the correct shape",
    image: q4, // Reference to the question image
    options: [
      { src: q4op1, label: "Option 1" },
      { src: q4op2, label: "Option 2" },
      { src: q4op3, label: "Option 3" },
      { src: q4op4, label: "Option 4" },
      { src: q4op5, label: "Option 5" },
      { src: q4op6, label: "Option 6" },
    ],
    correctAnswer: 1,
  },
  {
    questionText: "Fill the following with the correct shape",
    image: q5, // Reference to the question image
    options: [
      { src: q5op1, label: "Option 1" },
      { src: q5op2, label: "Option 2" },
      { src: q5op3, label: "Option 3" },
      { src: q5op4, label: "Option 4" },
      { src: q5op5, label: "Option 5" },
      { src: q5op6, label: "Option 6" },
    ],
    correctAnswer: 5,
  },
  {
    questionText: "Fill the following with the correct shape",
    image: q6, // Reference to the question image
    options: [
      { src: q6op1, label: "Option 1" },
      { src: q6op2, label: "Option 2" },
      { src: q6op3, label: "Option 3" },
      { src: q6op4, label: "Option 4" },
      { src: q6op5, label: "Option 5" },
      { src: q6op6, label: "Option 6" },
    ],
    correctAnswer: 2,
  },
  {
    questionText: "Fill the following with the correct shape",
    image: q7, // Reference to the question image
    options: [
      { src: q7op1, label: "Option 1" },
      { src: q7op2, label: "Option 2" },
      { src: q7op3, label: "Option 3" },
      { src: q7op4, label: "Option 4" },
      { src: q7op5, label: "Option 5" },
      { src: q7op6, label: "Option 6" },
    ],
    correctAnswer: 1,
  },
  {
    questionText: "Fill the following with the correct shape",
    image: q8, // Reference to the question image
    options: [
      { src: q8op1, label: "Option 1" },
      { src: q8op2, label: "Option 2" },
      { src: q8op3, label: "Option 3" },
      { src: q8op4, label: "Option 4" },
      { src: q8op5, label: "Option 5" },
      { src: q8op6, label: "Option 6" },
    ],
    correctAnswer: 0,
  },
  {
    questionText: "Fill the following with the correct shape",
    image: q9, // Reference to the question image
    options: [
      { src: q9op1, label: "Option 1" },
      { src: q9op2, label: "Option 2" },
      { src: q9op3, label: "Option 3" },
      { src: q9op4, label: "Option 4" },
      { src: q9op5, label: "Option 5" },
      { src: q9op6, label: "Option 6" },
    ],
    correctAnswer: 4,
  },
  {
    questionText: "Fill the following with the correct shape",
    image: q10, // Reference to the question image
    options: [
      { src: q10op1, label: "Option 1" },
      { src: q10op2, label: "Option 2" },
      { src: q10op3, label: "Option 3" },
      { src: q10op4, label: "Option 4" },
      { src: q10op5, label: "Option 5" },
      { src: q10op6, label: "Option 6" },
    ],
    correctAnswer: 5,
  },
  {
    questionText: "Fill the following with the correct shape",
    image: q11, // Reference to the question image
    options: [
      { src: q11op1, label: "Option 1" },
      { src: q11op2, label: "Option 2" },
      { src: q11op3, label: "Option 3" },
      { src: q11op4, label: "Option 4" },
      { src: q11op5, label: "Option 5" },
      { src: q11op6, label: "Option 6" },
    ],
    correctAnswer: 3,
  },
  {
    questionText: "Fill the following with the correct shape",
    image: q12, // Reference to the question image
    options: [
      { src: q12op1, label: "Option 1" },
      { src: q12op2, label: "Option 2" },
      { src: q12op3, label: "Option 3" },
      { src: q12op4, label: "Option 4" },
      { src: q12op5, label: "Option 5" },
      { src: q12op6, label: "Option 6" },
    ],
    correctAnswer: 4,
  }
];

function IQquizpage() {
  return (
    <div className="quiz-container">
      <Quiz questions={questions} />
    </div>
  );
}

export default IQquizpage;
