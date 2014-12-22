
app.controller('AddController', 
 function($scope, $location, LinksService){

  $scope.pageClass = 'add-page';

  $scope.submit = function(){
    console.dir($scope.link);

    LinksService.addLink($scope.link);
    $location.path('/');
  };

  $scope.cancel = function(){
    $location.path('/');
  };

  $scope.addTag = function(tag){

    $scope.link = $scope.link || {};
    $scope.link.tags = $scope.link.tags || [];
    $scope.link.tags.push(tag);
    $scope.tag = "";
  
  };
		
});