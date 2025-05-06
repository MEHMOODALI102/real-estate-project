// backend/models/Agent.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique for agents
    match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Basic email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
  },
  location: { // Or maybe 'agencyLocation', 'serviceArea' etc.
    type: String,
    required: true,
  },
  role: { // Good practice to define role
    type: String,
    default: 'agent',
  },
  date: { // Registration date
    type: Date,
    default: Date.now,
  },
  // You could add more agent-specific fields here later
  // e.g., licenseNumber: String, agencyName: String, properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
});

// Optional but Recommended: Pre-save hook to hash password automatically
// This way you don't have to hash it manually in the route handler every time
AgentSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Agent', AgentSchema); // Creates 'agents' collection