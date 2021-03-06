const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;
    //find user
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      req.flash("message", "usuário não encontrado");
      res.render("auth/login");
      return;
    }

    //check if passwords match
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      req.flash("message", "senha inválida");
      res.render("auth/login");
      return;
    }

    //initialize session
    req.session.userid = user.id;
    req.flash("message", "Autenticação realiada com sucesso");

    req.session.save(() => {
      res.redirect("/");
    });
  }

  static register(req, res) {
    res.render("auth/register");
  }
  static async registerPost(req, res) {
    const { username, email, password, confirmpassword } = req.body;
    //password match validation
    if (password != confirmpassword) {
      // send message to front using flash messages
      req.flash("message", "As senhas não confererem, tente novamente");
      res.render("auth/register");
      // finalizar função
      return;
    }

    // cheche if user exist
    const checkIfUserExist = await User.findOne({ where: { email: email } });
    if (checkIfUserExist) {
      req.flash("message", "o e-mail já está em uso");
      res.render("auth/register");
      return;
    }

    //create password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    //create object with encripted pass
    const user = {
      name: username,
      email,
      password: hashedPassword,
    };

    try {
      //inicializar session
      const createdUser = await User.create(user);
      req.session.userid = createdUser.id;

      req.flash("message", "cadastro realizado com sucesso");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log("erro ao criar usuário", error);
    }
  }
  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
};
