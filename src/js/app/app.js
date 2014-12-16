
var app = angular.module('links', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
 
  $routeProvider
  	.when('/', {
	  controller: 'LinksController',
	  templateUrl: '/assets/js/app/modules/links/links.html'
	})

   $locationProvider.html5Mode('true');

}); // end config


app.filter("hideEmpty", function(){ return function(object, query){
    if(!query)
        return {}
    else
        return object;
}});