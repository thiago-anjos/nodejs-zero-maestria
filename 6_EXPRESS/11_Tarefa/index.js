const express = require("express");
const basePath = require("./utils/basePath");
const app = express();
const port = 5000;

app.use(express.static("public"));

const serviceRouter = require("./router/service");

app.use("/service", serviceRouter);

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
