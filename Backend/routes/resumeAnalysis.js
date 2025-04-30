const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { analyzeResume } = require('../service/resumeAnalyzer');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads/resumes');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|docx|doc/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed!'));
    }
  }
});

router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    console.log('File received:', req.file); // Debug log
    
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'No file uploaded' 
      });
    }

    const analysis = await analyzeResume(req.file.path);
    console.log('Analysis completed:', analysis); // Debug log

    res.json({
      success: true,
      message: 'Analysis complete',
      data: {
        score: analysis.score,
        suggestions: analysis.suggestions,
        extractedData: analysis.extractedData
      }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze resume',
      error: error.toString()
    });
  }
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ success: true, message: "ATS endpoint is working!" });
});

module.exports = router;