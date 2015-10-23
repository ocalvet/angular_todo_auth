(function(module) {
	
	'use strict';
	
	module.controller('TodoAppCtrl', ['authService', 'localStorageService', 'LS_KEY', '$window', function(authService, localStorageService, LS_KEY, $window) {
		var todoAppCtrl 	= this;
		var nextId = 4;
		var token = localStorageService.get(LS_KEY);
		console.log('token - ', token);
		todoAppCtrl.isAuthenticated = token;
		
		console.log($window.location);
		todoAppCtrl.showRegistration = $window.location.pathname !== '/';
		
		todoAppCtrl.data = {
			title: 'Todo Angular Application',
			todos:  [
				{ id: 1, title: 'Buy pencils', date: new Date()},
				{ id: 2, title: 'Buy a ruler', date: new Date()},
				{ id: 3, title: 'Swing in the pool', date: new Date()}
			]
		};
		
		todoAppCtrl.addTodo = function (title) {
			todoAppCtrl.data.todos.push({
				id: nextId++,
				title: title,
				date: new Date()
			})
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