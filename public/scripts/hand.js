/**
* Main
*/

var Hand = function(cards) {
	var hand = new Kinetic.Group().id('deck')
		.x((stage.getWidth() - cards.length * 25) / 2)
		.y(stage.getHeight() / 2);

	cards.forEach(function(card, key, _deck) {

		var card = new Card(card.rank, card.type),
			tween, zIndex,
			angle = key - Math.floor(cards.length / 2),
			posX = key * 20,
			posY = Math.abs(angle);

		cards[key] = card;

		var FilpButton = function(){
			return new Kinetic.Circle({
				x: card.node.width() - 20,
				y: 20,
				width: card.node.width() / 4,
				fill: card.type.color
			}).id('filpButton')
			.on('click', function(e) {
				console.log(e);
				card.node.draggable(false);
				card.node.moveToTop();
				new Kinetic.Tween({
					node: card.node,
					duration: 0.1,
					scaleX: 1.5,
					scaleY: 1.5,
					offsetX: 2
				}).play();
			});
		};

		card.node.scale({x:1,y:1})
			.x( posX )
			.y( posY );

		card.node
			.listening(true)
			.rotate( angle )
			.on('mouseenter', function(e){
				card.node.add(new FilpButton());
			})
			.on('mouseover', function(e){
				document.body.style.cursor = 'pointer';
				if (zIndex === undefined) {
					zIndex = card.node.getZIndex();
				}
				card.node.moveToTop();//.setZIndex(deck.length + 1);

				// cards.forEach(function(c, k) {
					// if (node !== card.node) {
					// 	node.x( node.getX() - 50 );
					// }
					//console.log(key, k);
					// if (k < key) {
					// 	new Kinetic.Tween({
					// 		node: c.node,
					// 		duration: 0.3,
					// 		x: e.target.getX() - 10
					// 	}).play();
					// } else if (k > key) {
					// 	new Kinetic.Tween({
					// 		node: c.node,
					// 		duration: 0.3,
					// 		x: e.target.getX() + 10
					// 	}).play();
					// }
				// });
				new Kinetic.Tween({
					node: card.node,
					duration: 0.2,
					y: e.target.getY() - 20
				}).play();
			})
			.on('mouseout', function(e){
				document.body.style.cursor = 'default';
				card.node.setZIndex( zIndex );
				new Kinetic.Tween({
					node: card.node,
					duration: 0.2,
					x: posX,
					y: posY
				}).play();

				card.node.getChildren(function(node){
					if (node.getClassName() === 'Circle') {

						tween = new Kinetic.Tween({
							node: node,
							duration: 0.3,
							opacity: 0
						}).play();
						setTimeout(function() {
							node.destroy();
						}, 300);

					}
				});
				card.node.draw();
			})
			.on('dragstart', function(e){
				new Kinetic.Tween({
					node: card.node,
					duration: 0.1,
					scaleX: 1.2,
					scaleY: 1.2,
					offsetX: 2
				}).play();
				//console.log({x:e.target.x(), y:e.target.y()});
			})
			.on('dragend', function(e){
				tween = new Kinetic.Tween({
					node: card.node,
					duration: 0.1,
					x: posX,
					y: posY,
					scaleX: 1,
					scaleY: 1
				}).play();
				e.target
					.setZIndex( zIndex );
				//deckLayer.draw();
				//console.log(e.target.x());
			});
		hand.add(card.node);
	});

	return hand;
};