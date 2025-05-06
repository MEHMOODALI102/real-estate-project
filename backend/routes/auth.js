// backend/routes/auth.js (Handles both User and Agent Auth)

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import BOTH models
const User = require('../models/User.js');   // Your existing User model
const Agent = require('../models/Agent.js'); // The new Agent model

// --- REGULAR USER ROUTES ---

// USER REGISTER
// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    console.log('User Register route hit with data:', req.body);
    const { username, email, phone, password } = req.body;

    // Basic validation
    if (!username || !email || !phone || !password) {
        return res.status(400).json({ message: 'Please provide username, email, phone, and password' });
    }
     if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists by email
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Check if username is taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      console.log('Username already taken:', username);
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash password (if not using pre-save hook in User model)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword, // Save the hashed password
    });

    // Save user to MongoDB ('users' collection)
    const savedUser = await newUser.save();
    console.log('User saved to MongoDB:', savedUser._id);

    // Exclude password from the response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);

  } catch (err) {
    console.error('Error saving user to MongoDB:', err);
    res.status(500).json({ message: 'Server error during user registration', error: err.message });
  }
});

// USER LOGIN
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    console.log('User Login route hit with data:', req.body);
    const { email, password } = req.body;

     if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        console.log('User login failed: User not found for email:', email);
        return res.status(400).json({ message: 'Invalid Credentials' }); // Generic error
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log('User login failed: Password mismatch for email:', email);
        return res.status(400).json({ message: 'Invalid Credentials' }); // Generic error
    }

    console.log('User login successful for:', email);

    // Create JWT token for User
    const payload = {
        user: { // Payload specific to user
            id: user._id,
            username: user.username
        }
    };
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '3d' } // Consider shorter expiration (e.g., '1d', '8h')
    );

    // Exclude password from user object in response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      token,
      user: userResponse // Send user details (without password)
    });

  } catch (err) {
    console.error('Error during user login:', err);
    res.status(500).json({ message: 'Server error during user login', error: err.message });
  }
});


// --- AGENT ROUTES ---

// AGENT REGISTER
// @route   POST /api/auth/agent/register
router.post('/agent/register', async (req, res) => {
  console.log('Agent Register endpoint hit');
  const { name, email, password, phone, location } = req.body;

  try {
    // Basic validation
    if (!name || !email || !password || !phone || !location) {
      return res.status(400).json({ message: 'Please enter all required agent fields' });
    }
    // Password length check is implicitly handled by Mongoose schema minlength

    // Check if agent already exists (using Agent model)
    let agent = await Agent.findOne({ email });
    if (agent) {
      console.log('Agent registration failed: Email already exists:', email);
      return res.status(400).json({ message: 'Agent with this email already exists' });
    }

    // Create new agent instance (password will be hashed by pre-save hook)
    agent = new Agent({
      name,
      email,
      password, // Pass plain password, hook will hash it
      phone,
      location,
    });

    // Save agent to database ('agents' collection)
    const savedAgent = await agent.save();
    console.log('Agent registered successfully:', savedAgent.email);

    // Generate JWT token for Agent
    const payload = {
      agent: { // Payload specific to agent
        id: savedAgent.id,
        name: savedAgent.name,
        role: savedAgent.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // Agent session expiration
      (err, token) => {
        if (err) throw err;
        // Exclude password from response object
        const agentResponse = savedAgent.toObject();
        delete agentResponse.password;
        res.status(201).json({ message: 'Agent registration successful', token, agent: agentResponse });
      }
    );

  } catch (err) {
    console.error('Agent Registration error:', err);
     // Handle Mongoose validation errors specifically
    if (err.name === 'ValidationError') {
         const messages = Object.values(err.errors).map(val => val.message);
         return res.status(400).json({ message: 'Validation failed', errors: messages });
    }
    res.status(500).json({ message: 'Server error during agent registration', error: err.message });
  }
});

// AGENT LOGIN
// @route   POST /api/auth/agent/login
router.post('/agent/login', async (req, res) => {
  console.log('Agent Login endpoint hit');
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide agent email and password' });
    }

    // Check for agent (using Agent model)
    const agent = await Agent.findOne({ email });
    if (!agent) {
        console.log('Agent login failed: Agent not found for email:', email);
        return res.status(400).json({ message: 'Invalid Credentials' }); // Generic error
    }

    // Compare submitted password with hashed password in DB
    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
        console.log('Agent login failed: Password mismatch for email:', email);
        return res.status(400).json({ message: 'Invalid Credentials' }); // Generic error
    }

    console.log('Login successful for agent:', agent.email);

    // Agent matched, create JWT payload
    const payload = {
      agent: { // Payload specific to agent
        id: agent.id,
        name: agent.name,
        role: agent.role
      }
    };

    // Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // Agent session expiration
      (err, token) => {
        if (err) throw err;
        // Exclude password from agent object in response
        const agentResponse = agent.toObject();
        delete agentResponse.password;
        // Send token and agent details (without password)
        res.json({ message: 'Login successful', token, agent: agentResponse });
      }
    );

  } catch (err) {
    console.error('Agent Login error:', err);
    res.status(500).json({ message: 'Server error during agent login', error: err.message });
  }
});


module.exports = router; // Export the router with all routes
