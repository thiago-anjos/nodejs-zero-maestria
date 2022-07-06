const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const app = express();

const conn = require("./db/conn");

//Models
const Tought = require("./models/Thought");
const User = require("./models/User");

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
app.set("view engine", "handlebars");

//receber resposta do body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//session middleware, diz onde o express vai salvar as sessões
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

//flash messages
app.use(flash());

//public pach
app.use(express.static("public"));

//set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

// Routes Thoughts
const thoughts = require("./routes/thoughtsRoutes");
const ThoughtController = require("./controllers/ThoughtController");
app.use("/thoughts", thoughts);
app.get("/", ThoughtController.showToughts);

// Routes login
const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

conn
  //.sync({force:true})  => serve para recriar as tabelas !!!! cuidado !!!! isso apaga todos os dados
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
