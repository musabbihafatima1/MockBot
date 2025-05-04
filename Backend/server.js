const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const userData= require('./routes/auth');
const aiRoutes= require('./routes/aiRoute');
const adminRoutes= require ('./routes/adminRoute');
const universityMail= require ('./routes/university');
const companyRoute= require ('./routes/companyRoute');
const techQuesRoute= require ('./routes/technicalQuesSave');
const { scheduleReport } = require('./service/schedular');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 


const app = express();

// Middleware to parse incoming JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
  credentials: true // Allow cookies and other credentials
 
}));

// File conversion API route
app.use('/api/files', fileRoutes);
app.use('/api/auth', userData);
app.use('/api/compauth', require('./routes/compauth'));
app.use("/api/eq-questions", require('./routes/eq'));
app.use('/api', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/company', companyRoute);
app.use('/api/university', universityMail);
app.use('/api/resume', require('./routes/resumeAnalysis')); // Added resume analysis route
app.use('/api', techQuesRoute);
scheduleReport();

// Start the server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Error: ', err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
