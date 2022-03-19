const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const basePath = path.join(__dirname, "templates");

//ler o body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/users/add", (req, res) => {
  res.sendFile(`${basePath}/useForm.html`);
});

app.post("/users/save", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  console.log("O nome do usuário é", name);
  console.log(`Ele tem ${age} anos`);

  res.sendFile(`${basePath}/useForm.html`);
});

app.listen(port, () => {
  console.log("Express está ativo");
});
