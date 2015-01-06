var sql = require("./sql.js");
var util = require('util');
exports.newUser = function(query,res, host){
	if(!query.username || !query.pwd){
		res.statusCode=400;
		res.write("No user name or password");
		res.end();
		return;
	}
	var db = sql.connect();
	
	var stat = 'INSERT INTO users VALUES (';
	stat+= '"'+query.username+'",';
	stat+= '"'+query.pwd+'",';
	stat+= '"'+host+'",';
	stat+= '0,';
	stat+= '"[]")';
	db.serialize(function(){
		db.run(stat,function(err){
			if(err == null){
				res.statusCode=200;
				res.write("User created in database");
				res.end();
			}
			else if(err.message.indexOf("SQLITE_CONSTRAINT: UNIQUE")==0){
				res.statusCode=400;
				res.write("User already exists");
				res.end();
			}
			else{
				res.statusCode=500;
				console.log(err.message);
				res.write("Error in database : "+err.message);
				res.end();
			}
			
		});
	});
	
	db.close();
	
};


exports.deleteUser = function(query,res){
	if(!query.username || !query.pwd){
		res.statusCode=400;
		res.write("No user name or password");
		res.end();
		return;
	}
	var db = sql.connect();
	
	var stat = 'DELETE FROM users WHERE username="'+query.username+'" AND password="'+query.pwd+'"';
	db.serialize(function(){
		db.run(stat,function(err){
			if(err==null && this.changes>0){
				util.log("User erased");
				res.statusCode=200;
				res.write("User erased from database");
				res.end()
			}
			else if(err==null){
				res.statusCode=400;
				res.write("No user with this name and password in database");
				res.end();
			}
			else{
				res.statusCode=500;
				console.log(err.message);
				res.write("Error in database : "+err.message);
				res.end();
			}
		});
	});
	db.close();
};