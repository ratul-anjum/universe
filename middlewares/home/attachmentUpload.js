const uploader = require("../../utilities/singleUploader");

const attachmentUpload = (req, res, next) => {
    const upload = uploader("attachments", 1000000, ["image/jpg", "image/jpeg", "image/png"], "Only .jpg, jpeg and .png format allowed !");

    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    attachment: {
                        msg: err.message,
                    }
                }
            })
        } else {
            next();
        }
    })
}

module.exports = attachmentUpload;