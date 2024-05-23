const router = require("express").Router();

const { signupPage, addNewUser } = require("../controllers/signupControllers");
const { checkLoggedOut } = require("../middlewares/common/checkAuthenticated");
const avatarUpload = require("../middlewares/signup/avatarUpload");
const { addSignupValidators, addSignupValidation } = require("../middlewares/signup/signupValidators");

router.get("/", checkLoggedOut, signupPage);
router.post("/", avatarUpload, addSignupValidators, addSignupValidation, addNewUser);

module.exports = router;