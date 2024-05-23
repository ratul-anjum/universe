const router = require("express").Router();

const { getHomePage, createPost } = require("../controllers/homeControllers");
const { checkLoggedIn } = require("../middlewares/common/checkAuthenticated");
const attachmentUpload = require("../middlewares/home/attachmentUpload");

// Get Home Page
router.get("/", checkLoggedIn, getHomePage);

// Create Post
router.post("/post", checkLoggedIn, attachmentUpload, createPost);

module.exports = router;