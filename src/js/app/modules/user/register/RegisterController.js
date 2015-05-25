
app.controller('RegisterController',  function($scope, $location, UserService) {

  $scope.pageClass = 'register-page';
  $scope.user = {};

  $scope.cancel = function() {
    $location.path('/');
  };

  $scope.register = function() {
    UserService.register($scope.user)
    .then(function(data) {
      $scope.registered = true;
    }, function(msg) {
      $scope.error = msg;
    });
  };

  $scope.submitActivation = function(activationCode) {
    $scope.isSubmitting = true;
    UserService.activate(activationCode).then(
      function() {
        // Redirect to login form
        $location.path('/login');
      }, 
      function(msg) {
        $scope.activationerror = msg || 'Activation code not found';
        $scope.isSubmitting = false;
        $scope.activationCode = null;
      });
  };
});