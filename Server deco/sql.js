var sqlite3 = require('sqlite3');
var util = require('util');
var connect = function(){
	var db = new sqlite3.Database(".data");
	var stat = "CREATE TABLE IF NOT EXISTS users(";
	stat+="username VARCHAR(40) PRIMARY KEY,";
	stat+="password VARCHAR(20),";
	stat+="state VARCHAR(10),";
	stat+="id INTEGER,";
	stat+="friends VARCHAR)";
	db.serialize(function(){db.run(stat);});

	return db;
};
exports.connect = connect;

exports.readDB = function(res){
	var db = connect();
	res.statusCode=200;
	util.log("Reading database");
	var entries = 0;
	db.serialize(function(){
		db.each("SELECT * FROM users", function(err,row){
			res.write("--------------------------------\n");
			res.write("User : "+row.username+"\n");
			res.write("Password : "+row.password+"\n");
			res.write("id : "+row.id+"\n");
			res.write("State : "+row.state+"\n");
			res.write("Friend List : "+row.friends+"\n");
			entries++;
		}, function(){
			util.log("Read "+entries+" entries");
			res.end();
		});
	});
	db.close();
}

exports.readInfo = function(query,info){
	var stmt ='SELECT * FROM users WHERE id='+query.id;
	var db = connect();
	
	db.serialize(function(){
		db.all(stmt, function(err,rows){
			if(rows.length>0){
				if(info == 0) return rows[0].state;
				else if(info == 1) return rows[0].friends;
			}else return false;
		});
	});
}

/*
exports.request = function(req){


};

exports.insert = function(ins){

};

exports.get = function(req){};*/