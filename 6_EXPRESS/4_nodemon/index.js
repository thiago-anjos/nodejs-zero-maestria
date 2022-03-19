const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const basePath = path.join(__dirname, "templates");

app.get("/", (req, res) => {
  console.log("req", req);
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log("Express está ativo");
});
