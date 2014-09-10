var stage, hand
  , sceneLayer = new Kinetic.Layer()
  , backgroundLayer = new Kinetic.Layer();

var Game = function() {
	stage = new Kinetic.Stage({
		container: 'game',
		width: window.innerWidth,
		height: window.innerHeight
	})
	.add(backgroundLayer)
	.add(sceneLayer);

	/*var frameCount = 0, currentSecond = 0, frameRate = 0,
	anim = new Kinetic.Animation(function(frame) {
		var second = Math.floor(frame.time / 1000); // ms to integer seconds
		if (second != currentSecond) {
			frameRate = frameCount;
			frameCount = 0;
			currentSecond = second;
		}
		frameCount ++;
	}, sceneLayer);

	anim.start();*/
};

Game.prototype.start = function(cards) {
	var handLayer = new Hand(cards);

	console.log(handLayer);
	sceneLayer.add(handLayer);
	sceneLayer.draw();
};