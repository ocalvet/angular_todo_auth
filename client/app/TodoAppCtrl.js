(function(module) {
	
	'use strict';
	
	module.controller('TodoAppCtrl', [function() {
		var todoAppCtrl = this;
		todoAppCtrl.data = {
			title: 'Todo Angular Application'
		};
	}]);
	
})(angular.module('todoApp'));