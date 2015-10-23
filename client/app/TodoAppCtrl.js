(function(module) {
	
	'use strict';
	
	module.controller('TodoAppCtrl', ['authService', 'localStorageService', 'LS_KEY', '$window', 'todoService', '$mdToast', 
		function(authService, localStorageService, LS_KEY, $window, todoService, $mdToast) {
			var todoAppCtrl 	= this;
			var nextId = 4;
			var token = localStorageService.get(LS_KEY);
			
			console.log('token - ', token);
			todoAppCtrl.isAuthenticated = token && token.length > 0;
			
			console.log($window.location);
			todoAppCtrl.showRegistration = $window.location.pathname === '/';
			
			todoAppCtrl.data = {
				title: 'Todo Angular Application',
				todos:  []
			};
			
			todoService.getTodos()
				.then(function(response) {
					console.log('todos ', response.data);
					todoAppCtrl.data.todos = response.data;
					console.log('todos', response);
				}, function(res) {
						$mdToast.show(
							$mdToast.simple()
								.content('Error getting todos')
								.position('right bottom')
								.hideDelay(5000)
						);
				});
			
			todoAppCtrl.addTodo = function (title) {
				todoService.addTodo({ title: title })
					.then(function(response) {
						todoAppCtrl.data.todos.push(response.data.todo);
						console.log('Todo added', response);
					}, function(response) {
						$mdToast.show(
							$mdToast.simple()
								.content('There was an error adding the todo')
								.position('right bottom')
								.hideDelay(5000)
						);
					});
			};
			
			todoAppCtrl.updateCompletedFlag = function (todoItem) {
				todoService.updateTodo(todoItem)
					.then(function(todo) {
						$mdToast.show(
							$mdToast.simple()
								.content('Todo updated')
								.position('right bottom')
								.hideDelay(5000)
						);
					}, function() {
						todoItem.completed = !todoItem.completed;
					});
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