// backend/routes/contact.js
const router = require('express').Router();
const ContactMessage = require('../models/ContactMessage.js'); // Import the model

// @route   POST /api/contact/
// @desc    Save a new contact message
// @access  Public
router.post('/', async (req, res) => {
  console.log('Contact form submission received:', req.body);
  const { name, email, phone, message } = req.body;

  try {
    // Basic validation (Mongoose schema handles more)
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    // Create a new message instance
    const newMessage = new ContactMessage({
      name,
      email,
      phone, // Include phone if provided
      message,
    });

    // Save the message to the database
    const savedMessage = await newMessage.save();
    console.log('Contact message saved:', savedMessage._id);

    // Send success response
    res.status(201).json({ message: 'Message received successfully. Thank you!' });

  } catch (err) {
    console.error('Error saving contact message:', err);
     // Handle Mongoose validation errors specifically
    if (err.name === 'ValidationError') {
         const messages = Object.values(err.errors).map(val => val.message);
         return res.status(400).json({ message: 'Validation failed', errors: messages });
    }
    res.status(500).json({ message: 'Server error while saving message.', error: err.message });
  }
});

module.exports = router;
