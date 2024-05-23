const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    creator: {
        id: mongoose.Types.ObjectId,
        name: String,
        avatar: String
    },
    text: String,
    attachment: String
}, { timestamps: true });

const Post = mongoose.model("posts", postSchema);

module.exports = Post;