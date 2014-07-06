
/*
 * GET home page.
 */

var app = require('../app')
  , user = require('./user');

app.get('/', function(req, res) {
	res.render('index', {
		title: 'All',
		styles: [
			'/components/normalize-css/normalize.css',
			'/css/style.css'
		],
		scripts: [
			'components/socket.io-client/socket.io.js',
			'components/kineticjs/kinetic.min.js',
			'components/jquery/dist/jquery.min.js',
			'js/card.js',
			'js/deck.js',
			'js/game.js',
			'js/client.js',
			'http://localhost:35729/livereload.js'
		]
	});
});

app.get('/users', user.list);
