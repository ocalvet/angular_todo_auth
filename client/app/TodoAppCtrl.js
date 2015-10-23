(function(module) {
	
	'use strict';
	
	module.controller('TodoAppCtrl', ['authService', 'localStorageService', 'LS_KEY', '$window', 'todoService', 
		function(authService, localStorageService, LS_KEY, $window, todoService) {
			var todoAppCtrl 	= this;
			var nextId = 4;
			var token = localStorageService.get(LS_KEY);
			
			console.log('token - ', token);
			todoAppCtrl.isAuthenticated = token;
			
			console.log($window.location);
			todoAppCtrl.showRegistration = $window.location.pathname !== '/';
			
			todoAppCtrl.data = {
				title: 'Todo Angular Application',
				todos:  []
			};
			
			todoService.getTodos()
				.then(function(response) {
					console.log('todos ', response.data);
					todoAppCtrl.data.todos = response.data;
				}, function(res) {
					console.log('Error getting todos', res);
				});
			
			todoAppCtrl.addTodo = function (title) {
				todoService.addTodo({ title: title })
					.then(function(response) {
						todoAppCtrl.data.todos.push(response.data.todo);
						console.log('Todo added');
					}, function(response) {
						console.log('There was an error adding the todo');
					});
			};
			
			todoAppCtrl.toggleCompletedFlag = function (todoItem) {
				console.log('marking complete', todoItem);
				todoItem.completed = !todoItem.completed;
			};
			
			todoAppCtrl.logout = function() {
				localStorageService.remove(LS_KEY);
				$window.location.href = '/';
			};
			
			todoAppCtrl.register = function() {
				todoAppCtrl.showRegistration = true;
			};
			
			todoAppCtrl.signin = function() {
				todoAppCtrl.showRegistration = false;
			};
		}]);
	
})(angular.module('todoApp'));