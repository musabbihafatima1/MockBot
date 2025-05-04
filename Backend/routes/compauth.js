const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { check, validationResult } = require("express-validator");
const CompanyUser = require("../models/CompanyUser");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx|jpg|jpeg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only PDF, DOC, DOCX, JPG, and PNG files are allowed'));
  }
});

// Signup route with file upload
router.post(
  "/signup",
  upload.single('businessDocument'),
  [
    check("organizationName", "Organization Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    check("address", "Company address is required").notEmpty(),
    check("registrationNumber", "Company registration number is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { organizationName, email, password, address, registrationNumber } = req.body;

    try {
      // Check if user already exists
      let user = await CompanyUser.findOne({ $or: [{ email }, { registrationNumber }] });
      if (user) {
        return res.status(400).json({ 
          msg: user.email === email 
            ? "Email already exists" 
            : "Registration number already exists" 
        });
      }

      // Create new company user
      user = new CompanyUser({
        organizationName,
        email,
        password,
        address,
        registrationNumber,
        status: "pending",
      });

      // Add business document if uploaded
      if (req.file) {
        user.businessDocument = {
          filename: req.file.filename,
          path: req.file.path,
          mimetype: req.file.mimetype,
        };
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.status(201).json({ 
        msg: "Company registration submitted. Waiting for admin approval.",
        userId: user._id 
      });
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
      let user = await CompanyUser.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      // Check if the company is approved
      if (user.status !== "approved") {
        return res.status(403).json({ 
          msg: user.status === "pending"
            ? "Your account is pending approval"
            : "Your account has been rejected. Please contact support."
        });
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
          role: "company",
        },
      };

      jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        { expiresIn: "1h" }, 
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);



// Get Company Name

router.get('/profile', async (req, res) => {
  try {
    // Get token from header: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const company = await CompanyUser.findById(decoded.user.id).select('organizationName');

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json({
      name: company.organizationName,
      id: company._id
    });

  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;