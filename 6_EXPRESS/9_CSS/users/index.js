const express = require("express");
const basePath = require("../utils/basepath");
const router = new express.Router();

router.get("/add", (req, res) => {
  res.sendFile(`${basePath}/useForm.html`);
});

router.post("/save", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  console.log("O nome do usuário é", name);
  console.log(`Ele tem ${age} anos`);

  res.sendFile(`${basePath}/useForm.html`);
});

module.exports = router;
