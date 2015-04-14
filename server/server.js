var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http, {
		path: '/socket.io-client'
	});

var config = {
	port: 	process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

	ip:   process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined
};

app.use(express.static(__dirname + '/../client'));

require('./socket')(app, io);

http.listen(config.port, config.ip, function() {
	console.log('Server is listening on %d, in %s mode', config.port, app.get('env'));
});