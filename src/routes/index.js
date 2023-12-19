const express = require("express");
const jsonController = require("../controllers/jsonController.js");

const router = express.Router();

router.post("/validateAndSave", jsonController.validateAndSave);

module.exports = router;
