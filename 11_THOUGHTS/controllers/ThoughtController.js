const Tought = require("../models/Thought");
const User = require("../models/User");

module.exports = class ThoughtsController {
  static async showToughts(req, res) {
    try {
      const thoughts = await Tought.findAll({ raw: true });
      res.render("thoughts/home", { thoughts });
    } catch (error) {
      console.log(error);
    }
  }
  static async dashboard(req, res) {
    const UserId = req.session.userid;

    if (!UserId) return;

    const userExist = await User.findOne({
      where: { id: UserId },
    });

    if (!userExist) {
      res.redirect("/login");
    }

    try {
      const thoughtsUser = await Tought.findAll({
        where: { UserId: UserId },
        raw: true,
      });
      console.log(thoughtsUser);
      res.render("thoughts/dashboard", { thoughtsUser });
    } catch (error) {
      console.log(error);
    }
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
