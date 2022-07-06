const Tought = require("../models/Thought");
const User = require("../models/User");

module.exports = class ThoughtsController {
  static async showToughts(req, res) {
    res.render("thoughts/home");
  }
  static async dashboard(req, res) {
    res.render("thoughts/dashboard");
  }

  static createThoughts(req, res) {
    res.render("thoughts/create");
  }
  static async createThoughtsSave(req, res) {
    const thought = {
      title: req.body.title,
      UserId: req.session.userid,
    };

    console.log(thought);

    try {
      await Tought.create(thought);

      req.flash("message", "Pensamento criado com sucesso");
      req.session.save(() => {
        res.redirect("/thoughts/dashboard");
      });
    } catch (error) {
      throw new Error(`Error at creating a thought: ${error}`);
    }
  }
};
