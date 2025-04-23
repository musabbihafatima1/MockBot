
// // File: routes/authRoutes.js
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { check, validationResult } = require("express-validator");
// const Usercom = require("../models/CompanyUser");

// const router = express.Router();

// // Signup route
// router.post(
//   "/signup",
//   [
//     check("username", "Username is required").notEmpty(),
//     check("organizationName", "Organization Name is required").notEmpty(),
//     check("email", "Please include a valid email").isEmail(),
//     check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, organizationName, email, password } = req.body;

//     try {
//       // Check if user already exists
//       let user = await Usercom.findOne({ email });
//       if (user) {
//         return res.status(400).json({ msg: "User already exists" });
//       }

//       // Create new user with "pending" status
//       user = new Usercom({
//         username,
//         organizationName,
//         email,
//         password,
//         status: "pending", // Set status to "pending"
//       });

//       // Hash password
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);

//       await user.save();

//       res.status(201).json({ msg: "Signup request submitted. Waiting for admin approval." });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Server error");
//     }
//   }
// );

// // Login route
// router.post(
//   "/login",
//   [
//     check("email", "Please include a valid email").isEmail(),
//     check("password", "Password is required").exists(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//       // Check if user exists
//       let user = await Usercom.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ msg: "Invalid Credentials" });
//       }

//       // Check if the company is approved
//       if (user.status !== "approved") {
//         return res.status(400).json({ msg: "Your account is pending approval or has been rejected." });
//       }

//       // Compare password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ msg: "Invalid Credentials" });
//       }

//       // Create JWT token
//       const payload = {
//         user: {
//           id: user.id,
//         },
//       };

//       jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Server error");
//     }
//   }
// );

// module.exports = router;

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

module.exports = router;