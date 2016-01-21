const express = require('express');
const app = express();
const http = require('http').Server(app);
const socket = require('socket.io')(http);
const servidor = require('Servidor');

app.use(express.static(__dirname + '/cliente'));

servidor.init({ http, __dirname, socket }, function(){

	app.get('/', function(req, res){

		res.sendFile(__dirname + "/index.html");

	});
});

http.listen(3000, function () {
	console.log("Game running on port 3000.");
});
