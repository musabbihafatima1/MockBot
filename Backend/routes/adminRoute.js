// const express = require("express");
// const Usercom = require("../models/CompanyUser");
// const router = express.Router();

// // Fetch all pending company requests
// router.get("/pending-requests", async (req, res) => {
//   try {
//     const pendingRequests = await Usercom.find({ status: "pending" });
//     res.json(pendingRequests);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// });

// //Registered Companies
// router.get("/registered-companies", async (req, res) => {
//   try {
//     const registeredCompanies = await Usercom.find({ status: "approved" });
//     res.json(registeredCompanies);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// });

// // Approve a company request
// router.post("/approve-request/:id", async (req, res) => {
//   try {
//     const company = await Usercom.findById(req.params.id);
//     if (!company) {
//       return res.status(404).json({ msg: "Company not found" });
//     }

//     company.status = "approved";
//     await company.save();

//     res.json(company);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// });
 
// // Reject a company request
// router.post("/reject-request/:id", async (req, res) => {
//   try {
//     const company = await Usercom.findById(req.params.id);
//     if (!company) {
//       return res.status(404).json({ msg: "Company not found" });
//     }

//     company.status = "rejected";
//     await company.save();

//     res.json({ msg: "Company rejected successfully" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const CompanyUser = require('../models/CompanyUser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure file storage for business documents
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/business-documents');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
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

// Get all pending company requests
router.get('/pending-requests', async (req, res) => {
  try {
    const pendingCompanies = await CompanyUser.find({ status: 'pending' });
    res.json(pendingCompanies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all approved companies
router.get('/registered-companies', async (req, res) => {
  try {
    const approvedCompanies = await CompanyUser.find({ status: 'approved' });
    res.json(approvedCompanies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve a company request
router.post('/approve-request/:id', async (req, res) => {
  try {
    const company = await CompanyUser.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    company.status = 'approved';
    await company.save();
    
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reject a company request
router.post('/reject-request/:id', async (req, res) => {
  try {
    const company = await CompanyUser.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    company.status = 'rejected';
    await company.save();
    
    res.json({ message: 'Company rejected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get company details
// In your adminRoutes.js
router.get('/company/:id', async (req, res) => {
  try {
    const company = await CompanyUser.findById(req.params.id).lean();
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Include the document URL if it exists
    if (company.businessDocument) {
      company.documentUrl = `/api/admin/documents/${company.businessDocument.filename}`;
    }

    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve business documents
router.get('/documents/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads/business-documents', req.params.filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

module.exports = router;