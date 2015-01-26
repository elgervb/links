/**
 * Auth service
 */
 app.service('AuthService', 
 	function($http, baseUrl){

 	var login = function(username, password){
		return $http({
	      method: "POST",
	      url: baseUrl+ '/user/login',
	      withCredentials: true,
	      data: {
	      	username: username,
	       	password: password
	      }
	    })
 	};

 	return {
 		login : login
 	}

 });