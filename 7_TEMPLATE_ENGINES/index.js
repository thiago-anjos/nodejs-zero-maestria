const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/", (req, res) => {
  const user = {
    name: "thiago",
    age: 28,
  };

  const title = "HandleBar Express";

  const auth = true;

  const approved = false;

  const items = ["item a", "item b"];

  res.render("home", { user, title, auth, approved, items });
});

app.get("/post", (req, res) => {
  const post = {
    title: "Aprender nodejs",
    category: "Node",
    body: "Curso na udemy",
    comments: 4,
  };

  res.render("blog", { post });
});

app.listen(3000);
