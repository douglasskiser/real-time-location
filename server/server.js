'use strict';

var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http);

app.use(express.static(__dirname + '/../client'));

require('./socket')(app, io);

http.listen(process.env.PORT, function() {
	console.log('Server is listening');
});