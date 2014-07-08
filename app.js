var express = require('express')
  , app = module.exports = express()
  , path = require('path')
  , http = require('http')
  , io = require('socket.io')(http);

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

/**
 * Module dependencies.
 */

require('./routes');

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

io.listen(server);

var usernames = {};

io.on('connection', function (socket) {

	socket.on('Game.addPlayer', function(username){
		socket.username = username;
		usernames[socket.id] = username;

		socket.emit('Game.updatePlayers', usernames);

		console.log(username + ' has connected');
		socket.emit('Game.sendMessage', 'SERVER', 'you have connected');
		socket.broadcast.emit('Game.sendMessage', 'SERVER', username + ' has connected');
	});

	socket.on('Game.requestHand', function(){

		var hand = [
			{rank:'ace',type:'spade'},
			{rank:'two', type:'club'},
			{rank:'queen',type:'heart'},
			{rank:'jack',type:'diamond'}
		];
		
		io.sockets.emit('Game.updateHand', hand);

	});

	socket.on('disconnect', function(){
		delete usernames[socket.id];
		io.sockets.emit('Game.updatePlayers', usernames);
		socket.broadcast.emit('Game.sendMessage', 'SERVER', socket.username + ' has disconnected');
	});

});
