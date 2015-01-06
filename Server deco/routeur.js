var url = require('url');
var util = require('util');
var qs = require('querystring');

var accountManager = require("./accountManager.js");
var sql = require("./sql.js");
var login_out = require("./login_out.js");
var infoManager = require("./infoManager.js");
var friendManager = require("./friendManager.js");

exports.router = function(req,res){
	var pathname = url.parse(req.url,false,true).pathname;
	var query="";
	if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            query = qs.parse(body);
        });
	}else
	 query = url.parse(req.url,true).query;
	util.log("pathname : "+pathname);
	util.log("query : "+util.inspect(query));
	util.log(req.connection.remoteAddress);
	
	if(pathname=="/register")
		accountManager.newUser(query,res,req.connection.remoteAddress);
	else if(pathname=="/delete")
		accountManager.deleteUser(query,res);
	else if(pathname=="/login")
		login_out.login(query,res);
	else if(pathname=="/logout")
		login_out.logout(query,res);
	else if(pathname=="/set_info")
		infoManager.setInfo(query,res);
	else if(pathname=="/get_info")
		infoManager.getInfo(query,res);
	else if(pathname=="/get_friends")
		friendManager.getFriends(query,res);
	else if(pathname=="/add_friends")
		friendManager.addFriend(query,res);
	else if(pathname=="/delete_friends")
		friendManager.deleteFriend(query,res);
	else if(pathname == "/database")
		sql.readDB(res);
	else if(pathname=="/find_the_jedi"){
		res.statusCode = 404;
		res.write("Error 404 : No Jedi here");
		res.end();
	}
	else{
		res.statusCode = 404;
		res.write("Error 404 : this is an Error 404. Go elsewhere.");
		res.end();
	}
};