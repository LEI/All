
/*
 * User socket
 */

var Client = function( io ) {
	var players = {};

	var users = {},
		rooms = [];

	return {
		socket: null,
		listCards: function( req, res ){
			res.json({});
		},
		setRoom: function( req, res ) {
			var id = req.params.roomId || null;

			//this.socket.emit('join:room', id)

			res.render('room', {
				title: 'Room' + id
			});
		},
		socket: function ( socket ) {

			socket.on('user.update', function( username ) {
				socket.username = username;
				users[socket.id] = username;

				if (socket.room)
					socket.broadcast.to(socket.room).emit('users.update', users);
				console.log('Welcome ' + username);
			}.bind(this));

			socket.emit('rooms.update', rooms);

			socket.on('room.create', function( input ) {
				var room = {
					id: Math.round( Date.now().toString().slice(-4) * Math.random() ),
					title: input,
					users: []
				}

				if (!rooms.indexOf(room)) {
					rooms.push(room);
					socket.emit('rooms.update', rooms);
					console.log(socket.username + ' created the room #' + rooms.length + ': ' + input);
				}
			});

			socket.on('room.join', function( id ) {
				for (var i = rooms.length - 1; i >= 0; i--) {
					if (rooms[i] === id) {
						rooms[i].users.push(socket.username);
						socket.broadcast.to(socket.room).emit('room.joined', rooms[i]);
						break;
					}
				};

				socket.emit('rooms.update', rooms);

			});

			socket.on('room.leave', function( input ) {
				for (var i = rooms.length - 1; i >= 0; i--) {
					if (rooms[i] === id) {
						var index = rooms[i].users.indexOf(socket.username);
						rooms[i].users.slice(index, 1);
						socket.broadcast.to(socket.room).emit('room.left', rooms[i]);
						break;
					}
				};

				socket.emit('rooms.update', rooms);
			});

		},











		connect: function ( socket ) {

			this.socket = socket;

			// var updateRooms = function(currentRoom) {
			// 	if (currentRoom) {
			// 		oRooms[currentRoom].users.push(socket.id);
			// 		socket.emit('update:rooms', rooms, currentRoom);
			// 	}
			// };

			socket.on('add:user', function(username) {
				console.log('Welcome', username);
				socket.username = username;
				players[socket.id] = username;
				socket.emit('update:rooms', rooms, socket.room);
			}.bind(this));

			socket.on('new:name', function(username) {
				socket.username = username;
				players[socket.id] = username;
				socket.emit('update:name', username);
				//socket.broadcast.to(socket.room).emit('update:users', players);
			});

			socket.on('add:room', function(room) {
				rooms.push(room);
				socket.emit('update:rooms', rooms, socket.room);
				io.sockets.emit('update:rooms', rooms, false);

				console.log('Room', room.id, 'created');
			});

			socket.on('join:room', function(room) {
				rooms.forEach(function(r){

					if ( r.id == room.id ) {
						if (socket.room) {
							socket.broadcast.to(socket.room).emit('update:chat', 'SERVER', socket.username + ' has left this room');
						//	r.users.splice(r.users.indexOf(socket.id), 1);
						}

						socket.join(room.name);

						r.users.push(socket.username);
						console.log(r.users);
						socket.emit('update:rooms', rooms, r.id);

						socket.room = room;

						socket.emit('update:chat', 'SERVER', 'you have joined ' + socket.room);
						socket.broadcast.to(socket.room).emit('update:chat', 'SERVER', socket.username + ' has joined this room');

					}
				});
			});

			socket.on('leave:room', function( room ) {
				//if (socket.room !== room) throw new Error('Room socket issue');

				console.log(socket.username, 'left', room);

				socket.leave(room);
				socket.broadcast.to(room).emit('update:chat', 'SERVER', socket.username + ' has left this room');

				//room.users.splice(room.users.indexOf(socket.username), 1);


				// if (oRooms[socket.room].users.length === 0) {
				// 	delete oRooms[socket.room];
				// 	rooms.splice(rooms.indexOf(socket.room), 1);
				// }

				socket.room = null;
				socket.emit('update:rooms', rooms, socket.room);
			});

			socket.on('disconnect', function() {
				console.log(socket.username + ' has quit.');
				delete players[socket.id];
				io.sockets.emit('update:users', players);
				socket.broadcast.emit('update:chat', 'SERVER', socket.username + ' has disconnected');
				socket.leave(socket.room);
			});

			socket.on('send:chat', function(data) {
				console.log('Chat:', data);
				if (socket.room)
					io.sockets["in"](socket.room).emit('update:chat', socket.username, data);
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

		}
	};
}

module.exports = Client;