const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodemvc2", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectado ao banco");
} catch (error) {
  console.log("não foi possível conectar", error);
}

exports.default = sequelize;
