var http = require('http');

var server = http.createServer(function(request, response) {
	response.writeHead(200);
	response.end('Thibaud & Mathias & Valentin ... Hello');
});

server.listen(8080);