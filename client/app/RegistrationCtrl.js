(function(module) {
	
	'use strict';
	
	module.controller('RegistrationCtrl', ['$window', function($window) {
		var registration = this;
		registration.data = {};
		registration.completeRegistration = function(user) {
			console.log('user register', user);
			$window.location.href = "/todo";
		};
	}]);
	
})(angular.module('todoApp'));