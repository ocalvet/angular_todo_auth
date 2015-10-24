(function(module) {
	
	'use strict';
	
	module.controller('LoginCtrl', ['authService', '$window', '$mdToast', 'tokenService', 
		function(authService, $window, $mdToast, tokenService) {
			var login = this;
			login.data = {};
			login.login = function(credentials) {
				authService.login(credentials)
					.then(function(response) {
						tokenService.setToken(response.data.access_token);
						console.log('user response', response);
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