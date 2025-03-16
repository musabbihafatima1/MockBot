const express = require("express");
const router = express.Router();
const EQQuestion = require("../models/eqQuestions.js"); // Adjust the path to your model

// Fetch EQ questions
router.get("/", async (req, res) => {
  try {
    const questions = await EQQuestion.find(); // Fetch all EQ questions
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch EQ questions" });
  }
});

module.exports = router;
