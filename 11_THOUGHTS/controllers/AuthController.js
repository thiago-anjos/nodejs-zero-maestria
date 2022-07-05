const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
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
  }
};
