
app.controller('LinksController', ['$scope', '$http', function($scope, $http){

		$http.get('assets/js/app/modules/links/links.json')
      .success(function(data, status, headers, config){
        // get sorted links (by title)
        $scope.links = data.sort(function compare(a,b) {
          if (a.title < b.title)
             return -1;
          if (a.title > b.title)
            return 1;
          return 0;
        })
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
      if ($event.keyCode === 27){
        $scope.searchLinks = "";
        document.querySelector('.search-links').focus();
      }
    };
}]);