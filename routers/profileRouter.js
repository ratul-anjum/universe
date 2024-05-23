const router = require("express").Router();
const { checkLoggedIn } = require("../middlewares/common/checkAuthenticated");
const Post = require("../models/Post");

router.get("/", checkLoggedIn, async (req, res) => {
    const allPosts = await Post.find({ "creator.id": req.user._id }).sort("-createdAt");

    res.locals.allPosts = allPosts;
    res.locals.loggedInUser = {
        name: req.user.username,
        avatar: req.user.avatar
    };
    res.render("profile", { title: "Profile - Universe" });
})

module.exports = router;