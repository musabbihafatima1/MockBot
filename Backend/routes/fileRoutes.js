const express = require('express');
const router = express.Router();
const { upload, convertFile } = require('../controllers/fileControllers');

// Route to handle file upload and conversion
router.post('/convert', upload, convertFile);

module.exports = router;
