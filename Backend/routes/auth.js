const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/user.js');
const router = express.Router();

// Sending mail to University when user completes test and gain scores 
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path'); 

// Configure Nodemailer transport
/*const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'maryammomomalik@gmail.com', // Your email
    pass: 'nwju akgp roiu inek' // Your app password
  }
});

// Helper function to get attempt label (e.g., "First Attempt", "Second Attempt", etc.)
const getAttemptLabel = (attemptNumber) => {
  const attemptLabels = ['First Attempt', 'Second Attempt', 'Third Attempt', 'Fourth Attempt', 'Fifth Attempt'];
  return attemptLabels[attemptNumber - 1] || `${attemptNumber}th Attempt`;
};

// Function to generate PDF
const generatePdf = (user) => {
  const doc = new PDFDocument();
  const pdfPath = path.join(__dirname, 'scores.pdf');
  doc.pipe(fs.createWriteStream(pdfPath));

  // Add content to the PDF
  doc.fontSize(25).text('Test Scores', { underline: true });
  doc.moveDown();
  doc.fontSize(18).text(`Username: ${user.username}`);
  doc.fontSize(18).text(`University: ${user.university}`);
  doc.moveDown();

  // Add IQ Scores with attempt numbers and maximum score
  doc.fontSize(16).text('IQ Scores (Out of 12):');
  user.iqScores.forEach((score, index) => {
    const attemptNumber = index + 1;
    const attemptLabel = getAttemptLabel(attemptNumber);
    doc.text(`  ${attemptLabel}: ${score.score}/12`);
  });
  doc.moveDown();

  // Add EQ Scores with attempt numbers and maximum score
  doc.fontSize(16).text('EQ Scores (Out of 132):');
  user.eqScores.forEach((score, index) => {
    const attemptNumber = index + 1;
    const attemptLabel = getAttemptLabel(attemptNumber);
    doc.text(`  ${attemptLabel}: ${score.score}/132`);
  });

  doc.end();
  return pdfPath;
};

// Save IQ Score
router.post('/saveIqscore', async (req, res) => {
  const { score } = req.body;

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const numericScore = parseFloat(score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 12) {
      return res.status(400).json({ message: 'Invalid IQ score. Must be between 0 and 12.' });
    }

    if (!user.iqScores) {
      user.iqScores = [];
    }

    user.iqScores.push({ score: numericScore });
    await user.save();

    console.log("Updated iqScores: ", user.iqScores);

    // Check if both IQ and EQ scores are available
    if (user.iqScores.length > 0 && user.eqScores && user.eqScores.length > 0) {
      const pdfPath = generatePdf(user);

      const emailContent = `
        Dear University,

        Please find the attached PDF containing the scores of ${user.username} from ${user.university}.

        Best regards,
        Test Preparation System
      `;

      const mailOptions = {
        from: 'maryammomomalik@gmail.com',
        to: 'hamnaaman3@gmail.com',
        subject: `Scores for ${user.username}`,
        text: emailContent,
        attachments: [
          {
            filename: 'scores.pdf',
            path: pdfPath
          }
        ]
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error occurred while sending email:', error);
          return res.status(500).json({ message: 'Failed to send email' });
        }
        console.log('Email sent successfully:', info.response);
        res.json({ message: 'IQ Score saved successfully and email sent with PDF' });
      });
    } else {
      res.json({ message: 'IQ Score saved successfully. Waiting for EQ scores to send email.' });
    }

  } catch (error) {
    console.error('Error saving score:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Error saving score' });
  }
});

// Save EQ Score
router.post('/saveEqscore', async (req, res) => {
  const { score } = req.body;

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const numericScore = parseFloat(score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 132) {
      return res.status(400).json({ message: 'Invalid EQ score. Must be between 0 and 132.' });
    }

    if (!user.eqScores) {
      user.eqScores = [];
    }

    user.eqScores.push({ score: numericScore });
    await user.save();

    console.log("Updated eqScores: ", user.eqScores);

    // Check if both IQ and EQ scores are available
    if (user.iqScores && user.iqScores.length > 0 && user.eqScores.length > 0) {
      const pdfPath = generatePdf(user);

      const emailContent = `
        Dear University,

        Please find the attached PDF containing the scores of ${user.username} from ${user.university}.

        Best regards,
        Test Preparation System
      `;

      const mailOptions = {
        from: 'maryammomomalik@gmail.com',
        to: 'hamnaaman3@gmail.com',
        subject: `Scores for ${user.username}`,
        text: emailContent,
        attachments: [
          {
            filename: 'scores.pdf',
            path: pdfPath
          }
        ]
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error occurred while sending email:', error);
          return res.status(500).json({ message: 'Failed to send email' });
        }
        console.log('Email sent successfully:', info.response);
        res.json({ message: 'EQ Score saved successfully and email sent with PDF' });
      });
    } else {
      res.json({ message: 'EQ Score saved successfully. Waiting for IQ scores to send email.' });
    }

  } catch (error) {
    console.error('Error saving score:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Error saving score' });
  }
});*/

