const express = require('express');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const mongoose = require('mongoose');
const dbConfig = require('../dbConfig.json');
const User = require('./models/user');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
const sessions = {};

mongoose.connect(dbConfig.connectionString, {
  bufferCommands: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4,
  maxPoolSize: 10,
  connectTimeoutMS: 30000,
  retryWrites: true
})
  .then(() => {
    console.log('Connected to MongoDB!');
    const PORT = 4000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

mongoose.set('debug', true);

app.get('/api/quote', async (req, res) => {
  try {
    console.log("Fetching quote from ZenQuotes API...");
    const response = await fetch('https://zenquotes.io/api/random');
    console.log(`API Response Status: ${response.status}`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log("API Response Data:", data);
    if (!Array.isArray(data) || !data[0]?.q || !data[0]?.a) {
      throw new Error("Invalid API response format");
    }
    res.json({ quote: data[0].q, author: data[0].a });
  } catch (error) {
    console.error("Error fetching quote:", error.message);
    res.status(500).json({ quote: "No quote available", author: "Unknown" });
  }
});

app.post('/register', async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(400).json({ msg: "Missing username or password" });
  }

  const existingUser = await User.findOne({ username: user });
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username: user,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  });
  
  try {
    await newUser.save();
    const token = uuidv4();
    const sessionUser = { username: newUser.username, createdAt: newUser.createdAt, id: newUser._id };
    sessions[token] = sessionUser;
    res.cookie('token', token, { secure: true, httpOnly: true, sameSite: 'strict' });
    console.log("User Registered & Logged In:", sessionUser);
    return res.json({ user: sessionUser, token });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ msg: "Error registering user" });
  }
});

app.post('/login', async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(400).json({ msg: "Missing username or password" });
  }
  
  try {
    const foundUser = await User.findOne({ username: user });
    if (!foundUser) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }
    
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }
    
    const token = uuidv4();
    const sessionUser = { username: foundUser.username, createdAt: foundUser.createdAt, id: foundUser._id };
    sessions[token] = sessionUser;
    res.cookie('token', token, { secure: true, httpOnly: true, sameSite: 'strict' });
    console.log("Login Successful:", sessionUser);
    return res.json({ user: sessionUser, token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ msg: "Error during login" });
  }
});

app.get('/api/user', (req, res) => {
  const token = req.cookies?.token;
  if (!token || !sessions[token]) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  res.json({ user: sessions[token] });
});

app.post('/logout', (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    delete sessions[token];
    res.clearCookie('token');
  }
  res.json({ msg: "Logged out successfully" });
});

app.put('/api/user/profilePic', authenticate, async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.user.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { profilePic }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ msg: "Server error updating profile picture" });
  }
});

app.put('/api/user/favoriteGame', authenticate, async (req, res) => {
  const { favoriteGame } = req.body;
  const userId = req.user.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { favoriteGame }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating favorite game:", error);
    res.status(500).json({ msg: "Server error updating favorite game" });
  }
});

app.put('/api/user/gameCategories', authenticate, async (req, res) => {
  const { gameCategories } = req.body;
  const userId = req.user.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { gameCategories }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating game categories:", error);
    res.status(500).json({ msg: "Server error updating game categories" });
  }
});

app.put('/api/user/friends', authenticate, async (req, res) => {
  const { friends } = req.body;
  const userId = req.user.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { friends }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating friends:", error);
    res.status(500).json({ msg: "Server error updating friends" });
  }
});


function authenticate(req, res, next) {
  const token = req.cookies?.token;
  if (!token || !sessions[token]) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  req.user = sessions[token];
  next();
}

app.get('/api/protected', authenticate, (req, res) => {
  res.json({ msg: `Hello, ${req.user.username}! You are authenticated.` });
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
