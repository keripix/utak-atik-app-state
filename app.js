(function(global, $) {

	// Model
	var AppStateModel = (function() {
		var appState = {};

		return {
			setState: function(key, value) {
				appState[key] = value;

				$(document).trigger('appstate:changed', [key, value]);
			},
			constructState: function(stateObj) {
				appState = JSON.parse(stateObj);

				$(document).trigger('appstate:constructed', [appState]);
			},
			getStateString: function() {
				return JSON.stringify(appState);
			}
		};
	})();

	// Presenter-like functionalities
	// 
	// View -> Model
	$(document).on('keyup', '[data-hook="app-state"]', function(e) {
		var $target = $(e.target);
		AppStateModel.setState($target.attr('name'), $target.val());
	});

	$('#appstringsubmit').click(function() {
		AppStateModel.constructState($('#appstring').val());
	});

	$('#appstringget').click(function() {
		$('#appstring').val(AppStateModel.getStateString());
	});

	// Model -> View
	$(document).on('appstate:constructed', function(e, stateObj) {
		$.each(stateObj, function(name, value) {
			$('input[name="' + name + '"]').val(value);
		});
	});

	

})(this, $);