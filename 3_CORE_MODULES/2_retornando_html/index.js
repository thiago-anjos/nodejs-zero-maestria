const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello World, isso é uma aplicação em HTML</h1><p>testando</p>");
});

server.listen(port, () => {
  console.log("servidor rodando na porta:", port);
});
