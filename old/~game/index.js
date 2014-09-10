'use strict';
// var Game = {
// 	obs: require('./observer'),
// 	room: require('./room'),
// 	player: require('./player'),
// 	card: require('./card')
// };
// console.log(Game);

var socket = io.connect(),
	$ = require('jquery'),
	ko = require('knockout'),
	R = require('raphael'),
	G = require('./game')( socket, ko ),
	Game = new G();

$(function(){

	ko.applyBindings(Game);

	socket.on('connect', function() {});

});

	// socket.on('update:name', function( name ) {
	// 	Game.player.name(name);
	// });

	// socket.on('update:users', function( data ) {
	// 	var users = data;
	// });

	// socket.on('update:rooms', function( allRooms, current ) {
	// 	if ( current === false ) {
	// 		current = Game.player.room();
	// 	} else {
	// 		Game.player.room(current);
	// 	}
	// 	Game.player.room(current);
	// 	Game.rooms(allRooms);
	// });

	// socket.on('delete:room', function( room ) {
	// 	Game.rooms.splice(Game.rooms.indexOf(room), 1);
	// });

	// socket.on('update:chat', function( username, data ) {
	// 	Game.chat.addMessage('<b>'+ username + ':</b> ' + data + '<br>');
	// });


	// var $chat = $('#chat'),
	// 	$rooms = $('#rooms'),
	// 	$create = $('#create-room'),
	// 	$leave = $('#leave-room'),
	// 	$name = $('[data-name]'),
	// 	$controls = $('.controls'),
	// 	$message = $('#message'),
	// 	$send = $('#send-message'),
	// 	_leave = $leave.text();

	//oO.watch('player', player);
	//oO.watch('rooms', rooms);

	// socket.on('update:rooms', function( allRooms, current ) {
		// for (var i = allRooms.length - 1; i >= 0; i--) {
		// 	if (Game.player.rooms()[i] !== allRooms[i]) {
		// 		rooms[i] = allRooms[i];
		// 	}
		// };

		// $rooms.empty();
		// $.each(allRooms, function( key, value) {
		// 	if (value == current){
		// 		$rooms.append('<li>' + value + '</li>');
		// 	} else {
		// 		$rooms.append('<li><a href="#" data-id="' + value + '" class="room">' + value + '</a></li>');
		// 	}
		// });
	// });

	// var updatingName = false;

	// $name.click(function() {
	// 	if (updatingName) return false;
	// 	updatingName = true;

	// 	var name = $name.val();
	// 	$name.html('<input value="' + name + '" id="update-name" />');

	// 	var $update = $('#update-name');

	// 	$update.focus();
	// 	$update.keyup(function( e ) {
	// 		if(e.which === 13) {
	// 			name = $update.val();
	// 			socket.emit('new:name', name);
	// 			updatingName = false;
	// 		} else if (e.which === 27) {
	// 			$name.html(Game.player.name());
	// 			updatingName = false;
	// 		}
	// 	});
	// 	$update.blur(function( e ) {
	// 		$name.html(Game.player.name());
	// 		updatingName = false;
	// 	})
	// });


	// $rooms.on('click', '.room', function( e ) {
	// 	socket.emit('join:room', $(this).text());
	// });

	// socket.on('join:room', function( id ) {
	// 	Game.rooms.forEach(function( room ) {
	// 		if (room.id === id) {
	// 			Game.player.room(room.name);
	// 		}
	// 	})
	// 	Game.rooms(allRooms);
	// });

	// $send.click(function() {
	// 	var message = $message.val();
	// 	$message.val('');
	// 	socket.emit('send:chat', message);
	// });

	// $message.keypress(function( e ) {
	// 	if(e.which == 13) {
	// 		$(this).blur();
	// 		$send.focus().click();
	// 	}
	// });

	// $create.click(function(){
	// 	var uiud = Date.now().toString().slice(-4);
	// 	var room = {
	// 		id: uiud,
	// 		name: Game.player.name() + uiud + '\'s room',
	// 		owner: Game.player.id(),
	// 		users: []
	// 	}
	//     var name = Game.player.name() + '\'s room'; // $('#room-name').val();
	//     // $('#room-name').val('');
	//     socket.emit('add:room', room)
	// });

	// $leave.click(function(){
	//     socket.emit('leave:room', Game.player.room());
	// });











// var username ='User'+Math.floor(Math.random()*1000);
// console.log(username);

// socket.emit('Game.addPlayer', username);

// socket.on('Game.updatePlayers', function( players) {
// 	var p, el, container = document.getElementById('users');

// 	container.innerHtml = '';
// 	for (p in players) {
// 		el = document.createElement('div');
// 		el.innerHTML = players[p];
// 		container.appendChild(el);
// 	}
// });

// socket.on('Game:updateHand', function( cards) {
// 	var el, container = document.getElementById('stage'),
// 		card, hand = document.createElement('div');

// 	cards.forEach(function( c, key) {
// 		el = document.createElement('div');
// 		el.className = 'card';
// 		card = new Card( list.rank[c.rank], list.type[c.type] );
// 		el.innerHTML = card.toString();
// 		hand.appendChild(el);
// 	});

// 	container.appendChild(hand);

// });

// socket.on('Game.sendMessage', function( name, data) {
// 	console.log(name+': '+data);
// });