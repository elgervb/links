
app.controller('AddController', ['$scope', '$http', '$location', 
 function($scope, $http, $location){

  $scope.submit = function(){
    console.log('submit');
    var link = {};
    link.title = $scope.title;
    link.url = $scope.url;
    if ($scope.tags && $scope.tags.indexOf(';') >= 0){
      link.tags = $scope.tags.split(';');
    }
    else{
      link.tags = $scope.tags;
    }
  }
  $scope.cancel = function(){
    $location.path('/');
  };
		
}]);