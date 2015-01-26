
var app = angular.module('links', ['ngRoute', 'ngAnimate'])

.config(function($routeProvider, $locationProvider) {
 
  $routeProvider
  	.when('/', {
	  controller: 'LinksController',
	  templateUrl: 'assets/js/app/modules/links/links.html'
	})
  .when('/add', {
    controller: 'AddController',
    templateUrl: 'assets/js/app/modules/add/add.html'
  })
  .when('/settings', {
    controller: 'SettingsController',
    templateUrl: 'assets/js/app/modules/settings/settings.html'
  })
  .when('/login', {
    controller: 'LoginController',
    templateUrl: 'assets/js/app/modules/login/login.html'
  });

   $locationProvider.html5Mode('true');

}); // end config
