const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodeSequelize2", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("conectamos com sucesso ao sequelize");
} catch (error) {
  console.log("Não foi possível conectar", error);
}

module.exports = sequelize;
