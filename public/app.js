var express = require('express');
var bodyparser= require('body-parser')
var fs = require('fs');
var app = express();

app.use(bodyparser());
function readFile(path, cb){
	fs.readFile(path, function(err,buff) {
		if (err) cb(err);
		else cb(null, buff.toString());
	});
}
function isAuthorized (req) {
	return false;
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
	res.send('login: '+req.body.login+' password: '+req.body.pass);
});

app.listen(3000,function(){
});

