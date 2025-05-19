const express = require('express');
const router = express.Router();
const CompanyUser = require('../models/CompanyUser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');



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
//Approve and reject company request with email


const approvalEmailTemplate = (companyName) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .header { color: #6A1B9A; font-size: 24px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        .content { padding: 20px 0; font-family: Arial, sans-serif; }
        .footer { color: #666; font-size: 12px; border-top: 2px solid #eee; padding-top: 10px; }
        .button { 
             background-color: #6A1B9A; 
    color: white !important; /* Force white text */
    padding: 12px 25px; 
    text-decoration: none !important; /* Remove underline */
    border-radius: 5px; 
    display: inline-block;
    margin: 15px 0;
        }
    /* Specifically target anchor tags with button class */
a.button {
    color: white !important;
    text-decoration: none !important;
}
    </style>
</head>
<body>
    <div class="header">
        <strong>Mock</strong><span style="color: #6A1B9A;">bot</span>
    </div>
    
    <div class="content">
        <p>Dear ${companyName},</p>
        
        <p>We are pleased to inform you that your company registration request has been <strong>approved</strong>!</p>
        
        <p>You can now access your Mockbot account and start using our platform to manage your business needs.</p>
        
        <a href="http://localhost:3000/companyregistration#" class="button">Login to Your Account</a>
        
        <p>If you have any questions, please contact our support team at support@mockbot.com</p>
    </div>
    
    <div class="footer">
        <p>Best regards,<br>The Mockbot Team</p>
        <p>© 2023 Mockbot Inc. All rights reserved</p>
    </div>
</body>
</html>
`;

const rejectionEmailTemplate = (companyName) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .header { color: #6A1B9A; font-size: 24px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        .content { padding: 20px 0; font-family: Arial, sans-serif; }
        .footer { color: #666; font-size: 12px; border-top: 2px solid #eee; padding-top: 10px; }
        .button { 
             background-color: #6A1B9A; 
    color: white !important; /* Force white text */
    padding: 12px 25px; 
    text-decoration: none !important; /* Remove underline */
    border-radius: 5px; 
    display: inline-block;
    margin: 15px 0;
        }
    /* Specifically target anchor tags with button class */
a.button {
    color: white !important;
    text-decoration: none !important;
}
    </style>
</head>
<body>
    <div class="header">
        <strong>Mock</strong><span style="color: #6A1B9A;">bot</span>
    </div>
    
    <div class="content">
        <p>Dear ${companyName},</p>
        
        <p>After careful consideration, we regret to inform you that your company registration request could not be approved at this time.</p>
        
        <p>This decision was made due to one or more of the following reasons:<br>
        - Information provided didn't meet our verification criteria<br>
        - Documentation was incomplete or unclear<br>
        - Business type doesn't match our current service offerings</p>
        
        <p>You may reapply after addressing these issues or contact our support team at support@mockbot.com for more details.</p>
    </div>
    
    <div class="footer">
        <p>Best regards,<br>The Mockbot Team</p>
        <p>© 2023 Mockbot Inc. All rights reserved</p>
    </div>
</body>
</html>
`;



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
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

  
    const mailOptions = {
      from: `Mockbot Team <${process.env.EMAIL_USER}>`,
      to: company.email,
      subject: '🎉 Your Company Registration Has Been Approved!',
      html: approvalEmailTemplate (company.organizationName)
    };

    await transporter.sendMail(mailOptions);
    
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

    
    const mailOptions = {
      from: `Mockbot Team <${process.env.EMAIL_USER}>`,
      to: company.email,
      subject: 'Your Company Registration has been Rejected',
      html: rejectionEmailTemplate(company.organizationName)
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ message: 'Company rejected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get company details

router.get('/company/:id', async (req, res) => {
  try {
    const company = await CompanyUser.findById(req.params.id).lean();
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }


    if (company.businessDocument) {
      company.documentUrl = `/api/admin/documents/${company.businessDocument.filename}`;
    }

    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/documents/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads/business-documents', req.params.filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

module.exports = router;