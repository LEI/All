'use strict';

$(function(){

	var game = new Game(),
		socket = io.connect();

	// on connection to server, ask for user's name with an anonymous callback
	socket.on('connect', function(){

		//sceneLayer.add(new Card('ace','spade')._card);

		// call the server-side function 'adduser' and send one parameter (value of prompt)
		socket.emit('adduser', /*prompt("What's your name?")*/'User');
	});

	// listener, whenever the server emits 'updatechat', this updates the chat body
	socket.on('updatechat', function (username, data) {
		//$('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
	});

	socket.on('updatedeck', function (cards) {
		game.addDeck(cards);
	});

	// listener, whenever the server emits 'updateusers', this updates the username list
	socket.on('updateusers', function(data) {
		$('#users').empty();
		$.each(data, function(key, value) {
			$('#users').append('<div>' + key + '</div>');
		});
	});

	// when the client clicks SEND
	// $('#datasend').click( function() {
		//  var message = $('#data').val();
		//  $('#data').val('');
		//  // tell server to execute 'sendchat' and send along one parameter
		//  socket.emit('sendchat', message);
	// });

	// // when the client hits ENTER on their keyboard
	// $('#data').keypress(function(e) {
	//     if(e.which == 13) {
	//         $(this).blur();
	//         $('#datasend').focus().click();
	//     }
	// });

});

/*
var stage;
var initCoords = {x:0, y:0};

$(document).ready(function(){

  function writeMessage(message) {
        text.text(message);
        layer.draw();
      }

      stage = new Kinetic.Stage({
        container: 'container',
        width: 1024,
        height: 800
      });

      var layer = new Kinetic.Layer();

      var text = new Kinetic.Text({
        x: 10,
        y: 10,
        fontFamily: 'Calibri',
        fontSize: 24,
        text: 'Drag the blue rectangle inside (or outside) of the yellow one and Drop it',
        fill: 'white'
      });

      var box = new Kinetic.Rect({
        x: 589,
        y: 100,
        offset: [50, 25],
        width: 100,
        height: 50,
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      });

      var boxTarget = new Kinetic.Rect({
        x: 100,
        y: 100,
        offset: [50, 25],
        width: 200,
        height: 100,
        fill: '#fec72c',
        stroke: 'white',
        strokeWidth: 4,
        draggable: false,
        name: "droppable"
      });


      // write out drag and drop events
      box.on('dragstart', function(e) {
        writeMessage('dragstart');
        initCoords = {x:e.target.x(), y:e.target.y()};
      });
      box.on('dragend', function(e) {
        writeMessage('dragend');
        onDragEnd(e);
      });

      layer.add(text);
      layer.add(boxTarget);
      layer.add(box);

      stage.add(layer);

});


function onDragEnd(e) {
  var droppableTargets  = stage.find('.droppable');
  var draggable = e.target;

  for(var i=0;i<droppableTargets.length;i++){
    // we use the fit calculation
    var result = doObjectsFit(draggable, droppableTargets[i]);

    if(result === true) {
      droppableTargets[i].setStroke("#ff0000");
      var targetW = droppableTargets[i].width();
      var targetH = droppableTargets[i].height();
      var targetX = droppableTargets[i].x() + (targetW/2 - draggable.width()/2);
      var targetY = droppableTargets[i].y() + (targetH/2 - draggable.height()/2);

      draggable.x(targetX);
      draggable.y(targetY);

      stage.draw();

      return true;
    }
    else {
      var tween = new Kinetic.Tween({
        node: draggable,
        duration: 0.4,
        x: initCoords.x,
        y: initCoords.y
      });

      tween.play();
    }

    window.console.log(result);
  }


}

function doObjectsTouch(a, b) { // a and b are your objects
   return !(
    ((a.y() + a.height()) < (b.y())) ||
    (a.y() > (b.y() + b.height())) ||
    ((a.x() + a.width()) < b.x()) ||
    (a.x() > (b.x() + b.width()))
   );
}

function doObjectsFit(a, b) { // a and b are your objects
   if( (a.y()) > (b.y()) &&
       (a.y() + a.height()) <= (b.y() + b.height()) &&
       (a.x()) > (b.x()) &&
       (a.x() + a.width()) < (b.x()+b.width())
     ){
     return true;
   }
}

function doObjectsIntersect(a, b) { // a and b are your objects
   if( (a.y()) > (b.y()+b.height()/2) &&
       (a.y() + a.height()) <= (b.y() + b.height()) &&
       (a.x()) > (b.x()) &&
       (a.x() + a.width()) < (b.x()+b.width())
     ){
     return true;
   }
}

function droppable(elem, settings){

  var tolerance = settings.tolerance || "intersect"; // fit, intersect, touch
  var accept = settings.accept || "";
  var hover_style_color = settings.hover_style.color;
  var hover_style_stroke = settings.hover_style.stroke;
  var hover_style_background = settings.hover_style.background;
  var drop_style_background = settings.drop_style.background;
  var onDrop = settings.onDrop;
  var onHover = settings.onHover;
  var _stage = settings.stageObj;
  var reverse = settings.reverse || true;

}*/