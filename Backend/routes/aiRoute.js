// aiRoute.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');

// Local question bank (save as questions.json)
const questionBank = JSON.parse(fs.readFileSync('./questions.json'));

router.post('/generate-mcqs', async (req, res) => {
    const { topic } = req.body;
    
    // 1. Try local LLM
    try {
        const response = await axios.post('http://localhost:5001/api/generate-mcqs', 
            { topic }, 
            { timeout: 8000 }  // 8-second timeout
        );
        return res.json(response.data);
    } catch (error) {
        console.log("Local LLM failed, using fallback...");
        
        // 2. Use pre-made questions
        const questions = questionBank[topic.toLowerCase()] || 
                         questionBank["programming"];  // Default topic
        return res.json({ questions, source: "fallback" });
    }
});

module.exports = router;