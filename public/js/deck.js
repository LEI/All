/**
* Cartes
*/

var Deck = function(cards) {
	var deck = new Kinetic.Group().id('deck');

	cards.forEach(function(card, key) {
		deck.add(card.node);
	});

	return deck;
};