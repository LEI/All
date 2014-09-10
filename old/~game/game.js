module.exports = function( socket, ko ) {

	var Player = require('./player')( socket, ko );

	var Game = function(name, room) {

		this.player = new Player();

		return {
			player: this.player,
			rooms: ko.observableArray([]),
			chat: {
				messages: ko.observableArray([]),
				isActive: ko.observable(false)
			},
			roomName: ko.computed(function() {

				return this.player.room() + 'R';
			}, this),
			createRoom: function( data, event ) {
				var uiud = Date.now().toString().slice(-4);
				var room = {
					id: uiud,
					name: this.player.name() + uiud + '\'s room',
					owner: this.player.id(),
					users: []
				};
				console.log(room);
				socket.emit('add:room', room);
				//return this.rooms[room];
			},
			updateRooms: function( all, current ) {
				if ( current === false ) {
					current = this.player.room();
				} else {
					this.player.room(current);
				}

				this.rooms(all);
			},
			deleteRoom: function( room ) {
				this.rooms.splice(this.rooms.indexOf(room), 1);
			},
			joinRoom: function( id ) {
				console.log(id);
				this.player.room(id);
			},
			switchRoom: function( data, event ) {
				socket.emit('join:room', data);
			},
			onMessage: function( username, data ) {
				this.chat.messages.push('<b>'+ username + ':</b> ' + data + '<br>');
			}
		}
	};

	socket.on('update:rooms', Game.updateRooms);

	socket.on('join:room', Game.joinRoom);

	socket.on('delete:room', Game.deleteRoom);

	socket.on('update:chat', Game.onMessage);

	return Game;

};