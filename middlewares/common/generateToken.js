const jwt = require("jsonwebtoken");

const generateToken = (res, _id, username, email, avatar) => {
    const userObject = {
        _id,
        username,
        email,
        avatar
    }
    const token = jwt.sign(userObject, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
    res.cookie(process.env.JWT_COOKIE_NAME, token, {
        maxAge: process.env.JWT_EXPIRY,
        httpOnly: true,
        signed: true
    })
}

module.exports = generateToken;