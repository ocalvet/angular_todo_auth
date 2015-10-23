(function(module) {
	
	'use strict';
	
	module.factory('authInterceptor', function() {
		return {
			'request': function(config) { 
				console.log('request', config);
				return config;
			},
			'response': function(config) { 
				console.log('response', config)
				return config;
			}
		};
	});
	
})(angular.module('todoApp'));