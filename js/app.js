(function(global, $) {

	// Model
	var AppStateModel = (function() {
		var appState = {};

		return {
			setState: function(key, value, elType) {
				appState[elType] || (appState[elType] = {});

				appState[elType][key] = value;
				console.log(appState);
				$(document).trigger('appstate:changed', [key, value, elType]);
			},
			constructState: function(stateObj) {
				appState = JSON.parse(global.atob(stateObj));

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
		AppStateModel.setState($target.attr('name'), $target.val(), 'text');
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