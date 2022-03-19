const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log("req", req);
  res.send("Olá mundo");
});

app.listen(port, () => {
  console.log("Express está ativo");
});
