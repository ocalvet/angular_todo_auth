(function(ng) {
	
	'use strict';
	
	ng.module('todoApp', ['ngMaterial', 'LocalStorageModule'])
		.constant('LS_KEY', 'access_token')
		.config(function (localStorageServiceProvider, $httpProvider) {
			localStorageServiceProvider
				.setPrefix('todoApp')
				.setStorageType('localStorage')
				.setNotify(true, true);
			
			//$httpProvider.interceptors.push('authInterceptor');
		});
	
}) (angular);