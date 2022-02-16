const fs = require("fs");

function dirExist() {
  if (!fs.existsSync("./minhapasta")) {
    console.log("não existe");
    fs.mkdirSync("minhapasta");
  } else {
    console.log("existe");
  }
}

console.log("primeira chamada");
dirExist();

console.log("segunda chamada");
dirExist();
