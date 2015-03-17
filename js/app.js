(function(global, $) {

	// Model
	var AppStateModel = (function() {
		var appState = {};

		return {
			setState: function(key, value, elType) {
				appState[elType] || (appState[elType] = {});
				appState[elType][key] = value;

				$(document).trigger('appstate:changed', [key, value, elType]);
			},
			constructState: function(stateObj) {
				appState = JSON.parse(global.atob(stateObj));
				console.log(appState);
				$(document).trigger('appstate:constructed', [appState]);
			},
			getStateString: function() {
				return global.btoa(JSON.stringify(appState));
			}
		};
	})();

	// Presenter-like functionalities
	// 
	// View -> Model
	$(document).on('keyup', '[data-hook="app-state-text"]', function(e) {
		var $target = $(e.target);
		AppStateModel.setState($target.attr('name'), $target.val(), 'input');
	});

	$('#appstringsubmit').click(function() {
		AppStateModel.constructState($('#appstring').val());
	});

	$('#appstringget').click(function() {
		$('#appstring').val(AppStateModel.getStateString());
	});

	// Model -> View
	$(document).on('appstate:constructed', function(e, stateObj) {
		$.each(stateObj, function(type, obj) {
			$.each(obj, function(name, value) {
				$(type + '[name="' + name + '"]').val(value);
			});
		});
	});

	// DOM
	$('form').submit(function(e) {
		e.preventDefault();
	});

})(this, $);