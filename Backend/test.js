// const axios = require('axios');
// const dotenv = require('dotenv');

// dotenv.config();

// const HF_TOKEN = process.env.HF_TOKEN;
// const MODEL = 'HuggingFaceH4/zephyr-7b-beta'; // Smaller and instruction-tuned

// if (!HF_TOKEN) {
//   console.error('❌ HF_TOKEN is not defined in .env');
//   process.exit(1);
// }

// async function generateMCQs() {
//   try {
//     const prompt = `
// Generate 7 multiple choice questions (MCQs) related to Python programming concepts.

// Each question must follow this format exactly:

// Question: <the question>
// Options:
// a) <option A>
// b) <option B>
// c) <option C>
// d) <option D>
// Answer: <correct option letter>

// Topics can include: functions, data types, loops, error handling, OOP, etc.
// Do not write explanations or code. Only the MCQs.
// Start now:
// `;

//     console.log('🚀 Generating MCQs with Zephyr-7B...');

//     const response = await axios.post(
//       `https://api-inference.huggingface.co/models/${MODEL}`,
//       {
//         inputs: prompt,
//         parameters: {
//           max_new_tokens: 500,
//           temperature: 0.7,
//           top_p: 0.9,
//           do_sample: true
//         }
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${HF_TOKEN}`,
//           'Content-Type': 'application/json'
//         },
//         timeout: 30000
//       }
//     );

//     const generatedText = response.data?.[0]?.generated_text;
//     if (!generatedText || generatedText.length < 100) {
//       throw new Error('Model response too short or empty');
//     }

//     console.log('✅ Raw Output:\n', generatedText);

//     const questions = parseMCQs(generatedText);

//     return {
//       success: true,
//       questions: questions.length ? questions : getFallbackQuestions()
//     };
//   } catch (error) {
//     console.error('❌ API Error:', error.response?.data || error.message);
//     return {
//       success: false,
//       error: error.message,
//       questions: getFallbackQuestions()
//     };
//   }
// }

// function parseMCQs(text) {
//   const blocks = text.split(/Question:/).slice(1);
//   const questions = [];

//   for (const block of blocks) {
//     const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
//     const question = lines[0];
//     const options = [];
//     let answer = '';

//     for (const line of lines.slice(1)) {
//       if (/^[abcd]\)/.test(line)) {
//         options.push(line.slice(3).trim());
//       } else if (line.startsWith('Answer:')) {
//         answer = line.slice(7).trim().toLowerCase();
//       }
//     }

//     if (question && options.length === 4 && ['a', 'b', 'c', 'd'].includes(answer)) {
//       questions.push({
//         id: `q-${Date.now()}-${questions.length}`,
//         question,
//         options,
//         answer
//       });
//     }
//   }

//   return questions.slice(0, 5);
// }

// function getFallbackQuestions() {
//   return [
//     {
//       id: 'q-fallback-1',
//       question: 'What does the "self" keyword represent in Python?',
//       options: [
//         'The current class instance',
//         'The module name',
//         'A decorator',
//         'A loop variable'
//       ],
//       answer: 'a'
//     },
//     {
//       id: 'q-fallback-2',
//       question: 'Which of the following is a valid way to create a list?',
//       options: [
//         'list = [1, 2, 3]',
//         'list = 1, 2, 3',
//         'list = (1;2;3)',
//         'list = {1, 2, 3}'
//       ],
//       answer: 'a'
//     }
//   ];
// }

// // Test run
// generateMCQs().then(result => {
//   console.log('\n📚 Final Result:\n', JSON.stringify(result, null, 2));
// });

const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const HF_TOKEN = process.env.HF_TOKEN;
const MODEL = 'HuggingFaceH4/zephyr-7b-beta'; // Zephyr model for generating MCQs

if (!HF_TOKEN) {
  console.error('❌ HF_TOKEN is not defined in .env');
  process.exit(1);
}

async function generateMCQs(batchSize = 5) {
  try {
    const prompt = `
Generate exactly ${batchSize} multiple choice questions (MCQs) related to Python programming concepts.

Each question must follow this format exactly:

Question: <the question>
Options:
a) <option A>
b) <option B>
c) <option C>
d) <option D>
Answer: <correct option letter>

Topics can include: functions, data types, loops, error handling, OOP, etc.
Do not write explanations or code. Only the MCQs.
Start now:
`;

    console.log(`🚀 Generating ${batchSize} MCQs with Zephyr-7B...`);

    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 400, // Lower token count for fewer errors
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true
        }
      },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    const generatedText = response.data?.[0]?.generated_text;
    if (!generatedText || generatedText.length < 100) {
      throw new Error('Model response too short or empty');
    }

    console.log('✅ Raw Output:\n', generatedText);

    const questions = parseMCQs(generatedText);
    return {
      success: true,
      questions: questions.length ? questions : getFallbackQuestions()
    };
  } catch (error) {
    console.error('❌ API Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.message,
      questions: getFallbackQuestions()
    };
  }
}

function parseMCQs(text) {
  const blocks = text.split(/Question:/).slice(1);
  const questions = [];

  for (const block of blocks) {
    const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
    const question = lines[0];
    const options = [];
    let answer = '';

    for (const line of lines.slice(1)) {
      if (/^[abcd]\)/.test(line)) {
        options.push(line.slice(3).trim());
      } else if (line.startsWith('Answer:')) {
        answer = line.slice(7).trim().toLowerCase();
      }
    }

    if (question && options.length === 4 && ['a', 'b', 'c', 'd'].includes(answer)) {
      questions.push({
        id: `q-${Date.now()}-${questions.length}`,
        question,
        options,
        answer
      });
    }
  }

  return questions;
}

function getFallbackQuestions() {
  return [
    {
      id: 'q-fallback-1',
      question: 'What does the "self" keyword represent in Python?',
      options: [
        'The current class instance',
        'The module name',
        'A decorator',
        'A loop variable'
      ],
      answer: 'a'
    },
    {
      id: 'q-fallback-2',
      question: 'Which of the following is a valid way to create a list?',
      options: [
        'list = [1, 2, 3]',
        'list = 1, 2, 3',
        'list = (1;2;3)',
        'list = {1, 2, 3}'
      ],
      answer: 'a'
    }
  ];
}

async function generateMultipleBatches(total = 10, batchSize = 5) {
  const allQuestions = [];
  for (let i = 0; i < Math.ceil(total / batchSize); i++) {
    const result = await generateMCQs(batchSize);
    if (result.success) {
      allQuestions.push(...result.questions);
    }
  }

  return allQuestions.slice(0, total); // Ensures exactly 'total' questions
}

// 🔁 Run it to generate 10 MCQs
generateMultipleBatches(10).then(finalQuestions => {
  console.log('\n📚 Final Result:\n', JSON.stringify(finalQuestions, null, 2));
});
