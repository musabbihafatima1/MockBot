// models/TechnicalQuestion.js
const mongoose = require('mongoose');

const TechnicalQuestionSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  questions: [{
    question: String,
    options: [String],
    correct: Number
  }],
  model: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TechnicalQuestion', TechnicalQuestionSchema);