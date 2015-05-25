
app.controller('LoginController', function($scope, $location, AuthService, SettingsService) {

  $scope.pageClass = 'login-page';

  $scope.cancel = function() {
    $location.path('/');
  };

  $scope.login = function() {
    $scope.error = false;

    AuthService.login($scope.login.username, $scope.login.password)
    .then(
      function(user) { // Success
        console.dir(user);
        SettingsService.user(user);
        $location.path('/');
      },
      function() { // Failure
        $scope.error = true;
        $scope.login.username = '';
        $scope.login.password = '';
      }
    );
  };
});