// routes/api.js
const express = require('express');
const router = express.Router();
const TechnicalQuestion = require('../models/techQuestions');

router.post('/save-technical-questions', async (req, res) => {
  try {
    const { topic, questions, model } = req.body;

    if (!topic || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

    // Validate question structure
    const isValid = questions.every(q => 
      q.question && 
      Array.isArray(q.options) && 
      q.options.length === 4 &&
      typeof q.correct === 'number'
    );

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid question format' });
    }

    const newQuestions = new TechnicalQuestion({
      topic,
      questions,
      model: model || 'unknown',
      createdAt: Date.now()
    });

    await newQuestions.save();

    res.status(200).json({ 
      success: true, 
      message: 'Questions saved successfully' 
    });

  } catch (error) {
    console.error('Error saving questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// get tech questions to display on question bank screen
router.get('/tech-questions', async (req, res) => {
    try {
      const questions = await TechnicalQuestion.find();
      res.json(questions);
    } catch (error) {
      console.error('Error fetching technical questions:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;