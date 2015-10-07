angular.module('myApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'ui.router',
])
	.config(function ($stateProvider, $routeProvider, $locationProvider, $httpProvider, $interpolateProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'views/home',
				controller: 'MainController'
			})
			.when('/news', {
				templateUrl: 'build/news.html'
			})
			.when('/news/:name', {
				templateUrl: function (urlattr) {
					return '/build/news/' + urlattr.name + '.html';
				}
			});



		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

	});
