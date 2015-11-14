var express = require('express');
var bodyparser= require('body-parser');
var cookieparser= require('cookie-parser');


var fs = require('fs');
var app = express();

app.use(bodyparser());
app.use(cookieparser());

var sessions = {};

function readFile(path, cb){
	fs.readFile(path, function(err,buff) {
		if (err) cb(err);
		else cb(null, buff.toString());
	});
}
function isAuthorized (req) {
	return !!sessions[req.cookies.auth];
}


function sendFile(path, req, res){
	if(isAuthorized(req)){
		readFile(path, function(err,html){
			res.send(err || html);
		});
	} else{
		readFile('index.html', function (err, html) {
			res.send(err || html);
		});
	}
};



app.get ('/', function(req, res){
	sendFile('new.html', req, res);
});

app.post('/signup', function(req, res){
	//res.send('login: '+req.body.login+' password: '+req.body.pass);
	var login = req.body.login;
	var pass = req.body.pass;
	var status = 401;

	if (login == 'admin' && pass == 'admin'){
		var sessionId = Math.random() * 999999;
		sessions[sessionId] = {
			login: 'admin'
		};

		res.cookie('auth', sessionId, {
			httpOnly: true
		});
	}
		res.redirect( '/');
});

app.listen(3000,function(){
});

