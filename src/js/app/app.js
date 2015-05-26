
var app = angular.module('links', ['ngRoute', 'ngAnimate'])

.config(function($routeProvider, $locationProvider) {
 
  $routeProvider
  .when('/', {
    controller: 'LinksController',
    templateUrl: 'js/app/modules/links/links.html'
  })
  .when('/add', {
    controller: 'AddController',
    templateUrl: 'js/app/modules/links/add/add.html'
  })
  .when('/settings', {
    controller: 'SettingsController',
    templateUrl: 'js/app/modules/settings/settings.html'
  })
  .when('/login', {
    controller: 'LoginController',
    templateUrl: 'js/app/modules/user/login/login.html'
  })
  .when('/register', {
    controller: 'RegisterController',
    templateUrl: 'js/app/modules/user/register/register.html'
  })

  .when('/admin', {
    controller: 'AdminController',
    templateUrl: 'js/app/modules/links/admin/admin.html'
  });

  $locationProvider.html5Mode('true');

}); // End config