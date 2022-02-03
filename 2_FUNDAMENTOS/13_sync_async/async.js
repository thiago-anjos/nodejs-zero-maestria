const fs = require("fs");

console.log("inicio");

fs.writeFile("arquivoAsync2.txt", "oi", function (err) {
  setTimeout(() => {
    console.log("arquivo criado");
  }, 5000);
});

console.log("fim");
