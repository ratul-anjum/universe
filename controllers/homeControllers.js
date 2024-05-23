const Post = require("../models/Post");

// Get Home Page
const getHomePage = async (req, res) => {
    const allPosts = await Post.find().sort("-createdAt");

    res.locals.allPosts = allPosts;
    res.locals.loggedInUser = {
        name: req.user.username,
        avatar: req.user.avatar
    };
    res.render("home", { title: "Home - Universe" });
};

// Create A Post
const createPost = async (req, res) => {
    try {
        const text = req.body.postText;
        const attachment = req.files.length > 0 ? req.files[0].filename : "";

        if (text.length > 0 || attachment.length > 0) {
            const newPost = new Post({
                creator: {
                    id: req.user._id,
                    name: req.user.username,
                    avatar: req.user.avatar
                },
                text,
                attachment
            });

            await newPost.save();
            res.json({
                msg: "Post created successfully!"
            })
        } else {
            res.status(404).json({
                errors: {
                    common: {
                        msg: "Please provide text or an attachment."
                    }
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: error.message,
                }
            }
        })
    }
}

module.exports = { getHomePage, createPost }