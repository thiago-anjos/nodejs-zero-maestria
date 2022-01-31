const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

console.log(args);

// no terminal digitar node index.js --nome=thiago

const nome = args["nome"];

console.log(`O nome do cabra é ${nome}`);
