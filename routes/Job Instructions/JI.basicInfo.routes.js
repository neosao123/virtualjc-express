const router = require("express").Router();
const JIbasicInfoCOntroller = require("../../controllers/JobInstruction controller/JI.basicInfo.controllers");
const auth = require("../../middlewares/auth");

router.post("/get", auth, JIbasicInfoCOntroller.get);
router.post("/update", auth, JIbasicInfoCOntroller.update);

module.exports = router;