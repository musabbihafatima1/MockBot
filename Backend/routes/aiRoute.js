                            // const { Router } = require('express');
                            // const { HfInference } = require('@huggingface/inference');
                            // const dotenv = require('dotenv');
                            // const cors = require('cors'); // Add CORS middleware

                            // dotenv.config();

                            // const router = Router();
                            // const hf = new HfInference(process.env.HF_TOKEN);

                            // const textToGenerate = "Generate 10 python related interview MCQs with their answers, the format should be a question, it's options and then it's correct answer after ech question";

                            // // Enable CORS for all routes
                            // router.use(cors());

                            // // Define the API route for generating questions
                            // router.get('/generate-questions', async (req, res) => {
                            //     try {
                            //         const response = await hf.textGeneration({
                            //             inputs: textToGenerate,
                            //         });

                                
                            //         const generatedText = response.generated_text || response[0].generated_text;

                            //         console.log('Generated Text:', generatedText); 

                            //         const parsedQuestions = parseQuestions(generatedText);
                            //         console.log('Parsed Questions:', parsedQuestions);

                            //         // Sending the parsed questions as a response
                            //         res.json({
                            //             questions: parsedQuestions,
                            //         });
                            //     } catch (error) {
                            //         console.error('Error generating questions:', error);
                            //         res.status(500).json({ error: 'Failed to generate questions' });
                            //     }
                            // });


                            // // Function to parse generated text and extract questions, options, and correct answers
                            // function parseQuestions(generatedText) {
                            //   const questions = [];
                            //   const lines = generatedText.split('\n').filter(line => line.trim() !== ''); // Remove empty lines
                            //   let currentQuestion = null;
                            //   let isAnswerSection = false;

                            //   lines.forEach((line) => {
                            //       // Check if the line is a question (starts with "**Question X**")
                            //       const questionMatch = line.match(/^\*\*Question \d+\*\*(.*)/);
                            //       if (questionMatch) {
                            //           // If there is an existing question being built, save it before starting a new one
                            //           if (currentQuestion) {
                            //               questions.push(currentQuestion); // Push the previous question
                            //           }
                            //           // Start a new question
                            //           currentQuestion = { question: questionMatch[1].trim(), options: [], answer: '' };
                            //           isAnswerSection = false; // Reset the answer flag when starting a new question
                            //       }
                            //       // Check if the line is an option (starts with a letter followed by a parenthesis, e.g., "a)")
                            //       else if (line.match(/^[a-d]\)/)) {
                            //           if (currentQuestion) {
                            //               currentQuestion.options.push(line.trim()); // Append option to the current question
                            //           }
                            //       }
                            //       // Check if the line is the answer (starts with "**Answer:**")
                            //       else if (line.startsWith('**Answer:**')) {
                            //           if (currentQuestion) {
                            //               // Extract the answer text (remove "**Answer:**" and trim)
                            //               currentQuestion.answer = line.replace('**Answer:**', '').trim();
                            //               questions.push(currentQuestion); // Push the current question after adding the answer
                            //               currentQuestion = null; // Reset for the next question
                            //               isAnswerSection = true; // Mark that we are in the answer section
                            //           }
                            //       }
                            //       // If none of the above, continue adding lines to the current question if not in answer section
                            //       else if (currentQuestion && !isAnswerSection) {
                            //           // Append additional lines to the question if it spans multiple lines
                            //           currentQuestion.question += ` ${line.trim()}`;
                            //       }
                            //   });

                            //   // Handle case where the last question does not have an answer section
                            //   if (currentQuestion) {
                            //       questions.push(currentQuestion);
                            //   }

                            //   return questions;
                            // }


                            // module.exports = router;

                            // routes/aiRoute.js
                            // routes/aiRoute.js

                            // routes/aiRoute.js
                            // routes/aiRoute.js
                            // aiRoute.js
                            // server/gptHandler.js
                            // aiRoute.js

                            // aiRoute.js

                            // aiRoute.js
                            // aiRoute.js
                            // const express = require('express');
                            // const router = express.Router();
                            // const { HfInference } = require('@huggingface/inference');
                            // require('dotenv').config();

                            // const hf = new HfInference(process.env.HF_TOKEN);

                            // // Model configuration
                            // const MODEL_CONFIG = {
                            //   small: {
                            //     name: 'gpt2',
                            //     max_tokens: 300,
                            //     temperature: 0.7
                            //   },
                            //   medium: {
                            //     name: 'facebook/opt-1.3b',
                            //     max_tokens: 500,
                            //     temperature: 0.6
                            //   }
                            // };

                            // // MCQ validation
                            // const validateMCQs = (text) => {
                            //   if (!text) return false;
                            //   const questionCount = (text.match(/\d+\.\s.+?\?/g) || []).length;
                            //   const optionCount = (text.match(/[A-D]\)\s.+?(?=\n|$)/g) || []).length;
                            //   return questionCount >= 1 && optionCount >= 4;
                            // };

                            // router.post('/generate-mcqs', async (req, res) => {
                            //   console.log('\n=== New Request ===');
                            //   console.log('Topic:', req.body.topic);
                            //   console.log('Model Selected:', MODEL_CONFIG.small.name);

                            //   try {
                            //     // Validate input
                            //     if (!req.body.topic || typeof req.body.topic !== 'string') {
                            //       return res.status(400).json({
                            //         error: 'Invalid topic',
                            //         details: 'Topic must be a non-empty string'
                            //       });
                            //     }

                            //     // Create prompt
                            //     const prompt = `Generate 10 clear multiple choice questions about ${req.body.topic}.
                            // Format each exactly like this:
                            // 1. [Question text]?
                            // A) [Option 1] B) [Option 2] C) [Option 3] D) [Option 4]

                            // Include only the questions and options.`;

                            //     // Generate with smaller model
                            //     const startTime = Date.now();
                            //     const response = await hf.textGeneration({
                            //       model: MODEL_CONFIG.small.name,
                            //       inputs: prompt,
                            //       parameters: {
                            //         max_new_tokens: MODEL_CONFIG.small.max_tokens,
                            //         temperature: MODEL_CONFIG.small.temperature,
                            //         do_sample: true
                            //       }
                            //     });

                            //     const generationTime = ((Date.now() - startTime) / 1000).toFixed(2);
                            //     console.log(`Generated in ${generationTime}s`);

                            //     // Validate response
                            //     if (!validateMCQs(response.generated_text)) {
                            //       console.warn('Validation failed, using fallback');
                            //       throw new Error('Invalid MCQ format received');
                            //     }

                            //     res.json({
                            //       success: true,
                            //       questions: response.generated_text,
                            //       metrics: {
                            //         model: MODEL_CONFIG.small.name,
                            //         generation_time: generationTime,
                            //         token_count: response.generated_text.length / 4
                            //       }
                            //     });

                            //   } catch (error) {
                            //     console.error('Generation Error:', error.message);

                            //     // Fallback response
                            //     const fallbackQuestions = 
                            //       `1. What is the primary responsibility of a ${req.body.topic || 'Product Manager'}?
                            // A) Writing code
                            // B) Defining product strategy
                            // C) Creating marketing content
                            // D) Managing finances

                            // 2. Which tool is commonly used by ${req.body.topic || 'Product Managers'}?
                            // A) Jira
                            // B) Photoshop
                            // C) Excel
                            // D) All of the above`;

                            //     res.status(200).json({  // Still return 200 but with fallback flag
                            //       success: false,
                            //       questions: fallbackQuestions,
                            //       is_fallback: true,
                            //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
                            //     });
                            //   }
                            // });

                            // // Health check endpoint
                            // router.get('/api/health', (req, res) => {
                            //   res.json({
                            //     status: 'operational',
                            //     models: Object.keys(MODEL_CONFIG),
                            //     current_model: MODEL_CONFIG.small.name
                            //   });
                            // });

                            // module.exports = router;

                            // aiRoute.js (Node.js only version)
                            const express = require('express');
                            const router = express.Router();
                            const axios = require('axios');

                            const parseLlamaResponse = (text) => {
                                if (!text) return [];
                                
                                try {
                                    return text.split(/\nQ\d+\./).slice(1).map(block => {
                                        const lines = block.trim().split('\n');
                                        const question = lines[0].trim();
                                        const options = lines.slice(1, 5)
                                            .filter(l => l.trim() && /^[a-d]\)/.test(l))
                                            .map(l => l.trim());
                                        const answerLine = lines.find(l => l.includes('Answer:'));
                                        const answer = answerLine ? answerLine.split(':')[1].trim() : 'a';
                                        
                                        return { question, options, answer };
                                    }).filter(q => q.question && q.options.length === 4);
                                } catch (e) {
                                    console.error("Parsing error:", e);
                                    return [];
                                }
                            };

                            router.post('/generate-mcqs', async (req, res) => {
                                const { topic, count = 5 } = req.body;
                                
                                try {
                                    const aiResponse = await axios.post('http://localhost:5001/generate-mcqs', 
                                        { topic },
                                        { timeout: 30000 }
                                    );

                                    const parsedQuestions = parseLlamaResponse(aiResponse.data.questions);
                                    
                                    if (parsedQuestions.length === 0) {
                                        throw new Error('No valid questions generated');
                                    }

                                    res.json({
                                        success: true,
                                        model: aiResponse.data.model,
                                        questions: parsedQuestions.slice(0, count)
                                    });

                                } catch (error) {
                                    console.error('AI Service Error:', error.message);
                                    
                                    // Enhanced fallback
                                    const fallbackQuestions = [
                                        {
                                            question: `What is the most important concept in ${topic}?`,
                                            options: [
                                                "Fundamental principles",
                                                "Advanced techniques", 
                                                "Historical context",
                                                "Case studies"
                                            ],
                                            answer: "a"
                                        },
                                        {
                                            question: `Which tool is essential for ${topic} professionals?`,
                                            options: [
                                                "Specialized software",
                                                "General office tools",
                                                "Graphic design apps",
                                                "Social media platforms"
                                            ],
                                            answer: "a"
                                        }
                                    ].slice(0, count);

                                    res.status(503).json({
                                        success: false,
                                        message: `AI service unavailable: ${error.message}`,
                                        questions: fallbackQuestions
                                    });
                                }
                            });

                            module.exports = router;