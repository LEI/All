var socket = io.connect(),
	$ = require('jquery'),
	ko = require('knockout'),
	R = require('raphael'),
	G = require('./game')( socket, ko );

$(function(){

	ko.applyBindings(G);

	socket.on('connect', function() {});

});