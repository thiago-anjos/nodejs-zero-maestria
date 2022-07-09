const Tought = require("../models/Thought");
const User = require("../models/User");
const { Op, or } = require("sequelize");

module.exports = class ThoughtsController {
  static async showToughts(req, res) {
    let search = "";

    if (req.query.search) {
      search = req.query.search;
    }

    let order = "DESC";

    if (req.query.order) {
      req.query.order === "old" ? (order = "ASC") : (order = "DESC");
    }

    try {
      const thoughts = await await Tought.findAll({
        include: User,
        where: { title: { [Op.like]: `%${search}%` } },
        order: [["createdAt", order]],
      });
      const plainUserThoughts = thoughts.map((item) =>
        item.get({ plain: true })
      );

      let searchTotal = 0;

      if (plainUserThoughts.length > 0) {
        searchTotal = plainUserThoughts.length;
      }

      res.render("thoughts/home", { plainUserThoughts, search, searchTotal });
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
    let emptyThoughts = thoughtsUser.length === 0 ? true : false;

    if (thoughtsUser)
      res.render("thoughts/dashboard", { thoughtsUser, emptyThoughts });
  }

  static createThoughts(req, res) {
    res.render("/thoughts/create");
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

  //remove
  static async removeThoughts(req, res) {
    const id = req.body.id;
    const UserId = req.session.userid;

    try {
      await Tought.destroy({
        where: {
          id: id,
          UserId: UserId,
        },
      });

      req.flash("message", "Pensamento removido com sucesso");
      req.session.save(() => {
        res.redirect("/thoughts/dashboard");
      });
    } catch (error) {
      console.log(`Aconteceu um erro: ${error}`);
    }
  }

  //edit
  static async editThoughts(req, res) {
    const id = req.params.id;
    const thought = await Tought.findOne({ where: { id: id }, raw: true });
    res.render("thoughts/edit", { thought });
  }
  //save
  static async updateThoughtsSave(req, res) {
    const id = req.body.id;

    const Toughts = {
      title: req.body.title,
    };

    try {
      await Tought.update(Toughts, { where: { id: id } });

      req.flash("message", "Pensamento editado com sucesso");
      req.session.save(() => {
        res.redirect("/thoughts/dashboard");
      });
    } catch (error) {
      console.log(`Aconteceu um erro: ${error}`);
    }
  }
};
