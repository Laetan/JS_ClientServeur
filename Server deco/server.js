var http = require('http');
var util = require('util');
var routeur = require("./routeur");
http.createServer(function (req, res) {
	util.log("-------------------------------------------------------------------------------");
	util.log("Request received:");
	routeur.router(req,res);
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');