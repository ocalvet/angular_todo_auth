(function(ng) {
	
	'use strict';
	
	ng.module('todoApp', ['ngMaterial', 'LocalStorageModule'])
		.constant('LS_KEY', 'user_info')
		.config(function (localStorageServiceProvider) {
			localStorageServiceProvider
				.setPrefix('todoApp')
				.setStorageType('localStorage')
				.setNotify(true, true);
		});
	
}) (angular);