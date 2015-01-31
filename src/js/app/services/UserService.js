/**
 * Auth service
 */
 app.service('UserService', 
 	function($http, $q, baseUrl){

 	var register = function(user){
		return $http({
	      method: "POST",
	      url: baseUrl+ '/user/register',
	      withCredentials: true,
	      data: user
	    }).then(function(response){
	    	// login is OK, return the user in JSON format
	    	if (response.status === 200){
	    		return response.data;
	    	}
	    	return $q.reject(response.data.message);
	    }, function(response){
	    	return $q.reject(response.data.message);
	    });
 	};

 	return {
 		register : register
 	};

 });