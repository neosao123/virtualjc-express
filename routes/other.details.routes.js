const router = require("express").Router();
const otherDetailsController = require("../controllers/other.details.controller");
const auth = require("../middlewares/auth");
const multer = require("multer");


//img storage path
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/otherdetails");
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
    },
});
//img filter
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(new Error("Only image is allowed"));
    }
};

const upload = multer({
    storage: imgconfig,
    fileFilter: isImage,
});

router.post("/create", auth, otherDetailsController.create);

module.exports = router;