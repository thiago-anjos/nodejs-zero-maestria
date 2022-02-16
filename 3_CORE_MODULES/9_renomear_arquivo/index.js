const fs = require("fs");

fs.rename("teste.txt", "test.html", function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("arquivo não existe");
  }
});
