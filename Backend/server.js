const express = require('express');
   const dotenv = require('dotenv');
   const cors = require('cors');
   const mongoose = require('mongoose');
   
   // Load environment variables
   dotenv.config();
   // Connect to MongoDB
   mongoose.connect(process.env.MONGODB_URI)
     .then(() => console.log('MongoDB connected successfully!'))
     .catch((err) => console.error('MongoDB connection error:', err));
   // Initialize Express app
   const app = express();

   // Middleware
   app.use(cors());
   app.use(express.json());
   // Routes
   app.use('/api/auth', require('./routes/authRoutes'));
   // Test route
   app.get('/', (req, res) => {
     res.json({ message: 'Welcome to Postomatic Pro API!' });
   });

   // Start server
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });