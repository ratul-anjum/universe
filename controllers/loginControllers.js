const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../middlewares/common/generateToken");

// Get Login Page
const getLoginPage = (req, res) => {
    res.status(200).render("login");
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { _id, username, email, password, avatar } = await User.findOne({ email: req.body.email });

        bcrypt.compare(req.body.password, password, async (err, result) => {
            if (result) {
                // Generate Token and Cookie
                generateToken(res, _id, username, email, avatar);

                res.json({
                    msg: "Logged in successfully!"
                })
            } else {
                res.status(404).json({
                    errors: {
                        password: {
                            msg: "Password is incorrect!",
                            path: "password"
                        }
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: error.message,
                    path: "common"
                }
            }
        })
    }
};

// Logout User
const logoutUser = (req, res) => {
    res.clearCookie(process.env.JWT_COOKIE_NAME);
    res.json("Logged Out Successfully!");
}

module.exports = { getLoginPage, loginUser, logoutUser }