var express = require("express");
var router = express.Router();
let pdfController = require("../controllers/pdf.controller");

/* GET home page. */
router.get("/trial", pdfController.trialpdf);

// Type One
router.get("/type-one-pdf", pdfController.typeOne);
router.get("/type-one-view", pdfController.typeOneView);

// Type Two
router.get("/type-two-pdf", pdfController.typeTwo);
router.get("/type-two-view", pdfController.typeTwoView);

// Type Three
router.get("/type-three-pdf", pdfController.typeThree);
router.get("/type-three-view", pdfController.typeThreeView);

module.exports = router;
