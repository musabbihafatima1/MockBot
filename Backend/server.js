const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const aiRoutes= require('./routes/aiRoute');
const adminRoutes= require ('./routes/adminRoute');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables



const app = express();

// Middleware to parse incoming JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
  credentials: true  // Allow cookies and other credentials
}));

// File conversion API route
app.use('/api/files', fileRoutes);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/compauth', require('./routes/compauth'));
app.use("/api/eq-questions", require('./routes/eq'));
app.use('/api', aiRoutes);
app.use('/api/admin', adminRoutes);


// Start the server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Error: ', err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
