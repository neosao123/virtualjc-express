const JICarWashController = require("../../controllers/JobInstruction controller/JI.carWash.controller");
const auth = require("../../middlewares/auth");
const router = require('express').Router();

router.post('/create', auth, JICarWashController.create);
router.post('/get', auth, JICarWashController.get);

module.exports = router;