const jwt = require("jsonwebtoken");

const checkLoggedIn = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if (cookies) {
        const token = cookies[process.env.JWT_COOKIE_NAME];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } else {
        res.redirect("/");
    }
}

const checkLoggedOut = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if (!cookies) {
        next();
    } else {
        res.redirect("/home");
    }
}

module.exports = { checkLoggedIn, checkLoggedOut };