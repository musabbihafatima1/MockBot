const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const aiRoutes= require('./routes/aiRoute');
const adminRoutes= require ('./routes/adminRoute');
const universityMail= require ('./routes/university');
const companyRoute= require ('./routes/companyRoute');
const cors = require('cors');
//const { spawn, exec } = require('child_process');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
//const path = require('path');


const app = express();

// Middleware to parse incoming JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
  credentials: true // Allow cookies and other credentials
 
}));

// File conversion API route
app.use('/api/files', fileRoutes);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/compauth', require('./routes/compauth'));
app.use("/api/eq-questions", require('./routes/eq'));
app.use('/api', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/company', companyRoute);
app.use('/api/university', universityMail);
app.use('/api/resume', require('./routes/resumeAnalysis')); // Added resume analysis route



// app.post('/generate-mcq', (req, res) => {
//     const { topic, level, count } = req.body;
//     const scriptPath = path.join(__dirname, '../ml/generate_mcqs.py');
  
//     // Validate input
//     if (!topic || !level) {
//       return res.status(400).json({ error: 'Missing required parameters' });
//     }
  
//     // Use absolute path to Python executable if needed
//     const pythonProcess = spawn('python', [
//       scriptPath,
//       `"${topic}"`, // Keep arguments quoted
//       level,
//       count ? count.toString() : '3'
//     ]);
  
//     let result = '';
//     let error = '';
  
//     pythonProcess.stdout.on('data', (data) => {
//       result += data.toString();
//     });
  
//     pythonProcess.stderr.on('data', (data) => {
//       error += data.toString();
//     });
  
//     pythonProcess.on('close', (code) => {
//       if (code !== 0 || error) {
//         return res.status(500).json({
//           error: 'MCQ generation failed',
//           details: error || `Process exited with code ${code}`
//         });
//       }
      
//       try {
//         const parsedResult = JSON.parse(result);
//         res.json(parsedResult);
//       } catch (e) {
//         res.status(500).json({
//           error: 'Invalid response format',
//           details: 'The generator returned invalid JSON',
//           rawResponse: result // For debugging
//         });
//       }
//     });
//   });



// Start the server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Error: ', err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
