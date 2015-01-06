var conf_app = {};
var host = "127.0.0.1";
conf_app.start = function () {
    document.addEventListener("click", conf_app.click);
	conf_app.server();
	
};

conf_app.click = function (ev) {
    var src = ev.target;

    if (src.has_class("login_inp")) {
        conf_app.login();
	}else if (src.has_class("logout_inp")) {
        conf_app.logout();
	}else if (src.has_class("signup_inp")) {
        conf_app.signup();
	}else if (src.has_class("delete_inp")) {
        conf_app.deleteUser();
	}else if (src.has_class("getInfo_inp")) {
        conf_app.getInfo();
	}else if (src.has_class("setInfo_inp")) {
        conf_app.setInfo();
	}else if (src.has_class("get_friends_inp")) {
        conf_app.getFriends();
	}else if (src.has_class("add_friends_inp")) {
        conf_app.addFriends();
	}else if (src.has_class("delete_friends_inp")) {
        conf_app.deleteFriends();
	}else if (src.has_class("database_inp")) {
        conf_app.database();
	}else if (src.has_class("send_inp")) {
        conf_app.send();
	}
	else if (src.has_class("ip_change")) {
        conf_app.changeIp();
	}
};

conf_app.changeIp = function(){
	var btn = document.getElementsByName("ip")[0];
	host = btn.value;
}


conf_app.login = function () {
	var userName = document.getElementsByClassName("user_name")[0].value;
	var userPwd = document.getElementsByClassName("user_pwd")[0].value;
    if (userName && userPwd) {
		var req = "http://"+host+":1337/login?username="+userName+"&pwd="+userPwd;
		conf_app.get(req, conf_app.cb_login);
		document.getElementsByClassName("user")[0].innerHTML = userName;
    } else {
        console.log("42");
    }
};

conf_app.cb_login = function() {
    if (this.readyState == 4 && this.status == 200) {
		document.getElementById("login").style.display = "none";
		document.getElementById("logout").style.display = "inline";
		document.getElementById("delete").style.display = "inline";
		document.getElementById("signup").style.display = "none";
		document.getElementById("send").style.display = "inline";
		document.getElementById("ip_page").style.display = "inline";
		document.getElementById("ip_form").style.display = "none";
		document.getElementById("friend_page").style.display = "inline";
		//document.getElementById("drop").style.display = "inline";
		document.getElementsByClassName("user_name")[0].value = "";
		document.getElementsByClassName("user_pwd")[0].value = "";
		document.getElementsByClassName("user_id")[0].value =  this.responseText;
		conf_app.getFriends();
		conf_app.getInfo();
    }
};

conf_app.logout = function () {
	var id = document.getElementsByClassName("user_id")[0].value;
    if (id) {
		var req = "http://"+host+":1337/logout?id="+id;
		conf_app.get(req, conf_app.cb_logout);
		document.getElementById("login").style.display = "inline";
		document.getElementById("logout").style.display = "none";
		document.getElementById("delete").style.display = "none";
		document.getElementById("signup").style.display = "inline";
		document.getElementById("send").style.display = "none";
		document.getElementById("ip_page").style.display = "none";
		document.getElementById("ip_form").style.display = "initial";
		document.getElementById("friend_page").style.display = "none";
		//document.getElementById("drop").style.display = "none";
		document.getElementsByClassName("user")[0].value = "";
		files_sent = 0;
    } else {
        console.log("42");
    }
};

conf_app.cb_logout = function() {
    if (this.readyState == 4 && this.status == 200) {
		document.getElementsByClassName("logout_res")[0].innerHTML =  "<div class=\"alert alert-warning\" role=\"alert\">You are disconnected. ! Come back soon!</div>";
        setInterval(function () { document.getElementsByClassName("logout_res")[0].innerHTML =  ""; }, 4000);
    }
};

