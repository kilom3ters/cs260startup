require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const User = require('./models/User');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet()); // Adds various HTTP headers for security
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // Allow cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Set up cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// Set up session with MongoDB store
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  collectionName: 'sessions',
  ttl: 60 * 60 * 24, // 1 day in seconds
  autoRemove: 'native', // Use MongoDB's TTL index for session expiration
  touchAfter: 24 * 3600, // Update session only once per day unless data changes
  crypto: {
    secret: process.env.SESSION_CRYPTO_SECRET || process.env.SESSION_SECRET
  },
  stringify: false, // Store session data as objects, not strings
});

// Handle session store errors
sessionStore.on('error', function(error) {
  console.error('Session store error:', error);
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  name: 'sessionId', // Custom cookie name instead of default 'connect.sid'
  rolling: true, // Reset cookie expiration on each response
  cookie: {
    httpOnly: true, // Prevent client-side JS from reading the cookie
    secure: process.env.NODE_ENV === 'production', // Only use secure in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    path: '/',
    domain: process.env.COOKIE_DOMAIN || undefined // Restrict to specific domain in production
  }
}));

// Log session activity
app.use((req, res, next) => {
  const originalEnd = res.end;
  res.end = function() {
    if (req.session && req.session.user) {
      console.log(`Session activity: ${req.method} ${req.path} | User: ${req.session.user.username} | Session ID: ${req.session.id.substring(0, 6)}...`);
    }
    return originalEnd.apply(this, arguments);
  };
  next();
});

// Create isAuthenticated middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ 
    message: 'Authentication required', 
    success: false 
  });
};

// Create role-based authorization middleware
const hasRole = (role) => (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ 
      message: 'Authentication required', 
      success: false 
    });
  }
  
  if (req.session.user.role === role) {
    return next();
  }
  
  return res.status(403).json({ 
    message: 'Permission denied', 
    success: false 
  });
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Define routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Protected route example
app.get('/api/profile', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin-only route example
app.get('/api/admin', isAuthenticated, hasRole('admin'), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

// Session check route
app.get('/api/auth/status', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({ 
      isAuthenticated: true, 
      user: {
        id: req.session.user.id,
        username: req.session.user.username,
        email: req.session.user.email
      }
    });
  }
  
  res.json({ isAuthenticated: false });
});

// User auth routes
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: 'All fields are required',
        errors: {
          username: !username ? 'Username is required' : null,
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { username: username },
        { email: email }
      ]
    });

    if (existingUser) {
      return res.status(409).json({ 
        message: 'User already exists',
        errors: {
          username: existingUser.username === username ? 'Username already taken' : null,
          email: existingUser.email === email ? 'Email already registered' : null
        }
      });
    }

    // Create new user (password hashing is handled by the model's pre-save hook)
    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();

    // Return success response (excluding password)
    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      
      // Extract validation error messages
      Object.keys(error.errors).forEach(field => {
        errors[field] = error.errors[field].message;
      });
      
      return res.status(400).json({
        message: 'Validation failed',
        errors
      });
    }
    
    // Handle duplicate key errors (just in case the earlier check misses something)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({ 
        message: 'Duplicate field',
        errors: {
          [field]: `${field} already exists`
        }
      });
    }
    
    // Generic server error
    res.status(500).json({ 
      message: 'Error registering user', 
      error: error.message 
    });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'All fields are required',
        errors: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    
    // If user not found or password doesn't match
    if (!user || !(await user.comparePassword(password))) {
      console.log(`Failed login attempt for email: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // User authenticated successfully - create session
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role || 'user'
    };
    
    // Regenerate session ID for security
    req.session.regenerate(function(err) {
      if (err) {
        console.error('Session regeneration error:', err);
        return res.status(500).json({ message: 'Session error' });
      }

      console.log(`User ${user.username} (${user._id}) logged in successfully`);
      
      // Return success with user info (excluding password)
      res.status(200).json({ 
        message: 'Login successful',
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.post('/logout', (req, res) => {
  try {
    // Check if user is actually logged in
    if (!req.session || !req.session.user) {
      return res.status(401).json({ 
        message: 'Not logged in', 
        success: false 
      });
    }

    // Store session ID before destroying for logging purposes
    const sessionId = req.session.id;

    // Remove session from session store
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destruction error:', err);
        return res.status(500).json({ 
          message: 'Error during logout process', 
          success: false 
        });
      }

      // Get cookie options from session config to ensure proper clearing
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      };

      // Clear all authentication-related cookies
      res.clearCookie('sessionId', cookieOptions);
      
      // Clear any other auth cookies that might exist
      res.clearCookie('token', cookieOptions);
      res.clearCookie('auth', cookieOptions);

      console.log(`User logged out successfully. Session ${sessionId} destroyed.`);
      
      // Return success message
      res.status(200).json({ 
        message: 'Logged out successfully', 
        success: true 
      });
    });
  } catch (error) {
    console.error('Unexpected logout error:', error);
    res.status(500).json({
      message: 'Server error during logout',
      success: false
    });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ error: message });
});

// Route not found handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

