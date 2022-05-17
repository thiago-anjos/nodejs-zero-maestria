const express = require("express");
const exphbs = require("express-handlebars");
const pool = require("./db/conn");

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

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const books = data;
    res.render("books", { books });
  });
});

app.get("/book/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const book = data[0];
    res.render("book", { book });
  });
});

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;

  pool.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/books");
  });
});

app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const book = data[0];
    res.render("editbook", { book });
  });
});

app.post("/books/updatebook", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `UPDATE books SET title= '${title}', pageqty = '${pageqty}' WHERE id = ${id}`;

  pool.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/books");
  });
});

app.post("/books/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM books WHERE id = ${id}`;

  pool.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/books");
  });
});

app.listen(3000);
