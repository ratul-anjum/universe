const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment");

const loginRouter = require("./routers/loginRouter");
const signupRouter = require("./routers/signupRouter");
const homeRouter = require("./routers/homeRouter");
const profileRouter = require("./routers/profileRouter");

// Set View Engine
app.set("view engine", "ejs");
app.set(path.join(__dirname, "/views"));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.locals.moment = moment;

// Routers
app.use("/", loginRouter);
app.use("/signup", signupRouter);
app.use("/home", homeRouter);
app.use("/profile", profileRouter);

// Not Found Handler
app.use((req, res, next) => {
    res.status(404).render("error");
});

// Server Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({
        msg: "Something Broke!",
        error: err.message
    });
});

module.exports = app;