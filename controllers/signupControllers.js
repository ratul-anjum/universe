const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../middlewares/common/generateToken");

// Get Signup Page
const signupPage = (req, res) => {
    res.status(200).render("signup");
};

// Add A New User
const addNewUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const avatar = req.files.length !== 0 ? req.files[0].filename : "nophoto.jpeg";

        bcrypt.hash(password, 10, async (err, hash) => {
            const newUser = new User({
                username, email, password: hash, avatar
            });

            await newUser.save();

            const { _id } = await User.findOne({ email });

            // Generate Token and Cookie
            generateToken(res, _id, username, email, avatar);

            res.json({
                msg: "New user was saved successfully!"
            })
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

}

module.exports = { signupPage, addNewUser };