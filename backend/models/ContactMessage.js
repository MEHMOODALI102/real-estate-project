// backend/models/ContactMessage.js
const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    trim: true,
  },
  phone: { // Phone might be optional depending on your form requirements
    type: String,
    trim: true,
    default: '', // Set default if optional
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
  },
  receivedAt: { // Timestamp when the message was received
    type: Date,
    default: Date.now,
  },
  isRead: { // Optional: flag to track if someone has read the message
      type: Boolean,
      default: false,
  }
});

// Create and export the ContactMessage model
// Mongoose will create/use a collection named 'contactmessages'
module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
