const express = require("express");
const ThoughtController = require("../controllers/ThoughtController");
const router = express.Router();

//helper
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/dashboard", checkAuth, ThoughtController.dashboard);
router.get("/", ThoughtController.showToughts);

module.exports = router;
