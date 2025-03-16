const { Router } = require('express');
const { HfInference } = require('@huggingface/inference');
const dotenv = require('dotenv');
const cors = require('cors'); // Add CORS middleware

dotenv.config();

const router = Router();
const hf = new HfInference(process.env.HF_TOKEN);

const textToGenerate = "Generate 10 python related interview MCQs with their answers, the format should be a question, it's options and then it's correct answer after ech question";

// Enable CORS for all routes
router.use(cors());

// Define the API route for generating questions
router.get('/generate-questions', async (req, res) => {
    try {
        const response = await hf.textGeneration({
            inputs: textToGenerate,
        });

      
        const generatedText = response.generated_text || response[0].generated_text;

        console.log('Generated Text:', generatedText); 

        const parsedQuestions = parseQuestions(generatedText);
        console.log('Parsed Questions:', parsedQuestions);

        // Sending the parsed questions as a response
        res.json({
            questions: parsedQuestions,
        });
    } catch (error) {
        console.error('Error generating questions:', error);
        res.status(500).json({ error: 'Failed to generate questions' });
    }
});

// Function to parse generated text and extract questions, options, and correct answers
function parseQuestions(generatedText) {
  const questions = [];
  const lines = generatedText.split('\n').filter(line => line.trim() !== ''); // Remove empty lines
  let currentQuestion = null;
  let isAnswerSection = false;

  lines.forEach((line) => {
      // Check if the line is a question (starts with "**Question X**")
      const questionMatch = line.match(/^\*\*Question \d+\*\*(.*)/);
      if (questionMatch) {
          // If there is an existing question being built, save it before starting a new one
          if (currentQuestion) {
              questions.push(currentQuestion); // Push the previous question
          }
          // Start a new question
          currentQuestion = { question: questionMatch[1].trim(), options: [], answer: '' };
          isAnswerSection = false; // Reset the answer flag when starting a new question
      }
      // Check if the line is an option (starts with a letter followed by a parenthesis, e.g., "a)")
      else if (line.match(/^[a-d]\)/)) {
          if (currentQuestion) {
              currentQuestion.options.push(line.trim()); // Append option to the current question
          }
      }
      // Check if the line is the answer (starts with "**Answer:**")
      else if (line.startsWith('**Answer:**')) {
          if (currentQuestion) {
              // Extract the answer text (remove "**Answer:**" and trim)
              currentQuestion.answer = line.replace('**Answer:**', '').trim();
              questions.push(currentQuestion); // Push the current question after adding the answer
              currentQuestion = null; // Reset for the next question
              isAnswerSection = true; // Mark that we are in the answer section
          }
      }
      // If none of the above, continue adding lines to the current question if not in answer section
      else if (currentQuestion && !isAnswerSection) {
          // Append additional lines to the question if it spans multiple lines
          currentQuestion.question += ` ${line.trim()}`;
      }
  });

  // Handle case where the last question does not have an answer section
  if (currentQuestion) {
      questions.push(currentQuestion);
  }

  return questions;
}


module.exports = router;