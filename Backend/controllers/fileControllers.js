


/*const multer = require('multer');
const path = require('path');
const https = require('https');
const fs = require('fs');
const FormData = require('form-data');

// Configure multer storage for uploading files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Ensure unique filenames
  },
});

const upload = multer({ storage }).single('file');

// Convert uploaded file to PDF
const convertFile = async (req, res) => {
  try {
    // Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Path of the uploaded file
    const inputFile = req.file.path;

    // Prepare form data for the file upload
    const formData = new FormData();
    formData.append('File', fs.createReadStream(inputFile));
    formData.append('StoreFile', 'true');  // Pass 'true' as a string

    // Get headers from form data
    const headers = {
      ...formData.getHeaders(),
      Authorization: `Bearer ${process.env.CONVERTAPI_SECRET}`,
    };

    // Set up the request options
    const options = {
      hostname: 'v2.convertapi.com',
      path: '/convert/docx/to/pdf',
      method: 'POST',
      headers: headers,
    };

    // Send request to ConvertAPI
    const request = https.request(options, (response) => {
      let data = '';

      // Collect response data
      response.on('data', (chunk) => {
        data += chunk;
      });

      // End of response
      response.on('end', () => {
        // Return success response with conversion data
        if (response.statusCode === 200) {
          res.status(200).json({
            message: 'File uploaded and converted successfully!',
            result: JSON.parse(data),
          });
        } else {
          res.status(response.statusCode).json({
            message: 'Conversion failed',
            error: data,
          });
        }
      });
    });

    // Handle errors in request
    request.on('error', (error) => {
      console.error('Request Error:', error.message);
      res.status(500).json({ message: 'Conversion failed', error: error.message });
    });

    // Pipe the form data to the request
    formData.pipe(request);
  } catch (error) {
    // Log error details for debugging
    console.error('Error Details:', error.message);
    res.status(500).json({ message: 'Conversion failed', error: error.message });
  }
};

module.exports = { convertFile, upload };*/

const multer = require('multer');
const path = require('path');
const https = require('https');
const fs = require('fs');
const FormData = require('form-data');

// Configure multer storage for uploading files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Ensure unique filenames
  },
});

const upload = multer({ storage }).single('file');

// Convert uploaded file to PDF
const convertFile = async (req, res) => {
  try {
    // Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Path of the uploaded file
    const inputFile = req.file.path;

    // Prepare form data for the file upload
    const formData = new FormData();
    formData.append('File', fs.createReadStream(inputFile));
    formData.append('StoreFile', 'true');  // Pass 'true' as a string

    // Get headers from form data
    const headers = {
      ...formData.getHeaders(),
      Authorization: `Bearer ${process.env.CONVERTAPI_SECRET}`,
    };

    // Set up the request options
    const options = {
      hostname: 'v2.convertapi.com',
      path: '/convert/docx/to/pdf',
      method: 'POST',
      headers: headers,
    };

    // Send request to ConvertAPI
    const request = https.request(options, (response) => {
      let data = '';

      // Collect response data
      response.on('data', (chunk) => {
        data += chunk;
      });

      // End of response
      response.on('end', () => {
        // Return success response with conversion data
        if (response.statusCode === 200) {
          const result = JSON.parse(data);
          const pdfFileUrl = result.Files[0].Url; // Assuming this is where the URL is located

          res.status(200).json({
            message: 'File uploaded and converted successfully!',
            result: {
              FileUrl: pdfFileUrl, // Sending back the PDF file URL
              ...result, // Optionally send back other conversion details if needed
            },
          });
        } else {
          res.status(response.statusCode).json({
            message: 'Conversion failed',
            error: JSON.parse(data),
          });
        }
      });
    });

    // Handle errors in request
    request.on('error', (error) => {
      console.error('Request Error:', error.message);
      res.status(500).json({ message: 'Conversion failed', error: error.message });
    });

    // Pipe the form data to the request
    formData.pipe(request);
  } catch (error) {
    // Log error details for debugging
    console.error('Error Details:', error.message);
    res.status(500).json({ message: 'Conversion failed', error: error.message });
  }
};

module.exports = { convertFile, upload };

