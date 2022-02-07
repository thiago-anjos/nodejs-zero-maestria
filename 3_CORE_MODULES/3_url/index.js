const url = require("url");
const address = "https://www.meusite.com.br/catalogo?produtos=cadeira";
const parsedUrl = new url.URL(address);

console.log(parsedUrl.host);
console.log(parsedUrl.pathname);
console.log(parsedUrl.searchParams);
console.log(parsedUrl.searchParams.get("produtos"));
console.log(parsedUrl.protocol);
console.log(parsedUrl.port);
