var util = require("util");
var sql = require("./sql.js")

exports.getFriends = function(query,res){
	
	if(!query.id || query.id == ""){
		res.statusCode=400;
		res.write("0\n");
		res.write("No id. Please log in.");
		res.end();
		return;
	}	
	var id = query.id;
	var db = sql.connect();
	
	db.serialize(function(){
		db.all("SELECT friends FROM users WHERE id="+id, function(err,rows){
			if(err!=null){
				res.statusCode=500;
				console.log(err.message);
				res.write("Error in database : "+err.message);
				res.end();
				return;
			}
			else if(rows.length == 0){
				res.statusCode=400;
				res.write("0\n");
				res.write("Wrong id. Please log in.");
				res.end();
				return;
			}
			else{
				res.statusCode=200;
				res.write(rows[0].friends);
				res.end();
				return;
			}
		});
	});
}

exports.addFriend = function(query,res){
	if(!query.id || query.id == ""){
		res.statusCode=400;
		res.write("0\n");
		res.write("No id. Please log in.");
		res.end();
		return;
	}
	if(!query.friend || query.friend == ""){
		res.statusCode=400;
		res.write("0\n");
		res.write("No friend to add.");
		res.end();
		return;
	}
	var db = sql.connect();
	db.serialize(function(){
		var friends = "";
		db.all("SELECT friends FROM users WHERE id="+query.id, function(err,rows){
			if(err!=null){
				res.statusCode=500;
				console.log(err.message);
				res.write("Error in database : "+err.message);
				res.end();
				return;
			}
			else if(rows.length == 0){
				res.statusCode=400;
				res.write("0\n");
				res.write("Wrong id. Please log in.");
				res.end();
				return;
			}
			else{
				friends = JSON.parse(rows[0].friends);
				friends.push(query.friend);
				friends = JSON.stringify(friends);
				console.log(friends);
				db.run("UPDATE users SET friends='"+friends+"' WHERE id="+query.id,function(err){
					if(err!=null){
						res.statusCode=500;
						console.log(err.message);
						res.write("Error in database : "+err.message);
						res.end();
						return;
					}
					else{
						res.statusCode=200;
						res.write("friend added");
						res.end();
						return;
					}
				});
			}
		});
	});
};

exports.deleteFriend = function(query, res){
	
	if(!query.id || query.id == ""){
		res.statusCode=400;
		res.write("0\n");
		res.write("No id. Please log in.");
		res.end();
		return;
	}
	if(!query.friend || query.friend == ""){
		res.statusCode=400;
		res.write("0\n");
		res.write("No friend to add.");
		res.end();
		return;
	}
	var id = query.id; var friend = query.friend;
	var db = sql.connect();
	db.serialize(function(){
		var friends = "";
		db.all("SELECT friends FROM users WHERE id="+query.id, function(err,rows){
			if(err!=null){
				res.statusCode=500;
				console.log(err.message);
				res.write("Error in database : "+err.message);
				res.end();
				return;
			}
			else if(rows.length == 0){
				res.statusCode=400;
				res.write("0\n");
				res.write("Wrong id. Please log in.");
				res.end();
				return;
			}
			else{
				friends = JSON.parse(rows[0].friends);
				friends.splice(friends.indexOf(friend),1);
				friends = JSON.stringify(friends);
				db.run("UPDATE users SET friends='"+friends+"' WHERE id="+query.id,function(err){
					if(err!=null){
						res.statusCode=500;
						console.log(err.message);
						res.write("Error in database : "+err.message);
						res.end();
						return;
					}
					else{
						res.statusCode=200;
						res.write("friend deleted");
						res.end();
						return;
					}
		});
			}
		});
	});
};