const fs = require("fs"); //file system

fs.readFile("arquivo.txt", "utf-8", (err, data) => {
  err ? console.log(err) : console.log(data);
});
