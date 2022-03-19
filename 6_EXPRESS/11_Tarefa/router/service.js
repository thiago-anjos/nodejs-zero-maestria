const express = require("express");
const basePath = require("../utils/basePath");
const router = new express.Router();

router.get("/manual", (req, res) => {
  res.sendFile(`${basePath}/service-manual.html`);
});
router.get("/automatic", (req, res) => {
  res.sendFile(`${basePath}/service-automatic.html`);
});

module.exports = router;
