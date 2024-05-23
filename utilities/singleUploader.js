const multer = require("multer");
const path = require("path");

const uploader = (sub_folder, max_file_size, allowed_file_types, err_msg) => {
    const UPLOADS_FOLDER = path.join(__dirname, `../public/${sub_folder}`);

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOADS_FOLDER);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
            cb(null, fileName + fileExt);
        }
    });

    const upload = multer({
        storage,
        limits: {
            fileSize: max_file_size
        },
        fileFilter: (req, file, cb) => {
            if (allowed_file_types.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error(err_msg));
            }
        }
    });

    return upload;
}

module.exports = uploader;