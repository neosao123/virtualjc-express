const sampleController = require("../controllers/Sample");
const router = require("express").Router();
const multer = require("multer");
const auth = require("../middlewares/auth");


router.post("/create",  sampleController.create);
router.post("/update", sampleController.update);

module.exports = router;