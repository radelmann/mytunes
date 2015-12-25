var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var mimeTypes = {
  '.js': 'text/javascript',
  '.html': 'text/html',
  '.css': 'text/css'
};

var server = http.createServer(function(req, res) {
  var urlObj = url.parse(req.url);
  var file;
  var publicDir = '/../client/';
  var fileName;

  if (urlObj.path === '/') {
    fileName = 'index.html';
  } else {
    fileName = urlObj.path;
  }
  fs.readFile(__dirname + publicDir + fileName, 'utf8', function(err, data) {
    if (err) {
      res.writeHead(500);
      res.end();
    }

    var headers = {
      'Content-type': mimeTypes[path.extname(fileName)]
    };

    res.writeHead(200, headers);
    res.end(data);
  });
});

server.listen(3000);
