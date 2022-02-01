const chalk = require("chalk");

const nota = 9;

nota >= 7
  ? console.log(chalk.green("Parabéns voce foi aprovador"))
  : console.log(chalk.bgRed.black("Voce foi reprovado"));
