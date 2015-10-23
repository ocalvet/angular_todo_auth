(function(module) {
	
	'use strict';
	
	module.service('authService', ['$http', function($http) {
		 var login = function(credentials) {
			 return $http.post('/login', credentials); 
		 }
		 
		 return {
			 login: login
		 }
	}]);
	
})(angular.module('todoApp'));