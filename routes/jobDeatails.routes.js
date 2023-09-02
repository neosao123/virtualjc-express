const router = require("express").Router();
const jobDetailsController = require("../controllers/jobdetails.controller");
const auth = require("../middlewares/auth");

router.post("/create", auth, jobDetailsController.create);

module.exports = router;





