(function(module) {
	
	'use strict';
	
	module.controller('LoginCtrl', [function() {
		var login = this;
		login.data = {};
		login.login = function(credentials) {
			console.log('credentials', credentials);
		};
	}]);
	
})(angular.module('todoApp'));