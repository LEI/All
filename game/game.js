
var Player = require('./player');

function Game( socket, ko ) {
	this.player = new Player( socket, ko );
	this.rooms = ko.observableArray();

	this.newRoom = ko.observable();

	socket.on('users.update', function( users ) {
		this.player.room.users(users);
	}.bind(this));

	this.createRoom = function( data, event ) {
		if(event.type === 'click' || event.keyCode === 13){
			socket.emit('room.create', this.newRoom());
			this.newRoom('');
		}

		return true;
	}.bind(this);

	socket.on('rooms.update', function( rooms ) {
		this.rooms(rooms);
	}.bind(this));

	this.joinRoom = function( room, event ) {
		socket.emit('room.join', room.id);
	}.bind(this);

	socket.on('room.join', function( room ) {
		this.player.room.id(room.id);
		this.player.room.title(room.title);
		this.player.room.users(room.users);
	}.bind(this));

	socket.on('room.joined', function( room ) {
		console.log(room);
	}.bind(this));

	this.leaveRoom = function( room, event ) {
		socket.emit('room.leave', this.player.room.id());
	}.bind(this);

	socket.on('room.leave', function( room ) {
		this.player.room.id('');
		this.player.room.title('');
		this.player.room.users([]);
	}.bind(this));

	socket.on('room.left', function( room ) {
		console.log(room);
	}.bind(this));
}

module.exports = Game;