//code end for university mailing.

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password, university } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ username, email, password, university });
    await user.save();

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};


// Route to save EQ score
router.post('/saveEqscore', async (req, res) => {
  const { score } = req.body;

  // Assuming the token is passed as a Bearer token
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1];  // Extract the token part after 'Bearer'

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure the score is a number before pushing
    const numericScore = parseFloat(score);  // Convert the score to a number

    if (isNaN(numericScore)) {
      return res.status(400).json({ message: 'Invalid score format' });
    }

    // Initialize eqScores if it doesn't exist
    if (!user.eqScores) {
      user.eqScores = [];
    }

    // Push the numeric score to the eqScores array
    user.eqScores.push({ score: numericScore });

    await user.save(); // Save the updated user document

    console.log("Updated eqScores: ", user.eqScores);  // Debug: log the updated scores
    res.json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error('Error saving score:', error);

    // Differentiate between different types of errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(500).json({ message: 'Error saving score' });
  }
});

router.post('/saveIqscore', async (req, res) => {
  const { score } = req.body;

  // Assuming the token is passed as a Bearer token
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1];  // Extract the token part after 'Bearer'

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure the score is a number before pushing
    const numericScore = parseFloat(score);  // Convert the score to a number

    if (isNaN(numericScore)) {
      return res.status(400).json({ message: 'Invalid score format' });
    }

    // Initialize eqScores if it doesn't exist
    if (!user.iqScores) {
      user.iqScores = [];
    }

    // Push the numeric score to the eqScores array
    user.iqScores.push({ score: numericScore });

    await user.save(); // Save the updated user document

    console.log("Updated eqScores: ", user.iqScores);  // Debug: log the updated scores
    res.json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error('Error saving score:', error);

    // Differentiate between different types of errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(500).json({ message: 'Error saving score' });
  }
});


// Fetch user profile
router.get('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId); // Use userId from token

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      username: user.username,
      email: user.email,
      technicalField: user.technicalField,
      university: user.university,
    });
  } catch (error) {
    console.error('Error in GET /profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId); // Use userId from token

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { username, email, university, technicalField } = req.body;

    // Update user fields
    user.username = username || user.username;
    user.email = email || user.email;
    user.university = university || user.university;
    user.technicalField = technicalField || user.technicalField;

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error in PUT /profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch user profile
router.get('/profilename', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId); // Use userId from token

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      username: user.username,
    });
  } catch (error) {
    console.error('Error in GET /profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Scores (EQ and IQ)
router.get('/scores', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate latest EQ score percentage (out of 132)
    const eqPercentage = user.eqScores && user.eqScores.length > 0 
      ? Math.round((user.eqScores[user.eqScores.length - 1].score / 132) * 100)
      : 0;

    // Calculate latest IQ score percentage (out of 12)
    const iqPercentage = user.iqScores && user.iqScores.length > 0 
      ? Math.round((user.iqScores[user.iqScores.length - 1].score / 12) * 100)
      : 0;

    res.json({
      eqScore: eqPercentage,
      iqScore: iqPercentage,
      hasEq: user.eqScores && user.eqScores.length > 0,
      hasIq: user.iqScores && user.iqScores.length > 0
    });

  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Error fetching scores' });
  }
});

// Save Technical Score
router.post('/saveTechnicalScore', async (req, res) => {
  const { score } = req.body;

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const numericScore = parseFloat(score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 50) {
      return res.status(400).json({ message: 'Invalid Technical score. Must be between 0 and 50.' });
    }

    if (!user.technicalScores) {
      user.technicalScores = [];
    }

    user.technicalScores.push({ score: numericScore });
    await user.save();

    res.json({ message: 'Technical Score saved successfully' });
  } catch (error) {
    console.error('Error saving score:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Error saving score' });
  }
});

// Get All Scores
router.get('/scores', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate percentages
    const iqPercentage = user.iqScores?.length > 0 
      ? Math.round((user.iqScores[user.iqScores.length - 1].score / 12) * 100)
      : 0;

    const eqPercentage = user.eqScores?.length > 0 
      ? Math.round((user.eqScores[user.eqScores.length - 1].score / 132) * 100)
      : 0;

    const technicalPercentage = user.technicalScores?.length > 0
      ? Math.round((user.technicalScores[user.technicalScores.length - 1].score / 50) * 100)
      : 0;

    res.json({
      iq: iqPercentage,
      eq: eqPercentage,
      technical: technicalPercentage,
      hasIq: user.iqScores?.length > 0,
      hasEq: user.eqScores?.length > 0,
      hasTechnical: user.technicalScores?.length > 0
    });
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Error fetching scores' });
  }
});



module.exports = router;