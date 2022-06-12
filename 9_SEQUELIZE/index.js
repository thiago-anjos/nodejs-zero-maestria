const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");

const User = require("./models/User");
const Address = require("./models/Address");

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

//EDIÇÃO
app.get("/users/edit/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ raw: true, where: { id: id } });

  const newsletter = user.newsletter === 1 ? true : false;

  res.render("userInfo", { user, newsletter, edit: true });
});

app.post("/users/edit", async (req, res) => {
  let name = req.body.name;
  let occupation = req.body.occupation;
  let newsletter = req.body.newsletter;
  let id = req.body.id;
  newsletter === "on" ? (newsletter = true) : (newsletter = false);

  const userData = {
    id,
    name,
    occupation,
    newsletter,
  };

  await User.update(userData, { where: { id: id } });

  res.redirect("/");
});

//CRIAÇÃO
app.post("/users/create", async (req, res) => {
  let name = req.body.name;
  let occupation = req.body.occupation;
  let newsletter = req.body.newsletter;
  newsletter === "on" ? (newsletter = true) : (newsletter = false);
  await User.create({ name, occupation, newsletter });

  res.redirect("/");
});

app.get("/users/create", (req, res) => {
  res.render("userInfo");
});

//USUÁRIO
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ raw: true, where: { id: id } });
  res.render("userview", { user });
});

//DELETAR USUARIO
app.post("/users/delete/:id", async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id: id } });

  res.redirect("/");
});

// ENDEREÇO
app.post("/address/create", async (req, res) => {
  console.log(req.body);
  const UserId = req.body.UserId;
  const street = req.body.street;
  const number = req.body.number;
  const city = req.body.city;

  const address = {
    UserId,
    street,
    number,
    city,
  };

  await Address.create(address);

  res.redirect(`/users/edit/${UserId}`);
});

//LISTAR USUÁRIO
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
