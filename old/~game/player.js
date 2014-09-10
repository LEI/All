module.exports = function( socket, ko ) {

	var Player = function(name, room) {
		var uiud = Date.now().toString().slice(-4);
		//this.fullName = ko.computed(this._fullName, this);

		name = name || 'Anonym' + uiud;

		socket.emit('add:user', name);

		socket.on('update:name', function( name ) {
			this.name(name);
		});

		return {
			id: ko.observable(uiud),
			name: ko.observable(name),
			room: ko.observable(room || null),
			chat: ko.observable({}),
			editingName: ko.observable(false),
			editName: function() {
				var self = this.player;
				self.editingName(!self.editingName());

				return self.editingName();
			},
			submitName: function( data, event ) {
				var self = this.player;
				if(event.type === 'click' || event.keyCode === 13){
					self.editingName(!self.editingName());
					self.setName(self.name());
				}

				return true;
			},
			setName: function(a,b) {
				var self = this.player;
					console.log(self.name());
				socket.emit('new:name', this.name());
			},
			leaveRoom: function( data, event ) {
				var self = this.player;
				self.room(null);
			}
		}
	};

	return Player;

};