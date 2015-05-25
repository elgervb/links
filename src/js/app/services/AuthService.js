/**
 * Auth service
 */
app.service('AuthService', function($http, $q, baseUrl) {

  var login = function(username, password) {
    return $http({
      method: 'POST',
      url: baseUrl + '/user/login',
      withCredentials: true,
      data: {
        username: username,
        password: password
      }
    }).then(function(response) {
      // Login is OK, return the user in JSON format
      if (response.status === 200) {
        return response.data;
      }
      return $q.reject();
    }, function(response) {
      return $q.reject();
    });
  };

  return {
    login: login
  };
});