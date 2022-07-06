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

    const checkUser = await User.findOne({
      where: {
        id: UserId,
      },
      include: Tought,
      plain: true,
    });

    if (!checkUser) {
      res.redirect("/login");
    }
    const thoughtsUser = checkUser.Toughts.map((item) => item.dataValues);
    res.render("thoughts/dashboard", { thoughtsUser });
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
