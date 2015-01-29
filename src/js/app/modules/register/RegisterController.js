
app.controller('RegisterController', 
 function($scope, $location, AuthService){

  $scope.pageClass = 'register-page';
  $scope.user = {};

  $scope.cancel = function(){
    $location.path('/');
  };
  $scope.register = function(){};
});