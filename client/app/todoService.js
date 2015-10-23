(function(module) {
	
	'use strict';
	
	module.service('todoService', ['$http', function($http) {
		
		var getTodos = function() {
			return $http.get('/todo');
		}, 
		addTodo = function(todo) {
			return $http.post('/todo', todo);
		};
		
		return {
			getTodos: getTodos,
			addTodo: addTodo
		}
	}]);
	
})(angular.module('todoApp'));