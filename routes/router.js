var Router = function ( app, client ) {

	app.io.on('connection', client.socket);

	var routes = require('./index');



	// app.io.route('/room/:roomId', client.setRoom);

	// app.io.route('room', function(req) {
	// 	req.io.emit('enter:room', {
	// 		message: 'io event from an io route on the server'
	// 	})
	// })


	// app.io.route('room', {
	// 	create: function(req) {
	// 		// create your customer
	// 	},
	// 	update: function(req) {
	// 		// update your customer
	// 	},
	// 	remove: function(req) {
	// 		// remove your customer
	// 	},
	// });

	app.get('*', routes.index);

};

module.exports = Router;