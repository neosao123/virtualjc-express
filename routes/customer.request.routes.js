const router = require("express").Router();
const customerRequestController = require("../controllers/customer.request.controller");
const auth = require("../middlewares/auth");

router.post("/create", auth, customerRequestController.create);

module.exports = router;