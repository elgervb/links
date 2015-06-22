
app.controller('AdminController', function($scope, $timeout, LinksService) {

  $scope.pageClass = 'admin-page';
  
  LinksService.getLinks().then(function(links) {
    $scope.links = links;

    // Set selection
    if (angular.isArray(links)) {
      $scope.selection = angular.copy(links[0]);
    }
  });

  $scope.save = function(link) {
    
    LinksService.update(link).then(function(link) {
      // update list
      for (i = 0; i < $scope.links.length; i++) {
        if ($scope.links[i].guid === link.guid) {
          $scope.links[i] = link;
          return link;
        }
      }
      return link;
    }).then(function(link) {
      $scope.form.$setPristine();
    });

  };

  $scope.cancel = function() {
    for (i = 0; i < $scope.links.length; i++) {
      if ($scope.links[i].guid === $scope.selection.guid) {
        $scope.selection = angular.copy($scope.links[i]);
        break;
      }
    }
    $scope.form.$setPristine();
  };
  
  $scope.launch = function(link) {
    $timeout(function() {
      if (!link.count) {
        link.count = 0;
      }
      link.count++;
      LinksService.update(link);
      
    });
    window.open(link.url, '_blank').focus();
  };

  $scope.select = function(guid) {
    var i, link;

    console.log('select link ' + guid);

    // Find link
    for (i = 0; i < $scope.links.length; i++) {
      link = $scope.links[i];
      if (link.guid === guid) {
        $scope.selection = angular.copy(link);
        return;
      }
    }
  };
});