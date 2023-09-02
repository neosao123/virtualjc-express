const router = require("express").Router();
const JIjobDetailsController = require("../../controllers/JobInstruction controller/JI.JobDetails.controller");
const auth = require("../../middlewares/auth");

router.post("/get", auth, JIjobDetailsController.get);
router.post("/create", auth, JIjobDetailsController.create);

module.exports = router;