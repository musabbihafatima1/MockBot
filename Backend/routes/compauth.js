/*const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Usercom = require('../models/CompanyUser');

const router = express.Router();

// Registration route
/*router.post('/signup', [
  check('username', 'Username is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password should be at least 6 characters').isLength({ min: 6 }),
  check('organizationName', 'Organization Name is required').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, organizationName } = req.body;

  try {
    // Check if user already exists
    let user = await Usercom.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new Usercom({
      username,
      email,
      password,
      organizationName,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});*/
/*router.post('/signup', [
  check('username', 'Username is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password should be at least 6 characters').isLength({ min: 6 }),
  check('organizationName', 'Organization Name is required').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, organizationName } = req.body;

  try {
    // Check if user already exists
    let user = await Usercom.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user with "pending" status
    user = new Usercom({
      username,
      email,
      password,
      organizationName,
      status: "pending", // Default status
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ msg: "Signup request submitted. Waiting for admin approval." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Login route
/*
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await Usercom.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;*/
/*router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await Usercom.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check if the company is approved
    if (user.status !== "approved") {
      return res.status(400).json({ msg: 'Your account is pending approval or has been rejected.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});*/

/*
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Usercom = require("../models/CompanyUser");

const router = express.Router();

// Signup route
router.post(
  "/signup",
  [
    check("username", "Username is required").notEmpty(), // Add username validation
    check("organizationName", "Organization Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, organizationName, email, password } = req.body; // Add username to destructuring

    try {
      // Check if user already exists
      let user = await Usercom.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // Create new user with "pending" status
      user = new Usercom({
        username, // Add username
        organizationName,
        email,
        password,
        status: "pending", // Default status
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.status(201).json({ msg: "Signup request submitted. Waiting for admin approval." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// Login route
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      let user = await Usercom.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      // Check if the company is approved
      if (user.status !== "approved") {
        return res.status(400).json({ msg: "Your account is pending approval or has been rejected." });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      // Create JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;*/
// File: routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Usercom = require("../models/CompanyUser");

const router = express.Router();

// Signup route
router.post(
  "/signup",
  [
    check("username", "Username is required").notEmpty(),
    check("organizationName", "Organization Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, organizationName, email, password } = req.body;

    try {
      // Check if user already exists
      let user = await Usercom.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // Create new user with "pending" status
      user = new Usercom({
        username,
        organizationName,
        email,
        password,
        status: "pending", // Set status to "pending"
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.status(201).json({ msg: "Signup request submitted. Waiting for admin approval." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// Login route
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      let user = await Usercom.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      // Check if the company is approved
      if (user.status !== "approved") {
        return res.status(400).json({ msg: "Your account is pending approval or has been rejected." });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      // Create JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;