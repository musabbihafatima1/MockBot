const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/user.js');
const router = express.Router();


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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });

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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ message: 'Authorization token is missing' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//     req.user = decoded;
//     next();
//   });
// };
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = { userId: decoded.userId }; // Standardize to userId
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



//gets all three scores 
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

    // Get the most recent scores
    const latestEq = user.eqScores?.length > 0 
      ? user.eqScores[user.eqScores.length - 1].score 
      : 0;
    const latestIq = user.iqScores?.length > 0 
      ? user.iqScores[user.iqScores.length - 1].score 
      : 0;
    const latestTechnical = user.technicalScores?.length > 0
      ? user.technicalScores[user.technicalScores.length - 1].score
      : 0;

    // Calculate percentages
    const eqPercentage = Math.round((latestEq / 132) * 100);
    const iqPercentage = Math.round((latestIq / 12) * 100);
    const technicalPercentage = Math.round((latestTechnical / 50) * 100);

    res.json({
      eqScore: eqPercentage,
      iqScore: iqPercentage,
      technicalScore: technicalPercentage,
      hasEq: user.eqScores?.length > 0,
      hasIq: user.iqScores?.length > 0,
      hasTechnical: user.technicalScores?.length > 0
    });

  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Error fetching scores' });
  }
});


router.post('/savetechnicalfield', authMiddleware, async (req, res) => { // Added authMiddleware
  try {
    const { technicalField } = req.body;

    if (!technicalField) {
      return res.status(400).json({ 
        success: false,
        message: 'Technical field is required' 
      });
    }

    // Update user's technical field using userId from auth middleware
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId, // Changed to userId from decoded token
      { technicalField },
      { new: true, runValidators: true } // Added validation
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      message: 'Technical field updated successfully',
      user: updatedUser
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});



module.exports = router;