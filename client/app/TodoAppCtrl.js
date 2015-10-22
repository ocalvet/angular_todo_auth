(function(module) {
	
	'use strict';
	
	module.controller('TodoAppCtrl', ['authService', 'localStorageService', 'LS_KEY', function(authService, localStorageService, LS_KEY) {
		var todoAppCtrl 	= this;
		console.log(localStorageService.get(LS_KEY));
		
		todoAppCtrl.data = {
			title: 'Todo Angular Application',
			todos:  [
				{ id: 1, title: 'Buy pencils', date: new Date()},
				{ id: 2, title: 'Buy a ruler', date: new Date()},
				{ id: 3, title: 'Swing in the pool', date: new Date()}
			]
		};
		var nextId = 4;
		
		todoAppCtrl.addTodo = function (title) {
			todoAppCtrl.data.todos.push({
				id: nextId++,
				title: title,
				date: new Date()
			})
		}
		
		todoAppCtrl.toggleCompletedFlag = function (todoItem) {
			console.log('marking complete', todoItem);
			todoItem.completed = !todoItem.completed;
		}
	}]);
	
})(angular.module('todoApp'));