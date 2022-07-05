const express = require("express");
const ThoughtController = require("../controllers/ThoughtController");
const router = express.Router();

router.get("/", ThoughtController.showToughts);

module.exports = router;
