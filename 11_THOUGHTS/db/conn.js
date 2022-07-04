const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("toughts2", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectamos com sucesso");
} catch (error) {
  console.log(`ERRO: ${error}`);
}

module.exports = sequelize;
