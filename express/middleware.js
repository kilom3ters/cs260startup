const { sessions } = require('./auth');

function authenticate(req, res, next) {
    const token = req.cookies?.token;
    if (!token || !sessions[token]) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    req.user = sessions[token];
    next();
}

module.exports = { authenticate };