conf_app.signup = function () {
	var newUserName = document.getElementsByClassName("newUser_name")[0].value;
	var newUserPwd = document.getElementsByClassName("newUser_pwd")[0].value;
    if (newUserName && newUserPwd) {
		var req = "http://"+host+":1337/register?username="+newUserName+"&pwd="+newUserPwd;
		conf_app.get(req, conf_app.cb_signup);
		document.getElementById("login").style.display = "inline";
		document.getElementById("logout").style.display = "none";
		document.getElementById("delete").style.display = "none";
		document.getElementById("signup").style.display = "inline";
		document.getElementsByClassName("newUser_name")[0].value = "";
		document.getElementsByClassName("newUser_pwd")[0].value = "";
    } else {
        console.log("42");
    }
};

conf_app.cb_signup = function() {
    if (this.readyState == 4 && this.status == 200) {
        var res =  this.responseText;
		if( res == "User already exists"){
			document.getElementsByClassName("signup_res")[0].innerHTML =  "<h3>User already exists</h3>";
		}else{
			document.getElementsByClassName("signup_res")[0].innerHTML =  "<div class=\"alert alert-success\" role=\"alert\">Tank you for Sign Up ! You can now login and enjoy the apps !</div>";
			setInterval(function () { document.getElementsByClassName("signup_res")[0].innerHTML =  ""; }, 4000);
		}
    }
};

conf_app.deleteUser = function () {
	var userNameDelete = document.getElementsByClassName("deleteUser_name")[0].value;
	var userPwdDelete = document.getElementsByClassName("deleteUser_pwd")[0].value;
    if (userNameDelete && userPwdDelete) {
		var req = "http://"+host+":1337/delete?username="+userNameDelete+"&pwd="+userPwdDelete;
		conf_app.get(req, conf_app.cb_deleteUser);
		document.getElementById("login").style.display = "inline";
		document.getElementById("logout").style.display = "none";
		document.getElementById("delete").style.display = "none";
		document.getElementById("signup").style.display = "inline";
		document.getElementById("send").style.display = "none";
		document.getElementById("ip_page").style.display = "none";
		document.getElementById("friend_page").style.display = "none";
		document.getElementsByClassName("user")[0].value = "";
    } else {
        console.log("42");
    }
};

conf_app.cb_deleteUser = function() {
    if (this.readyState == 4 && this.status == 200) {
		document.getElementsByClassName("deleteUser_name")[0].value = "";
		document.getElementsByClassName("deleteUser_pwd")[0].value = "";
		document.getElementsByClassName("delete_user_res")[0].innerHTML =  "<div class=\"alert alert-danger\" role=\"alert\">Your account has been deleted ... Come back soon !</div>";
		setInterval(function () { document.getElementsByClassName("delete_user_res")[0].innerHTML =  ""; }, 4000);
    }
};

conf_app.getInfo = function() {
	var id = document.getElementsByClassName("user_id")[0].value;
    if (id) {
		var req = "http://"+host+":1337/get_info?id="+id;
		conf_app.get(req, conf_app.cb_getInfo);
    } else {
        console.log("42");
    }
};

conf_app.cb_getInfo = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementsByClassName("info_res")[0].innerHTML =  this.responseText;
    }
};

conf_app.setInfo = function() {
	var id = document.getElementsByClassName("user_id")[0].value;
	var state = document.getElementsByClassName("ip")[0].value;
    if (id && state) {
		var req = "http://"+host+":1337/set_info?id="+id+"&state="+state;
		conf_app.get(req, conf_app.cb_setInfo);
    } else {
        console.log("42");
    }
};

conf_app.cb_setInfo = function() {
    if (this.readyState == 4 && this.status == 200) {
		conf_app.getInfo();
		document.getElementsByClassName("ip")[0].value = "";
        document.getElementsByClassName("info_update_res")[0].innerHTML =  "<p>Your state has been updated !</p>";
		setInterval(function () { document.getElementsByClassName("info_update_res")[0].innerHTML =  ""; }, 4000);
    }
};

conf_app.getFriends = function() {
	var id = document.getElementsByClassName("user_id")[0].value;
    if (id) {
		var req = "http://"+host+":1337/get_friends?id="+id;
		conf_app.database();
		conf_app.get(req, conf_app.cb_getFriends);
    } else {
        console.log("42");
    }
};

