/**
 * Carte
 */

var Card = function (rank, type, width, height, radius) {
	this.rank = rankList[rank];
	this.type = typeList[type];
	this.name = rank + '\n' + this.type.logo;
	var self = this,
		fill = 'white', stroke = 'black',
		border = 1, radius = radius || 5;
	this.node = new Kinetic.Group({
		width: width || 120,
		height: height || 175,
		draggable: true,
		dragDistance: 10,
		dragBoundFunc: function(pos) {
			var maxWidth = stage.width() - self.node.width() * self.node.scaleX(),
				maxHeight = stage.height() - self.node.height() * self.node.scaleX(),
				newX, newY;
			if (pos.x < 0) {
				newX = 0;
			} else if (pos.x >= maxWidth) {
				newX = maxWidth;
			} else {
				newX = pos.x;
			}
			if (pos.y < 0) {
				newY = 0;
			} else if (pos.y >= maxHeight) {
				newY = maxHeight;
			} else {
				newY = pos.y;
			}
			return {
				x: newX,
				y: newY
			};
		}
	});

	this.node.add(new Kinetic.Rect({
		width: self.node.getWidth(),
		height: self.node.getHeight(),
		fill: fill,
		stroke: stroke,
		strokeWidth: border,
		cornerRadius: radius
	}));

	this.node.add(new Kinetic.Rect({
		width: self.node.getWidth() - 40,
		height: self.node.getHeight() - 40,
		offset: { x: -20, y: -20 },
		stroke: this.type.color,
		strokeWidth: border,
		cornerRadius: radius
	}).listening(false));

	var fontSize = 14;

	this.node.add(new Kinetic.Text({
		width: self.node.getWidth() - 50,
		offset: { x: - 25, y: - self.node.getWidth() + 20 },
		text: this.rank.label + ' de ' + this.type.name,
		fontSize: fontSize,
		fontFamily: 'Helvetica, sans-serif',
		align: 'center',
		fill: stroke
	}).listening(false));

	this.node.add(new Kinetic.Text({
		text: this.name,
		fontSize: fontSize,
		fontFamily: 'Helvetica, sans-serif',
		align: 'left',
		offset: {
			x: - 5,
			y: - 5
		},
		fill: self.type.color
	}).listening(false));

	this.node.add(new Kinetic.Text({
		//width: self.node.width(),
		text: this.name,
		fontSize: fontSize,
		fontFamily: 'Helvetica, sans-serif',
		align: 'right',
		offset: {
			x: self.node.width() - 5,
			y: self.node.height() - 5
		},
		fill: self.type.color
	}).rotate(180)
	.listening(false));
};



var rankList = {
	'2': { name: 'two', label: 'Deux' },
	'3': { name: 'three', label: 'Trois' },
	'4': { name: 'for', label: 'Quatre' },
	'5': { name: 'five', label: 'Cinq' },
	'6': { name: 'six', label: 'Six' },
	'7': { name: 'six', label: 'Sept' },
	'8': { name: 'six', label: 'Huit' },
	'9': { name: 'six', label: 'Neuf' },
	'10': { name: 'six', label: 'Dix' },
	'V': { name: 'jack', label: 'Valet' },
	'Q': { name: 'queen', label: 'Dame' },
	'K': { name: 'king', label: 'Roi' },
	'A': { name: 'ace', label: 'As' }
}, typeList = {
	spade: {
		name: 'Pique',
		logo: '♠',
		color: 'black'
	},
	club: {
		name: 'Trèfle',
		logo: '♣',
		color: 'noir'
	},
	heart: {
		name: 'Coeur',
		logo: '♥',
		color: 'red'
	},
	diamond: {
		name: 'Carreau',
		logo: '♦',
		color: 'red'
	}
};







/*
Card.prototype.init = function (CardId) {
	this.kills = 0;
	this.deaths = 0;
	this.bonuses = 0;
	this.score = 0;
	this.currentLength = this.Card_LENGTH;
	this.elements = [];
	this.id = CardId;
	this.name = 'Card'+this.id;
	this.direction = 'right';
	this.initElements();
};

Card.prototype.initElements = function () {
	// Position verticale aléatoire
	var rand = Math.floor(Math.random() * this.STAGE_HEIGHT);
	// Alignement horizontal des éléments à gauche du stage
	for (var x=this.currentLength; x>0; x--) {
		this.elements.push({x: -x, y: rand});
	}
};

// Ajout d'un élément à la fin du Card
Card.prototype.addElement = function () {
	this.elements.unshift({x: this.elements[0].x, y: this.elements[0].y})
	this.currentLength++;
}

Card.prototype.setName = function (name) {
	this.name = name;
}

Card.prototype.head = function () {
	return this.elements[this.currentLength-1];
};

// Déplacement à chaque tick
Card.prototype.doStep = function () {
	for (var i=0; i<this.currentLength-1; i++) {
		this.moveElement(i);
	}
	this.moveHead();
};

// Gestion des éléments d'un Card
Card.prototype.moveElement = function (i) {
	this.elements[i].x = this.elements[i+1].x;
	this.elements[i].y = this.elements[i+1].y;
};

// Gestion de la tête
Card.prototype.moveHead = function () {
	// Déplacement de la tête en fonction de la direction
	switch (this.direction) {
		case 'right': this.head().x++; break;
		case 'left': this.head().x--; break;
		case 'down': this.head().y++; break;
		case 'up': this.head().y--; break;
		default: new Error('Direction ' + this.direction + ' unknown');
	}
	// Gestion des bordures
	if (this.head().x > this.STAGE_WIDTH) {
		this.head().x = 0;
	} else if (this.head().x < 0) {
		this.head().x = this.STAGE_WIDTH;
	} else if (this.head().y > this.STAGE_HEIGHT) {
		this.head().y = 0;
	} else if (this.head().y < 0) {
		this.head().y = this.STAGE_HEIGHT;
	}
};

// Changement de direction
Card.prototype.setDirection = function (direction) {
	// Vérification des directions impossibles
	if ((this.direction == 'left' && direction == 'right') ||
		(this.direction == 'right' && direction == 'left') ||
		(this.direction == 'up' && direction == 'down') ||
		(this.direction == 'down' && direction == 'up')) {
		return;
	}
	this.direction = direction;
};

// Réinitialisation d'un Card
Card.prototype.reset = function () {
	this.currentLength = this.Card_LENGTH;
	this.elements = []; // Restart de la position des éléments
	this.initElements();
	this.direction = 'right'; // Restart de la position
};

// Mort d'un Card
Card.prototype.onDie = function () {
	this.reset();
	this.deaths++;
	this.score /= 2;
	this.bonuses = 0;
};

Card.prototype.onKill = function () {
	this.kills++;
	this.score += 10;
};

Card.prototype.onBonus = function () {
	this.bonuses++;
};

// Vérification de la collision entre une tête et un élément
Card.prototype.hasCollision = function (element) {
	if (this.head().x == element.x && this.head().y == element.y) {
		return true;
	}
};*/