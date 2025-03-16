const mongoose = require('mongoose');
const EQQuestion = require('./models/eqQuestions'); // Adjust the path to your model
const IQQuestion = require('./models/iqQuestions');
require('dotenv').config();  // If you're using a .env file

// Predefined questions
const questions = [
  /*{ questionText: "I know when to speak about my personal problems to others.", 
    options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] 
},
  { 
    questionText: "When I am faced with obstacles, I remember times I faced similar obstacles and overcame them.", 
    options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] 
},
  {
    questionText: "I expect that I will do well on most things I try.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],

  },
  {
    questionText: "Other people find it easy to confide in me.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
    
  },
  {
    questionText: "I find it hard to understand the non verbal messages of other people.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
  
  },
  {
    questionText: "Some of the major events of my life have led me to re-evaluate what is important and not important.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
   
  },
  {
    questionText: "When my mood changes, I see new possibilities.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
   
  },
  {
    questionText: "Emotions are one of the things that make my life worth living.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
   
  },
  {
    questionText: " I am aware of my emotions as I experience them.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
    
  },
  {
    questionText: " I expect good things to happen.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
   
  },
  {
    questionText: " I like to share my emotions with others.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
  
  },
  {
    questionText: "I expect good things to happen.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
    
  },
  {
    questionText: "When I experience a positive emotion, I know how to make it last.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
    
  },
  {
    questionText: "I arrange events others enjoy.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
   
  },
  {
    questionText: "I seek out activities that make me happy",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
   
  },
  {
    questionText: "I am aware of the non-verbal messages I send to others.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
   
  },
  {
    questionText: "I present myself in a way that makes a good impression on others.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
    
  },
  {
    questionText: "When I am in a positive mood, solving problems is easy for me.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
 
  },
  {
    questionText: "By looking at their facial expressions, I recognize the emotions people are experiencing.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
    
  },
  {
    questionText: "I know why my emotions change.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
   
  },
  {
    questionText: "When I am in a positive mood, I am able to come up with new ideas.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
    
  },
  {
    questionText: "I have control over my emotions.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
    
  },
  {
    questionText: "I easily recognize my emotions as I experience them.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
  
  },
  {
    questionText: "I motivate myself by imagining a good outcome to tasks I take on",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
   
  },
  {
    questionText: "I compliment others when they have done something well.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
   
  },
  {
    questionText: " I am aware of the non-verbal messages other people send.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
   
  },
  {
    questionText: "When another person tells me about an important event in their life, I almost feel as though I have experienced this event myself.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
    
  },
  {
    questionText: " When I feel a change in emotions, I tend to come up with new ideas.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
  },
    
  {
    questionText: "When I am faced with a challenge, I give up because I believe I will fail.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
    
  },
  {
    questionText: "I know what other people are feeling just by looking at them.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
   
  },
  {
    questionText: "I help other people feel better when they are down.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
    
  },
  {
    questionText: "I use good moods to help myself keep trying in the face of obstacles.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
  },
  {
    questionText: "It is difficult for me to understand why people feel the way they do.",
    options: ["Strongly disagree", "Disagree", "Nuetral", "Agree", "Strongly Agree"],
    
  }*/
    {
      questionText: "Fill the following with the correct shape",
      image: "q1.png", // Reference to the question image
      options: [
        { src: "option1q1", label: "Option 1" },
        { src: "option2q1", label: "Option 2" },
        { src: "option3q1", label: "Option 3" },
        { src: "option4q1", label: "Option 4" },
        { src: "option5q1", label: "Option 5" },
      ],
      correctAnswer: { src: option4q1, label: "Option 4" },
    },
    {
      questionText: "Fill the following with the correct shape",
      image: "q2.png", // Reference to the question image
      options: [
        { src: "q2op1", label: "Option 1" },
        { src: "q2op2", label: "Option 2" },
        { src: "q2op3", label: "Option 3" },
        { src: "q2op4", label: "Option 4" },
        { src: "q2op5", label: "Option 5" },
        { src: "q2op6", label: "Option 6" },
      ],
      correctAnswer: { src: option4q1, label: "Option 5" },
    },
    {
      questionText: "Fill the following with the correct shape",
      image: "q3.png", // Reference to the question image
      options: [
        { src: "q3op1", label: "Option 1" },
        { src: "q3op2", label: "Option 2" },
        { src: "q3op3", label: "Option 3" },
        { src: "q3op4", label: "Option 4" },
        { src: "q3op5", label: "Option 5" },
        { src: "q3op6", label: "Option 6" },
      ],
      correctAnswer: { src: "option4q1", label: "Option 1" },
    },
    {
      questionText: "Fill the following with the correct shape",
      image: "q4.png", // Reference to the question image
      options: [
        { src: "q4op1", label: "Option 1" },
        { src: "q4op2", label: "Option 2" },
        { src: "q4op3", label: "Option 3" },
        { src: "q4op4", label: "Option 4" },
        { src: "q4op5", label: "Option 5" },
        { src: "q4op6", label: "Option 6" },
      ],
      correctAnswer: { src: "option4q1", label: "Option 2" },
    },
    {
      questionText: "Fill the following with the correct shape",
      image: "q5.png", // Reference to the question image
      options: [
        { src: "q5op1", label: "Option 1" },
        { src: "q5op2", label: "Option 2" },
        { src: "q5op3", label: "Option 3" },
        { src: "q5op4", label: "Option 4" },
        { src: "q5op5", label: "Option 5" },
        { src: "q5op6", label: "Option 6" },
      ],
      correctAnswer: { src: "option4q1", label: "Option 6" },
    },
    {
      questionText: "Fill the following with the correct shape",
      image: q6, // Reference to the question image
      options: [
        { src: "q6op1", label: "Option 1" },
        { src: "q6op2", label: "Option 2" },
        { src: "q6op3", label: "Option 3" },
        { src: "q6op4", label: "Option 4" },
        { src: "q6op5", label: "Option 5" },
        { src: "q6op6", label: "Option 6" },
      ],
      correctAnswer: { src: "option4q1", label: "Option 3" },
    },
    {
      questionText: "Fill the following with the correct shape",
      image: "q7.png", // Reference to the question image
      options: [
        { src: "q7op1", label: "Option 1" },
        { src: "q7op2", label: "Option 2" },
        { src: "q7op3", label: "Option 3" },
        { src: "q7op4", label: "Option 4" },
        { src: "q7op5", label: "Option 5" },
        { src: "q7op6", label: "Option 6" },
      ],
      correctAnswer: { src: "option4q1", label: "Option 2" },
    },
    {
      questionText: "Fill the following with the correct shape",
      image: "q8.png", // Reference to the question image
      options: [
        { src: "q8op1", label: "Option 1" },
        { src: "q8op2", label: "Option 2" },
        { src: "q8op3", label: "Option 3" },
        { src: "q8op4", label: "Option 4" },
        { src: "q8op5", label: "Option 5" },
        { src: "q8op6", label: "Option 6" },
      ],
      correctAnswer: { src: "option4q1", label: "Option 1" },
    },
    {
      questionText: "Fill the following with the correct shape",
      image: "q9.png", // Reference to the question image
      options: [
        { src: "q9op1", label: "Option 1" },
        { src: "q9op2", label: "Option 2" },
        { src: "q9op3", label: "Option 3" },
        { src: "q9op4", label: "Option 4" },
        { src: "q9op5", label: "Option 5" },
        { src: "q9op6", label: "Option 6" },
      ],
      correctAnswer: { src: "option4q1", label: "Option 5" },
    },
    {
      questionText: "Fill the following with the correct shape",
      image: "q10.png", // Reference to the question image
      options: [
        { src: "q10op1", label: "Option 1" },
        { src: "q10op2", label: "Option 2" },
        { src: "q10op3", label: "Option 3" },
        { src: "q10op4", label: "Option 4" },
        { src: 'q10op5", label: "Option 5" },
        { src: "q10op6", label: "Option 6" },
      ],
      correctAnswer: { src: "option4q1", label: "Option 6" },
    },
    {
      questionText: "Fill the following with the correct shape",
      image: "q11.png", // Reference to the question image
      options: [
        { src: "q11op1", label: "Option 1" },
        { src: "q11op2", label: "Option 2" },
        { src: "q11op3", label: "Option 3" },
        { src: "q11op4", label: "Option 4" },
        { src: "q11op5", label: "Option 5" },
        { src: "q11op6", label: "Option 6" },
      ],
      correctAnswer: { src: "option4q1", label: "Option 4" },
    },
    {
      questionText: "Fill the following with the correct shape",
      image: "q12.png", // Reference to the question image
      options: [
        { src: "q12op1", label: "Option 1" },
        { src: "q12op2", label: "Option 2" },
        { src: "q12op3", label: "Option 3" },
        { src: "q12op4", label: "Option 4" },
        { src: "q12op5", label: "Option 5" },
        { src: "q12op6", label: "Option 6" },
      ],
      correctAnswer: { src: "option4q1", label: "Option 5" },
    }
];

// Connect to MongoDB
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    return IQQuestion.insertMany(questions); // Insert the questions
  })
  .then(() => {
    console.log('Questions inserted successfully');
    mongoose.disconnect();  // Close the connection after insertion
  })
  .catch((err) => {
    console.error('Error inserting questions:', err);
  });
