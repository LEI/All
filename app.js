var express = require('express.io')
  , app = module.exports = express().http().io()
  , path = require('path')
  //, http = require('http')
  //, io = require('socket.io')(http)
  , client = require('./routes/socket')( app.io );

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());

if ('development' == app.get('env')) {
//	app.use(express.errorHandler());
}

/**
 * Module dependencies.
 */

require('./routes/router')(app, client);

// var server = http.createServer(app).listen(app.get('port'), function(){
// 	console.log("Express server listening on port " + app.get('port'));
// });

app.listen(app.get('port'));
