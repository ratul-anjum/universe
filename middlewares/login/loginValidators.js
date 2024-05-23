const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

const addLoginValidators = [
    check("email")
        .isEmail()
        .withMessage("Invalid Email Address")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (!user) {
                    throw new Error("Email was not found!");
                }
            } catch (error) {
                throw new Error(error.message);
            }
        }),
    check("password")
        .isLength({ min: 1 })
        .withMessage("Password is required")
]

const addLoginValidation = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(500).json({
            errors: mappedErrors
        })
    }
}

module.exports = { addLoginValidators, addLoginValidation }