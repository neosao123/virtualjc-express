const router = require("express").Router();
const DetailInfoController = require("../controllers/detail.info.controller");
const auth = require("../middlewares/auth");

 

router.post("/create", auth,  DetailInfoController.create);
module.exports = router;