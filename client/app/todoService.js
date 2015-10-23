(function(module) {
	
	'use strict';
	
	module.service('todoService', ['$http', function($http) {
		
		var getTodos = function() {
			return $http.get('/todo');
		}, 
		addTodo = function(todo) {
			return $http.post('/todo', todo);
		},
		updateTodo = function(todo) {
			return $http.put('/todo/' + todo._id, todo);
		};
		
		return {
			getTodos: getTodos,
			addTodo: addTodo,
			updateTodo: updateTodo
		}
	}]);
	
})(angular.module('todoApp'));