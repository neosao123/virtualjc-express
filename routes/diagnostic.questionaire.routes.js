const router = require("express").Router();
const diagnosticQuestionaireController = require("../controllers/diagnostic.questionnaire.controller");

router.post("/create", diagnosticQuestionaireController.create);

module.exports = router;

