var http = require("http");
/**

* This function starts a http daemon on port 9000. It also

* registers a callback handler, to handle incoming HTTP
* requests (a simple message is sent back to clients).
*/
function runHttpServer() {
var daemon = http.createServer();

daemon.on("request", function (req, res) {
console.log("A request has arrived: URL=" + req.url);
var myObject = {
firstName: "Olivier",
lastName: "Liechti",
address: {
street: "Grand-Rue 14",
zip: "1446"
}
};

res.writeHead(200, {
'Content-Type': 'application/json'
});
res.end(JSON.stringify(myObject));
});

console.log("Starting http daemon...");
var port = process.env.PORT || 3000;
daemon.listen(port);
}

runHttpServer();