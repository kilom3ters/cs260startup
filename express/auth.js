const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const passwords = {};
const sessions = {};

async function register(req, res) {
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({ msg: "Missing user or password" });

    const hashedPassword = await bcrypt.hash(password, 10);
    passwords[user] = hashedPassword;

    res.json({ user });
}

async function login(req, res) {
    const { user, password } = req.body;
    const hashedPassword = passwords[user];

    if (hashedPassword && await bcrypt.compare(password, hashedPassword)) {
        const token = uuid.v4();
        sessions[token] = user;
        res.cookie('token', token, { secure: true, httpOnly: true, sameSite: 'strict' });
        return res.json({ user, token });
    }

    res.status(401).json({ msg: 'Invalid user or password' });
}

function logout(req, res) {
    const token = req.cookies?.token;
    if (token) {
        delete sessions[token];
        res.clearCookie('token');
    }
    res.json({ msg: "Logged out" });
}

module.exports = { register, login, logout };
