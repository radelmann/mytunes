var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req, res) {
  var urlObj = url.parse(req.url);
  var file;
  var publicDir = '/../client/';

  if (urlObj.path === '/') {
    file = fs.readFileSync(__dirname + publicDir + 'index.html');
  } else {
    file = fs.readFileSync(__dirname + publicDir + urlObj.path);
  }

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(file);
});

server.listen(3000);
