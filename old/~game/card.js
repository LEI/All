function Card(rank, type) {
	var cardList = {
		rank: {
			two: { logo: '2', label: 'Deux' },
			three: { logo: '3', label: 'Trois' },
			for: { logo: '4', label: 'Quatre' },
			five: { logo: '5', label: 'Cinq' },
			six: { logo: '6', label: 'Six' },
			seven: { logo: '7', label: 'Sept' },
			eight: { logo: '8', label: 'Huit' },
			nine: { logo: '9', label: 'Neuf' },
			ten: { logo: '10', label: 'Dix' },
			jack: { logo: 'V', label: 'Valet' },
			queen: { logo: 'Q', label: 'Dame' },
			king: { logo: 'K', label: 'Roi' },
			ace: { logo: 'A', label: 'As' }
		},
		type: {
			spade: { name: 'Pique', logo: '♠', color: 'black' },
			club: { name: 'Trèfle', logo: '♣', color: 'black' },
			heart: { name: 'Coeur', logo: '♥', color: 'red' },
			diamond: { name: 'Carreau', logo: '♦', color: 'red' }
		}
	};

	return {
		getValue: function() {
			return cardList.rank.logo + cardList.type.logo;
		}
	};
}

module.exports = Card;