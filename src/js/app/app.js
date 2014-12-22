
var app = angular.module('links', ['ngRoute', 'ngAnimate'])

.config(function($routeProvider, $locationProvider) {
 
  $routeProvider
  	.when('/', {
	  controller: 'LinksController',
	  templateUrl: '/assets/js/app/modules/links/links.html'
	})
  .when('/add', {
    controller: 'AddController',
    templateUrl: '/assets/js/app/modules/add/add.html'
  })
  .when('/settings', {
    controller: 'SettingsController',
    templateUrl: '/assets/js/app/modules/settings/settings.html'
  })

   $locationProvider.html5Mode('true');

}); // end config


app.filter("hideEmpty", function(){ 
  return function(object, query){
    if(!query)
        return {}
    else
        return object;
}});

app.filter("filterLinks", function(){
  return filter = function(links, query){
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
  }
});