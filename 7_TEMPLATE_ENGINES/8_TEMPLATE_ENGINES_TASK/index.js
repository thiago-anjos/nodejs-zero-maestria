const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());

app.set("view engine", "handlebars");

app.use(express.static("public"));

const products = [
  { name: "Pasta de dente", price: 14.9, weight: "90g", id: 1 },
  { name: "Fio dental", price: 14.9, weight: "90g", id: 2 },
  { name: "Escova", price: 14.9, weight: "90g", id: 3 },
  { name: "Sabonete", price: 14.9, weight: "90g", id: 4 },
  { name: "Luva", price: 14.9, weight: "90g", id: 5 },
];

app.get("/", (req, res) => {
  res.render("home", { products });
});

app.get("/product/:id", (req, res) => {
  const productChoosed = products[parseInt(req.params.id) - 1];
  console.log(productChoosed);
  res.render("product", { productChoosed });
});

app.listen(3000);
