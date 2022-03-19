const express = require("express");
const app = express();
const port = 3000;
const usersRouter = require("./users");
const basePath = require("./utils/basepath");

//ler o body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//arquivos estáticos
app.use(express.static("public"));

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log("Express está ativo");
});
