const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

router.post('/generate-mcqs', async (req, res) => {
    try {
        const { topic, count  } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Generate ${count} interview related multiple choice questions about ${topic} with first 10 questions easy and next 15 medium and last 25 difficult.
            Format each exactly as:
            Q1. [question]
            A) [option1]
            B) [option2]
            C) [option3]
            D) [option4]
            Correct Answer: [letter]`
                    });

        
        const text = response.candidates[0].content.parts[0].text;
        console.log('Generated Text:', text);

        const questions = parseGeminiResponse(text);

        res.json({
            questions: questions.slice(0, count),
            model: "gemini-2.0-flash"
        });

    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({
            error: "AI service unavailable",
            questions: getFallbackQuestions(req.body.topic)
        });
    }
});

function parseGeminiResponse(text) {
    const questionBlocks = text.split(/(Q\d+\.)/g);
    const questions = [];
    
    for (let i = 1; i < questionBlocks.length; i += 2) {
        try {
            const block = questionBlocks[i] + questionBlocks[i + 1];
            const lines = block.split('\n').map(l => l.trim()).filter(l => l);
            
            const question = {
                question: lines[0].replace(/^Q\d+\.\s*/, ''),
                options: [],
                correctAnswer: -1 // Initializing with invalid index
            };

            lines.slice(1).forEach(line => {
                if (/^[A-D]\)/.test(line)) {
                    // Storing just the option text without the letter prefix
                    question.options.push(line.replace(/^[A-D]\)\s*/, ''));
                }
                if (line.startsWith('Correct Answer:')) {
                    // Converting letter answer to 0-3 index
                    const answer = line.split(': ')[1].trim().toUpperCase();
                    question.correctAnswer = answer.charCodeAt(0) - 'A'.charCodeAt(0);
                }
            });

            // Validating the question before adding
            if (question.options.length === 4 && 
                question.correctAnswer >= 0 && 
                question.correctAnswer <= 3) {
                questions.push(question);
            }
        } catch (e) {
            console.error('Error parsing block:', e);
        }
    }
    return questions;
}
function getFallbackQuestions(topic) {
    return [
        {
            question: `What is the primary purpose of ${topic}?`,
            options: [
                "A) Basic functionality",
                "B) Core operations",
                "C) Fundamental processes",
                "D) All of the above"
            ],
            correctAnswer: "D"
        },
        {
            question: `Which tool is most commonly associated with ${topic}?`,
            options: [
                "A) Standard toolkit",
                "B) Specialized software",
                "C) Common frameworks",
                "D) Basic utilities"
            ],
            correctAnswer: "B"
        }
    ];
}



module.exports = router;
