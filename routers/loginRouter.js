
const router = require("express").Router();
const { getLoginPage, loginUser, logoutUser } = require("../controllers/loginControllers");
const { checkLoggedOut } = require("../middlewares/common/checkAuthenticated");
const { addLoginValidators, addLoginValidation } = require("../middlewares/login/loginValidators");

router.get("/", checkLoggedOut, getLoginPage);
router.post("/", addLoginValidators, addLoginValidation, loginUser);

// logout user
router.delete("/", logoutUser);

module.exports = router;