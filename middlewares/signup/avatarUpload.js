const uploader = require("../../utilities/singleUploader");

const avatarUpload = (req, res, next) => {
    const upload = uploader("avatars", 1000000, ["image/jpeg", "image/jpg", "image/png"], "Only .jpg, jpeg and .png format allowed!");

    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        path: "avatar",
                        msg: err.message
                    }
                }
            })
        } else {
            next();
        }
    })
}

module.exports = avatarUpload;