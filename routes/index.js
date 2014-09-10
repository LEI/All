
/*
 * GET index.
 */

//var Game = require('../models/game');

exports.index = function(req, res) {
	res.render('login', {
		title: 'Login'
	});
};