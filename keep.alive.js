const http = require('http');

const server = http.createServer((req, res) => {
  res.end("I'm alive! Yay!");
});

server.listen(8080);
