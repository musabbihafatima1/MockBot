const mongoose = require('mongoose');

const quizOptionSchema = new mongoose.Schema({
  src: String,
  label: String
});

const IQQuestionSchema = new mongoose.Schema({
  questionText: String,
  image: String,
  options: [quizOptionSchema],
  correctAnswer: quizOptionSchema
});

const IQQuestion = mongoose.model('IQQuestion', IQQuestionSchema);

module.exports = IQQuestion;
