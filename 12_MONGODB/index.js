const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const conn = require("./db/conn");

app.set("view engine", "handlebars");

//receber resposta do body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.engine(
  "handlebars",
  exphbs.engine({
    helpers: {
      toJSON: function (object) {
        return JSON.stringify(object);
      },
    },
  })
);

app.use(express.json());

app.listen(3000);
