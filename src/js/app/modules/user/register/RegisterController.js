
app.controller('RegisterController', 
 function($scope, $location, UserService){

  $scope.pageClass = 'register-page';
  $scope.user = {};

  $scope.cancel = function(){
    $location.path('/');
  };
  $scope.register = function(){
  	UserService.register($scope.user)
  	.then(function(data){
  		$scope.registered = true;
  	}, function(msg){
  		$scope.error = msg;
  	});
  };
});