
app.controller('SettingsController', 
 function($scope, $location, LinksService){

  $scope.pageClass = 'settings-page';

  $scope.export = function(){
  	// Get links through the links service
	  LinksService.getLinks().then(function(links){
	  	$scope.exportData = links;
	  });
  };

  $scope.import = function(){
	// TODO error handling...
	if ($scope.exportData){
		LinksService.save($scope.exportData);

		$scope.clear();

		$location.path('/');
	}

  };

  $scope.clear = function(){
  	$scope.exportData = undefined;
  };
  

});