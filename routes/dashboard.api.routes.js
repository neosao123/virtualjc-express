const router = require("express").Router();
const dashBoardController = require("../controllers/dashboard.api.controller");

router.post("/get", dashBoardController.count);
router.post("/todayscustomerorders", dashBoardController.todaysCustomerOrders);
router.post("/totalcustomerorders", dashBoardController.totalCustomerOrders);
module.exports = router;