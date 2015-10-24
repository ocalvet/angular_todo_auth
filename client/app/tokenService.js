(function(module) {
	
	'use strict';
	
	module.service('tokenService', ['localStorageService', 'LS_KEY', function(localStorageService, LS_KEY) {
		var cachedToken = null;
		
		var getToken = function() {
			if(cachedToken) return cachedToken;
			var lsToken = localStorageService.get(LS_KEY);
			if (lsToken) {
				cachedToken = lsToken;
				return cachedToken;
			}
		};
		
		var setToken = function(token) {
			cachedToken = token;
			localStorageService.set(LS_KEY, token);
		};
		
		var remove = function() {
			localStorageService.remove(LS_KEY);
			cachedToken = null;
		};
		
		return {
			getToken: getToken,
			setToken: setToken,
			remove: remove
		};
	}]);
	
})(angular.module('todoApp'));