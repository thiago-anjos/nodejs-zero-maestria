const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

//configurando o partials

const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", exphbs.engine());

app.set("view engine", "handlebars");

app.use(express.static("public"));

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

app.get("/blog", (req, res) => {
  const posts = [
    { title: "titulo 1", category: "node", body: "nodejs", comments: 1 },
    {
      title: "titulo 2",
      category: "javascript",
      body: "javascript body",
      comments: 2,
    },
    { title: "titulo 3", category: "luna", body: "luna body", comments: 3 },
  ];
  res.render("blog", { posts });
});

app.listen(3000);
