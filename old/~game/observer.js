function Observer($) {
	if (typeof Object.observe !== 'function' ||
		typeof Array.observe !== 'function') {
		return false;
	}

	Array.prototype.diff = function(a) {
		return this.filter(function(i) {return a.indexOf(i) < 0;});
	};

	var $els = {};
	$('[data-bind*=" "]').each(function( key, val ) {
		var $val = $(val),
			values = $val.attr('data-bind').split(' ');
		if ( $els[values[1]] ) {
			$els[values[1]].els.push($val);
		} else {
			$els[values[1]] = {
				type: values[0],
				els: [$val]
			};
		}
	});

	console.log($els)

	return {
		watch: function( name, model, opts ) {
			opts = opts || $els;
			Object.observe(model, function( changes ){
				// Pour chaque changement
				changes.forEach(function( change ) {
					var key = name + '.' + change.name,
						param, value;

					if ( opts.hasOwnProperty(key) ) {
						// Object
						param = opts[key];
						value = model[change.name];
					} else if ( model.length > 0 ) {
						// Array
						param = opts[name]
						value = model[change.name];
					}

					console.log(param);

					// Pour chaque élément
					param.els.forEach(function (el) {

						switch( param.type ) {
							case 'text':
								el.html(value);
								break;
							case 'show':
								if (el.is(':visible')) {
									el.hide();
								} else {
									el.show();
								}
								break;
							case 'list':
								el.append('<li>' + model[change.name] + '</li>')
								console.log(change.name);
								break;
							case 'stream':
								el.append('test');
								break;
						}

					});
				});
			});
		}
	}
}

module.exports = Observer;