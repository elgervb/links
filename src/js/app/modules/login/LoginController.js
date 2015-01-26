
app.controller('LoginController', 
 function($scope, AuthService){

  $scope.pageClass = 'login-page';

  $scope.login = function(){
  	$scope.error = false;

    AuthService.login($scope.login.username, $scope.login.password)
    .then(
     	function(response){
     		if (response.status === 204){
     			$scope.error = true;
  	   		$scope.login.username = "";
  	   		$scope.login.password = "";
     			return;
     		}
     		var user = response.data;
     	},
     	function(response){
     		$scope.error = true;
     		$scope.login.username = "";
     		$scope.login.password = "";
     	}
     );
  }
});