const bcrypt = require('bcryptjs');
const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

const passwords = {};
const sessions = {}; 

app.post('/register', async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({ msg: "Missing user or password" });

    const hashedPassword = await bcrypt.hash(password, 10);
    passwords[user] = hashedPassword;
    
    res.json({ user });
});

app.put('/login', async (req, res) => {
    const { user, password } = req.body;
    const hashedPassword = passwords[user];

    if (hashedPassword && await bcrypt.compare(password, hashedPassword)) {
        const token = uuid.v4();
        sessions[token] = user; 
        res.cookie('token', token, { secure: true, httpOnly: true, sameSite: 'strict' });
        return res.json({ user, token });
    }

    res.status(401).json({ msg: 'Invalid user or password' });
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

app.get('/session', (req, res) => {
    const token = req.cookies?.token;
    const user = sessions[token] || null;
    res.json({ user });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
