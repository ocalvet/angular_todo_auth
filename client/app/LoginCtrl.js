(function(module) {
	
	'use strict';
	
	module.controller('LoginCtrl', ['authService', '$window', '$mdToast', 'localStorageService', 'LS_KEY', 
		function(authService, $window, $mdToast, localStorageService, LS_KEY) {
			var login = this;
			login.data = {};
			login.login = function(credentials) {
				authService.login(credentials)
					.then(function(response) {
						localStorageService.set(LS_KEY, response.data.access_token);
						$window.location.href = '/dashboard';
					}, function() {
						$mdToast.show(
							$mdToast.simple()
								.content('There was an error login in')
								.position('right bottom')
								.hideDelay(3000)
						);
					});
			};
	}]);
	
})(angular.module('todoApp'));