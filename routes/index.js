
/*
 * GET home page.
 */

var app = require('../app')
  , user = require('./user');

app.get('/', function(req, res) {
	res.render('index', {
		title: 'All',
		styles: [
			'/lib/normalize-css/normalize.css'
		  , '//fonts.googleapis.com/css?family=Oswald'
		  , '/styles/style.css'
		],
		scripts: [
			'lib/socket.io-client/socket.io.js'
		  , 'lib/jquery/dist/jquery.min.js'
		  , 'lib/Snap.svg/dist/snap.svg-min.js'
		  , 'scripts/client.js'
		  , 'http://localhost:35729/livereload.js'
		]
	});
});

app.get('/users', user.list);
