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
	$(document).on('keyup change', '[data-hook="app-state"]', function(e) {
		var $target = $(e.target);
		var val = $target.prop('type') == "checkbox" ? $target.prop('checked') : $target.val();
		AppStateModel.setState($target.attr('name'), val, e.target.localName);
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

				$el = $(type + '[name="' + name + '"]');
				
				if ($el.prop('type') == "checkbox") {
					$el.prop('checked', value);
				} else {
					$el.val(value);
				}
				
			});
		});
	});

	// DOM
	$('form').submit(function(e) {
		e.preventDefault();
	});

})(this, $);