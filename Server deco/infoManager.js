var util = require("util");
var sql = require("./sql.js")


exports.getInfo = function(query, res){
	//var info = sql.readInfo(query,0);
	if(query.id)
		var stmt ='SELECT * FROM users WHERE id='+query.id;
	else
		var stmt ='SELECT * FROM users WHERE username='+query.username;
	var db = sql.connect();
	db.serialize(function(){
		db.all(stmt, function(err,rows){
			if(rows.length>0){
				res.statusCode=200;
				res.write(rows[0].state);
				res.end();
				return;
			}
			else{
				res.statusCode=400;
				res.write("0\n");
				res.write("Wrong id");
				res.end();
				return;
			}
		});		
	});
};

exports.setInfo = function(query,res){

	if(!query.state || query.state == ""){
		res.statusCode=400;
		res.write("0\n");
		res.write("No state detected");
		res.end();
		return;
	}
	if(!query.id || query.id == ""){
		res.statusCode=400;
		res.write("0\n");
		res.write("No id. Please log in.");
		res.end();
		return;
	}
	var db = sql.connect();
	db.serialize(function(){
		db.run("UPDATE users SET state=\""+query.state+"\" WHERE id="+query.id, function(err){
			if(err==null && this.changes>0){
				util.log("state updated for user "+query.id);
				res.statusCode=200;
				res.write("state updated");
				res.end()
			}
			else if(err==null){
				res.statusCode=400;
				res.write("No changes in database");
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
};