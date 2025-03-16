const mongoose = require('mongoose');

const eqQuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
});

const EQQuestion = mongoose.model('EQQuestion', eqQuestionSchema);

module.exports = EQQuestion;
