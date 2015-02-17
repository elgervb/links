
app.controller('AdminController', 
 function($scope, $timeout, LinksService){

  $scope.pageClass = 'admin-page';
  
  LinksService.getLinks().then(function(links){
    $scope.links = links;

    // set selection
    if (angular.isArray(links)){
      $scope.selection = links[0];
    }
  });

  $scope.launch = function(link){
      $timeout(function(){
        if (!link.count){
          link.count = 0;
        }
        link.count++;
        LinksService.update(link);
        
      });
      window.open(link.url, '_blank').focus();
    };

  $scope.select = function(guid){
    var i, link;

    console.log("select link "+guid);

    // find link
    for (i=0;i<$scope.links.length; i++){
      link = $scope.links[i];
      if (link.guid === guid){
        $scope.selection = link;
        return;
      }
    }
  };
});