conf_app.cb_getFriends = function() {
	document.getElementsByClassName("friends_res")[0].innerHTML =  "";
	document.getElementsByClassName("delete_friend_list")[0].innerHTML =  "";
	document.getElementsByClassName("friend_list")[0].innerHTML =  "";
	document.getElementsByClassName("add_friend_list")[0].innerHTML = "";
	document.getElementById("liste_delete").style.display = "inline";
	document.getElementById("liste_add").style.display = "inline";
	document.getElementById("add_friends").style.display = "inline";
    if (this.readyState == 4 && this.status == 200) {
		var friends = JSON.parse( this.responseText);
		if( friends.length > 0){
			document.getElementById("liste_delete").style.display = "inline";
			document.getElementById("liste").style.display = "inline";
			document.getElementById("delete_friends").style.display = "inline";
			document.getElementsByClassName("liste_none")[0].innerHTML =  "";
		}else{
			document.getElementById("liste_delete").style.display = "none";
			document.getElementById("liste").style.display = "none";
			document.getElementById("delete_friends").style.display = "none";
			document.getElementsByClassName("liste_none")[0].innerHTML =  "none";
		}
		for(var i = 0 ; i < friends.length; ++i ){
			document.getElementsByClassName("friends_res")[0].innerHTML +=  "<li>"+friends[i]+"</li>";
			document.getElementsByClassName("delete_friend_list")[0].innerHTML +=  "<option value=\""+friends[i]+"\">"+friends[i]+"</option>";
			document.getElementsByClassName("friend_list")[0].innerHTML +=  "<option value=\""+friends[i]+"\">"+friends[i]+"</option>";
		}
		for(var i = 0; i< user_list.length; ++i ){
			document.getElementsByClassName("add_friend_list")[0].innerHTML +=  "<option value=\""+user_list[i]+"\">"+user_list[i]+"</option>";
		}
    }
};

conf_app.addFriends = function() {
	var id = document.getElementsByClassName("user_id")[0].value;
	var addFriend = document.getElementById("liste_add").value;
    if (id && addFriend) {
		var req = "http://"+host+":1337/add_friends?id="+id+"&friend="+addFriend;
		conf_app.get(req, conf_app.cb_addFriends);
    } else {
        console.log("42");
    }
};

conf_app.cb_addFriends = function() {
    if (this.readyState == 4 && this.status == 200) {
		conf_app.getFriends();
        document.getElementsByClassName("add_friend_res")[0].innerHTML =  "<div class=\"alert alert-success\" role=\"alert\">Friend added !</div>";
        setInterval(function () { document.getElementsByClassName("add_friend_res")[0].innerHTML =  ""; }, 4000);
    }
};

conf_app.deleteFriends = function() {
	var id = document.getElementsByClassName("user_id")[0].value;
	var deleteFriend = document.getElementById("liste_delete").value;
    if (id && deleteFriend) {
		var req = "http://"+host+":1337/delete_friends?id="+id+"&friend="+deleteFriend;
		conf_app.get(req, conf_app.cb_deleteFriends);
    } else {
        console.log("42");
    }
};

conf_app.cb_deleteFriends = function() {
    if (this.readyState == 4 && this.status == 200) {
		conf_app.getFriends();
        document.getElementsByClassName("delete_friend_res")[0].innerHTML =  "<div class=\"alert alert-danger\" role=\"alert\">Friend deleted ! Sad... :\"(</div>";
        setInterval(function () { document.getElementsByClassName("delete_friend_res")[0].innerHTML =  ""; }, 4000);
    }
};

conf_app.database = function() {
	var req = "http://"+host+":1337/database";
	conf_app.get(req, conf_app.cb_database);
};

var user_list = [];
var user_ip = [];

