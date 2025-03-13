import express from 'express';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch'; // ✅ Import `fetch` for making API calls

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

const passwords = {}; 
const sessions = {}; 

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/quote', async (req, res) => {
  try {
      console.log("Fetching quote from ZenQuotes API...");
      const response = await fetch('https://zenquotes.io/api/random');

      if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("API response data:", data);

      if (!data[0].q || !data[0].a) throw new Error("Invalid API response");

      res.json({ quote: data[0].q, author: data[0].a });
  } catch (error) {
      console.error("Error fetching quote:", error.message);
      res.status(500).json({ quote: "No quote available", author: "Unknown" });
  }
});


app.post('/register', async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({ msg: "Missing user or password" });

    if (passwords[user]) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    passwords[user] = hashedPassword;

    console.log("User Registered:", user);
    return res.json({ user });
});

app.put('/login', async (req, res) => {
    const { user, password } = req.body;
    const hashedPassword = passwords[user];

    if (hashedPassword && await bcrypt.compare(password, hashedPassword)) {
        const token = uuidv4();
        sessions[token] = user;
        res.cookie('token', token, { secure: true, httpOnly: true, sameSite: 'strict' });
        console.log("Login Successful:", user);
        return res.json({ user, token });
    }

    return res.status(401).json({ msg: 'Invalid user or password' });
});

app.post('/logout', (req, res) => {
    const token = req.cookies?.token;
    if (token) {
        delete sessions[token];
        res.clearCookie('token');
    }
    res.json({ msg: "Logged out successfully" });
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
    res.json({ msg: `Hello, ${req.user}! You are authenticated.` });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
