(function(module) {
	
	'use strict';
	
	module.factory('authInterceptor', ['localStorageService', 'tokenService', '$window', function(localStorageService, tokenService, $window) {
		return {
			request: function(config) { 
				var token = tokenService.getToken();
				if (token && token.length > 0) {
					config.headers.Authorization = "Bearer " + tokenService.getToken();
				}
				
				return config;
			},
			response: function(response) { 
				console.log('response', response)
				return response;
			},
			responseError: function(response) {
				if (response.status === 403) {
					$window.location.replace('/');
				}
			}
		};
	}]);
	
})(angular.module('todoApp'));