const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const conn = require("./db/conn");

const Task = require("./models/Task");

const tasksRoutes = require("./routes/taskRoutes");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

app.use("/tasks", tasksRoutes);

conn
  .sync()
  .then(() => {
    const port = 3000;
    app.listen(port);
    console.log("Conectado na porta", port);
  })
  .catch((err) => {
    console.log(err);
  });
