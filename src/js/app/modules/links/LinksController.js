
app.controller('LinksController', 
  function($scope, $http, LinksService){

    LinksService.getLinks().then(function(links){
      $scope.links = links;
    });

    $scope.redirect = function(link){
      window.open(link.url, '_blank').focus();
    };

    $scope.getTags = function(tags){
      console.log('get tags');
      if (tags){
        return tags.split(';');
      } 
    };

    $scope.clickTag = function(tag, $event){
      $event.preventDefault();
      $event.stopImmediatePropagation();
      $scope.searchLinks = tag;
    };

    $scope.onKeyPress = function($event){
      
      // clear & focus search box 
      if ($event.keyCode === 27){
        $scope.searchLinks = "";
        document.querySelector('.search-links').focus();
      }
      // focus search box
      else if($event.ctrlKey && $event.key === "f"){
        document.querySelector('.search-links').focus();
        $event.preventDefault();
        $event.stopImmediatePropagation();
      }

    };
});