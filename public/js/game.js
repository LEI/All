var stage,
sceneLayer = new Kinetic.Layer(),
backgroundLayer = new Kinetic.Layer(),
Game = function () {
	stage = new Kinetic.Stage({
		container: 'game',
		width: window.innerWidth,
		height: window.innerHeight
	});

	window.onresize = function(event) {
		stage.setWidth(window.innerWidth);
		stage.setHeight(window.innerHeight);
	};

	stage
		.add(backgroundLayer)
		.add(sceneLayer);

	var frameCount = 0, currentSecond = 0, frameRate = 0,
	anim = new Kinetic.Animation(function(frame) {
		var second = Math.floor(frame.time / 1000); // ms to integer seconds
		if (second != currentSecond) {
			frameRate = frameCount;
			frameCount = 0;
			currentSecond = second;
		}
		frameCount ++;
	}, sceneLayer);

	anim.start();
};

Game.prototype.start = function() {
};

Game.prototype.addDeck = function(cards) {

	var deckLayer = new Deck(cards);

	sceneLayer.add(deckLayer);
};