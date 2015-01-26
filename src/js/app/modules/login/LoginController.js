
app.controller('LoginController', 
 function($scope, $timeout, $http){

  $scope.pageClass = 'login-page';

  $scope.login = function(){
  	$scope.error = false;

	// TODO create service for login 
  	var url = 'http://localhost/git/REST-api/user/login';

  	$http({
      method: "POST",
      url: url,
      withCredentials: true,
      data: {
      	username: $scope.login.username,
      	password: $scope.login.password
      }
    })
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