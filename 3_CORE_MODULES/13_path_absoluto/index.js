const path = require("path");

//path absoluto

console.log(path.resolve("../README.md"));

// formar path

const midfolder = "relatorios";
const filename = "README.md";

const finalPath = path.join(".", "arquivos", midfolder, filename);
console.log(finalPath);
