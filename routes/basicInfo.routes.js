const router = require("express").Router();
const basicInfoController = require("../controllers/basicInfo.controller");

const auth = require("../middlewares/auth");

// router.post('/create', auth, basicInfoController.create);
router.post('/craeteorupdate', auth, basicInfoController.createorupdate);

module.exports = router;