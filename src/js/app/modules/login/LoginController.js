
app.controller('LoginController', 
 function($scope, $timeout){

  $scope.pageClass = 'login-page';

  $scope.login = function(){
  	$scope.error = false;

  	// use timeout to shake the form each time when an error occures
  	$timeout(function(){
  		$scope.error = true;
  	}, 10);
  }
});