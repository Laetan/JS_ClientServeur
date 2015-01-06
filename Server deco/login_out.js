var util = require('util');
var sql = require ("./sql.js");

exports.login = function(query,res){
	if(!query.username || !query.pwd){
		res.statusCode=400;
		res.write("No username or password");
		res.end();
		return;
	}
	var user = query.username;
	var pwd = query.pwd;
	var db = sql.connect();
	var stmt = 'SELECT * FROM users WHERE username="'+user+'" AND password="'+pwd+'"';
	
	db.all(stmt, function(err,rows){
		console.log(util.inspect(rows));
		console.log(rows.length);
		if(err==null && rows.length>0){
			var id = Math.round((Math.random()*9999999))+1;
			db.run('UPDATE users SET id ='+id+' WHERE username="'+user+'" AND password="'+pwd+'"');
			util.log("User logged in");
			res.statusCode=200;
			res.write(""+id);
			res.end()
		}
		else if(err==null){
			res.statusCode=400;
			res.write("0\n");
			res.write("No user with this name and password in database");
			res.end();
		}
		else{
			res.statusCode=500;
			util.log(err.message);
			res.write("0\n");
			res.write("Error in database : "+err.message);
			res.end();
		}
	});
}

exports.logout = function(query,res){
	if(!query.id){
		res.statusCode=400;
		res.write("No id. You are logg out");
		res.end();
		return;
	}
	var db = sql.connect();
	db.run('UPDATE users SET id=0 WHERE id='+query.id);
	
	util.log("User logged out");
	res.statusCode=200;
	res.write("Logged out");
	res.end()
}