const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "nodemysql2",
});

conn.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectou com mysql");
    app.listen(3000);
  }
});
