const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // <<< ADD THIS LINE: Import path module

// Load env variables
dotenv.config();

// App setup
const app = express();

// CORS setup
app.use(cors({
  origin: 'http://localhost:8080', // Your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to parse JSON bodies
app.use(express.json());

// --- Serve Static Files (Uploaded Images) ---
// This tells Express that any request starting with /uploads should
// look for files inside the 'backend/public/uploads' directory.
// path.join(__dirname, 'public') creates the absolute path to the public folder.
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads'))); // <<< ADD THIS LINE

// --- Routes ---
// Require route files
const propertyRoutes = require('./routes/Property');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

// Mount routes
app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// --- Connect to MongoDB ---
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected Successfully'))
.catch((err) => console.error('MongoDB Connection Error:', err));

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

