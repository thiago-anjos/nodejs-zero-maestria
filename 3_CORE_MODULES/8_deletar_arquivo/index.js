const fs = require("fs");

fs.unlink("index.html", function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("arquivo não existe");
  }
});
