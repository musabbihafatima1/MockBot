const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

// Save Quiz Data
router.post("/save-quiz", async (req, res) => {
  try {
    const { questions } = req.body;
    const newQuiz = new Quiz({ userId, questions });
    await newQuiz.save();
    res.status(200).json({ message: "Quiz saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve Quiz Data
router.get("/get-quiz", async (req, res) => {
    try {
      const quiz = await Quiz.findOne().sort({ _id: -1 }); // Get the latest quiz data
      res.status(200).json(quiz);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
