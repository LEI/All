
var uiud = Math.round( Date.now().toString().slice(-4) * Math.random() );

function Player( socket, ko ) {
	this.name =  ko.observable('Anonymous' + uiud);

	//socket.emit('user.name', this.name());

	this.room = {
		id: ko.observable(),
		title: ko.observable(),
		users: ko.observableArray()
	};

	this.isEditingName = ko.observable(false);

	this.editName = function( data, event ) {
		return this.isEditingName( !this.isEditingName() );
	}.bind(this);

	this.submitName = function( data, event ) {
		if(event.type === 'click' || event.keyCode === 13){
			socket.emit('user.name', this.name());
			this.isEditingName(false);
		}

		return true;
	}.bind(this);

}

module.exports = Player;