conf_app.cb_database = function() {
    if (this.readyState == 4 && this.status == 200) {
		var chaine = this.responseText;
		var reg = new RegExp("[: \n]+", "g");
		var users_list = chaine.split(reg);
		var length_list = (users_list.length -1)/12;
		user_list = [];
		for(var i = 0; i< length_list; ++i ){
			user_list.push(users_list[2+12*i]);
		}
		var users_ip = chaine.split(reg);
		var length_ip = (users_ip.length -1)/12;
		user_ip = [];
		for(var i = 0; i< length_list; ++i ){
			user_ip.push(users_ip[8+12*i]);
		}
		
		document.getElementsByClassName("users_res")[0].innerHTML =  (users_list.length -1)/12;
    }
};

document.getElementById("file").addEventListener("change", change);
function change() {
    document.getElementById("send_btn").style.display = "inline";
}

var files_sent = 0;
conf_app.send = function() {
	var file = document.getElementById("file").value;
	var sendFriend = document.getElementById("liste").value;
	var pos = file.search(/\\[^\\]+[\.[\w\d]+]?$/);
	var fileName = file.substring(pos+1);
	var util = require('util');
	var net = require('net');
	var fs = require('fs');
	
	var a;
	for(var i = 0; i< user_list.length; ++i ){
		if( sendFriend == user_list[i] ) a = i;
	}
	var ip = user_ip[a];
	
	//Connexion du client au serveur
	var client = net.connect({port: 8124 , host: ip },function() { 
		client.write("fileName="+fileName);
	});

	var readstream = fs.createReadStream(file);
	readstream.pipe(client);
	
	conf_app.cb_send();
};

conf_app.cb_send = function() {
	files_sent += 1;
	document.getElementsByClassName("files_res")[0].innerHTML =  files_sent;
	document.getElementById("file").value ="";
	document.getElementById("send_btn").style.display = "none";
	document.getElementsByClassName("send_res")[0].innerHTML =  "<div class=\"alert alert-success\" role=\"alert\">File sent !</div>";
	setInterval(function () { document.getElementsByClassName("send_res")[0].innerHTML =  ""; }, 4000);
};

conf_app.server = function() {
	var net = require('net');
	var fs = require('fs');
	var clients = [];

	//Création du serveur
	var server = net.createServer(function(socket) {
		
		//Message à la déconnection
		socket.on('end', function() {
			socket.writer.end();
			console.log('Client disconnected');
		});
		
		//Definition des paramètres des sockets
		socket.name = socket.remoteAddress+":"+socket.remotePort;
		socket.fileName="defaultFileName.txt";
		socket.writer =  fs.createWriteStream(socket.fileName);
			
		clients.push(socket);
		
		//Connexion d'un client
		console.log("Client connected : "+socket.name);
		
		//Gestion des données recues
		socket.on('data',function(data){
			//En cas de definiton d'un fileName: on renomme le fileName de la socket et on demande le fichier à l'utilisateur
			if(data.toString().indexOf("fileName=")==0){
				socket.fileName=data.toString().substring(9);
				socket.writer =  fs.createWriteStream(socket.fileName);
			}
			else{
				socket.writer.write(data); //Ajout des données dans le fichier par défaut
			}
		})
	});

	server.listen(8124, function() { 
		console.log('server bound');
	});
};


/*--- Drag & Drop ---
window.ondragover = window.ondrop = function(e) { 
	e.preventDefault(); 
	return false;
}
var el = document.querySelector("#drop");
var fileDrag = "";
el.ondragover = function () {
	this.className = "hover";
	this.innerHTML = "Drop the file";
	return false;
}
el.ondragleave = function () {
	this.className = "";
	this.innerHTML = "Drop the file here";
	return false;
} 
el.ondrop = function (e) {
	e.preventDefault(); 
	for( var i = 0; i < e.dataTransfer.files.length; ++i){
		var fileDrag = e.dataTransfer.files[i].path;
		el.className = "";
		el.innerHTML = "File recouped";
	}
}*/

conf_app.get = function(req, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", req, true);
    xhr.onreadystatechange = cb;
    xhr.send();
};

window.onload = setTimeout(conf_app.start, 1);

HTMLElement.prototype.has_class = function (c) {
    return this.className.indexOf(c) >= 0;
};