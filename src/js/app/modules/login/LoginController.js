
app.controller('LoginController', 
 function($scope, AuthService){

  $scope.pageClass = 'login-page';

  $scope.login = function(){
  	$scope.error = false;

    AuthService.login($scope.login.username, $scope.login.password)
    .then(
     	function(user){ // success
     		console.dir(user);
     	},
     	function(){ // failure
     		$scope.error = true;
     		$scope.login.username = "";
     		$scope.login.password = "";
     	}
     );
  };
});