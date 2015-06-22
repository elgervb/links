
app.controller('AddController', function($scope, $location, LinksService) {
  var args = $location.search();

  $scope.pageClass = 'add-page';
  $scope.link = {};
  $scope.link.ispublic = 1; // Enable by default

  // Check for args...
  if (args.title) {
    $scope.link.title = args.title;
  }
  if (args.url) {
    $scope.link.url = args.url;
  }

  $scope.submit = function() {
    console.dir($scope.link);

    LinksService.addLink($scope.link).then(function() {
      /* 
       * When adding through the bookmarklet, then go back to the page the user came from, 
       * otherwise just go to the home page
       */
       console.log('Referrer: ' + document.referrer);
      if (args.title && args.url) {
        location.href = args.url;
      } else {
        $location.path('/');
      }
      
    }, function(msg) {
      msg = msg || 'Session expired';
      alert(msg);
    });
  };

  $scope.cancel = function() {
    $location.path('/');
  };

  $scope.addTag = function(tag) {

    if (!tag) {return;}

    $scope.link = $scope.link || {};
    $scope.link.tags = $scope.link.tags || [];

    // Prevent dupes
    if ($scope.link.tags.indexOf(tag) === -1) {
      $scope.link.tags.push(tag.toLowerCase());
      $scope.tag = '';
    }
  
  };

  $scope.addTagWithKey = function(tag, $event) {

    if ($event.which === 13) {
      $scope.addTag(tag);
      $event.preventDefault();
    }
  };
});