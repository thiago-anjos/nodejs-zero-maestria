const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");

const User = require("./models/User");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//pegar o body da requisição
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

app.post("/users/create", async (req, res) => {
  let name = req.body.name;
  let occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  newsletter === "on" ? (newsletter = true) : (newsletter = false);

  console.log("dados de criação do usuário", req.body);

  await User.create({ name, occupation, newsletter });

  res.redirect("/");
});

app.get("/users/create", (req, res) => {
  res.render("addUser");
});

app.get("/", async (req, res) => {
  const users = await User.findAll({ raw: true });

  //foreach altera o array original
  users.forEach(function (a) {
    a.newsletter = a.newsletter === 1 ? "Sim" : "Não";
  });

  res.render("home", { users });
});

//forma de manter a conexão persistente

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
