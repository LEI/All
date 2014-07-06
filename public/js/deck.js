	/**
	* Main
	*/

var Deck = function(cards) {
	var deck = new Kinetic.Group().id('deck')
		.x((stage.getWidth() - cards.length * 25) / 2)
		.y(stage.getHeight() / 2);

	cards.forEach(function(card, key, _deck) {
		var card = new Card(card.rank, card.type), zIndex,
			angle = key - Math.floor(cards.length / 2),
			posX = key * 20,
			posY = Math.abs(angle);

		card.init = function() {
			this.node.scale({x:1,y:1})
			.x( posX )
			.y( posY )
			.rotate( angle );
		};

		card.init();

		card.node
			.on('mouseover', function(e){
				if (zIndex === undefined) {
					zIndex = card.node.getZIndex();
				}
				card.node
					.y( e.target.getY() - 20 )
					.moveToTop();//.setZIndex(deck.length + 1);
				document.body.style.cursor = 'pointer';

				/*deck.getChildren().each(function(node) {
					if (node !== card.node) {
						node.x( node.getX() - 50 );
					}
				});*/
			})
			.on('mouseout', function(e){
				card.node
					.y( e.target.getY() )
					.setZIndex(zIndex);
				document.body.style.cursor = 'default';
			})
			.on('dragstart', function(e){
				e.target
					.scale({x:1.2,y:1.2})
					.moveToTop();
				//console.log({x:e.target.x(), y:e.target.y()});
			})
			.on('dragend', function(e){
				card.init();
				e.target
					.setZIndex( zIndex );
				//deckLayer.draw();
				//console.log(e.target.x());
			});
		deck.add(card.node);
	});

	return deck;
};