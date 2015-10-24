(function(module) {
	
	'use strict';
	
	module.controller('TodoAppCtrl', ['authService', 'tokenService', '$window', 'todoService', '$mdToast', 
		function(authService, tokenService, $window, todoService, $mdToast) {
			var todoAppCtrl 	= this;
			var token;
			
			todoAppCtrl.showRegistration = $window.location.pathname === '/';
			
			if (!todoAppCtrl.showRegistration) {
				token = tokenService.getToken();
				console.log('token <--> ' + token);
				todoAppCtrl.isAuthenticated = token && token.length > 0;
				
				todoService.getTodos()
					.then(function(response) {
						todoAppCtrl.data.todos = response.data;
					}, function(res) {
							$mdToast.show(
								$mdToast.simple()
									.content('Error getting todos')
									.position('right bottom')
									.hideDelay(5000)
							);
					});
			}
			
			todoAppCtrl.data = {
				title: 'Todo Angular Application',
				todos:  []
			};
			
			todoAppCtrl.addTodo = function (title) {
				todoService.addTodo({ title: title })
					.then(function(response) {
						todoAppCtrl.data.todos.push(response.data.todo);
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
				tokenService.remove();
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