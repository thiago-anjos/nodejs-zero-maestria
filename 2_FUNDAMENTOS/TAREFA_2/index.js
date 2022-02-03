const inquirer = require("inquirer");
const chalck = require("chalk");

inquirer
  .prompt([
    {
      name: "nome",
      message: "Qual seu nome?",
    },
    {
      name: "idade",
      message: "Qual sua idade?",
    },
  ])
  .then((answers) => {
    if (answers.idade < 35) {
      throw new Error("tá mentindo a idade né");
    }
    console.log(
      chalck.bgYellow.black(
        `O nome dele é ${answers.nome} e ele tem ${answers.idade} anos de idade`
      )
    );
  })
  .catch((error) => console.log(chalck.bgRed.white(error)));
