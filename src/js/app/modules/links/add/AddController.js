
app.controller('AddController', 
 function($scope, $location, LinksService){

  $scope.pageClass = 'add-page';
  $scope.link = {};
  $scope.link.ispublic = 1; // enable by default

  $scope.submit = function(){
    console.dir($scope.link);

    LinksService.addLink($scope.link).then(function(){
      $location.path('/');
    });
    
  };

  $scope.cancel = function(){
    $location.path('/');
  };

  $scope.addTag = function(tag){

    if (!tag){return;}

    $scope.link = $scope.link || {};
    $scope.link.tags = $scope.link.tags || [];

    //prevent dupes
    if ($scope.link.tags.indexOf(tag) === -1){
      $scope.link.tags.push(tag.toLowerCase());
      $scope.tag = "";
    }
  
  };

  $scope.addTagWithKey = function(tag, $event){

    if ($event.which === 13){
      $scope.addTag(tag);
      $event.preventDefault();
    }

  };
		
});