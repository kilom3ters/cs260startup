const bcrypt = require('bcryptjs');
const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const passwords = {};

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
        res.cookie('token', token, { secure: true, httpOnly: true, sameSite: 'strict' });
        return res.json({ user, token });
    }

    res.status(401).json({ msg: 'Invalid user or password' });
});

app.get('/cookie', (req, res) => {
    const token = uuid.v4();
    res.cookie('token', token, { secure: true, httpOnly: true, sameSite: 'strict' });
    res.json({ token });
});

app.get('*', (req, res) => {
    const token = req.cookies?.token;
    res.json({ token });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
