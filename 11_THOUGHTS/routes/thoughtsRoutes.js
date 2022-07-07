const express = require("express");
const ThoughtController = require("../controllers/ThoughtController");
const router = express.Router();

//helper
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/add", checkAuth, ThoughtController.createThoughts);
router.post("/add", checkAuth, ThoughtController.createThoughtsSave);
router.get("/edit/:id", checkAuth, ThoughtController.editThoughts);
router.post("/edit", checkAuth, ThoughtController.updateThoughtsSave);
router.get("/dashboard", checkAuth, ThoughtController.dashboard);
router.get("/", checkAuth, ThoughtController.showToughts);
router.post("/remove", checkAuth, ThoughtController.removeThoughts);

module.exports = router;
