
app.controller('LinksController', 
  function($scope, $timeout, LinksService, SettingsService){

    // init page css class
    $scope.pageClass = 'links-page';
    // init search from localStorage (if any)
    $scope.searchLinks = localStorage.getItem('local.links.search');
    $scope.user = SettingsService.user();

    loadLinks();

    /**
     * Redirect to the url of the link provided
     */
    $scope.redirect = function(link){
      $timeout(function(){
        LinksService.incrementCount(link).then(function(response){
          console.dir(response.data);
        }, function(msg){
          msg = msg || "Session expired";
          alert(msg);
        });
      });
      window.open(link.url, '_blank').focus();
    };

    /**
     * Returns all tags as an array
     */
    $scope.getTags = function(tags){
      console.log('get tags');
      if (tags){
        return tags.split(';');
      } 
    };

    /**
     * Search on tags when clicking one
     */
    $scope.clickTag = function(tag, $event){
      $event.preventDefault();
      $event.stopImmediatePropagation();
      $scope.searchLinks = tag;
    };

    /**
     * Some actions for keypress events
     * - ESC key: clear the search box and focus it
     * - CTRL + f: foxus the search box
     */ 
    $scope.onKeyPress = function($event){
      
      // clear & focus search box 
      if ($event.keyCode === 27){ // esc key
        $scope.searchLinks = "";
        document.querySelector('.search-links').focus();
      }
      // focus search box
      else if($event.ctrlKey && $event.key === "f"){
        document.querySelector('.search-links').focus();
        document.querySelector('.search-links').select();
        $event.preventDefault();
        $event.stopImmediatePropagation();
      }

    };

    // Watch the search box and presist the last search value
    $scope.$watch('searchLinks',function(newValue, oldValue){
      if (newValue !== oldValue){
        localStorage.setItem('local.links.search', newValue);
      }
    });

    /**
     * Load all links from the LinksService
     */
    function loadLinks(){
       // get links and sort them by title
      LinksService.getLinks().then(function(links){
        if (angular.isArray(links)){
          $scope.links = links.sort(function compare(a,b) {
              if (a.title < b.title){
                 return -1;
              }
              if (a.title > b.title){
                return 1;
              }
              return 0;
            });
        }
      });
    }
});