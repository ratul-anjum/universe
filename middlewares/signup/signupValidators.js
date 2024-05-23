const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const { unlink } = require("fs");
const path = require("path");

const addSignupValidators = [
    check("username")
        .isLength({ min: 1 })
        .withMessage("Username is required")
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid Email Address")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error("Email already in use!");
                }
            } catch (error) {
                throw new Error(error.message);
            }
        })
    ,
    check("password")
        .isStrongPassword()
        .withMessage("Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol")
];

const addSignupValidation = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        // remove uploaded file
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(path.join(__dirname, `../../public/avatars/${filename}`), (err) => {
                if (err) console.log(err);
            });
        }

        // response the errors
        res.status(500).json({
            errors: mappedErrors
        })
    }
};

module.exports = {
    addSignupValidators, addSignupValidation
}