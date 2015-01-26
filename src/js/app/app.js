
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

app.value('baseUrl', 'http://localhost/git/REST-api/');

app.filter("hideEmpty", function(){ 
  return function(object, query){
    if(!query)
        return {};
    else
        return object;
  };
});

app.filter("filterLinks", function(){
  return function(links, query){
    var regex = new RegExp(query, 'i'),
    props = ['title', 'url', 'tags'],
    i;
    
    if (angular.isArray(links)){
      return links.filter(function(link){
        for (i in props){
          if (regex.test(link[props[i]])){
            return link;
          }
        }
        
      });
    }
    else{
      return links;
    }
  };
});