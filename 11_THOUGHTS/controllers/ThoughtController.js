const Tought = require("../models/Thought");
const User = require("../models/User");

module.exports = class ThoughtsController {
  static async showToughts(req, res) {
    res.render("thoughts/home");
  }
  static async dashboard(req, res) {
    res.render("thoughts/dashboard");
  }
};
