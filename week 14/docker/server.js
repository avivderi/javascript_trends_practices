const http = require('http');
http.createServer((req, res) => {
  res.end('Hello from my Docker image!');
}).listen(3000, () => console.log('Running on 3000'))