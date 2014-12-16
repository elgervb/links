app.service('LinksService', function($http, $q){

  var getLinks = function(){

    // TODO find a way to merge the 2 promises
    var local = getLocalLinks();
    if (local){return local;}

    console.log("Returning links from server");
    var request = $http({
      method: "get",
      url: 'assets/js/app/modules/links/links.json'
    });
    return( request.then( handleSuccess, handleError ) );
  },
  addLink = function(link){
    var request = $http({
      method: "post",
      url: 'server/links/add',
      data: link
    });
    return( request.then( handleSuccess, handleError ) );
  };

  // public API
  return ({
    getLinks : getLinks,
    addLink  : addLink
  });

  function getLocalLinks(){
    if (localStorage.getItem('local::links')){
      console.log("Returning links from local storage");
      return $q(function(resolve, reject) {
        resolve( JSON.parse( localStorage.getItem('local::links') ) ) ;
      });
    }
  }
  
  /**
   * Handle success
   */
  function handleSuccess( response ) {
    localStorage.setItem('local::links', JSON.stringify( response.data ) );
    return( response.data );
  }

  function handleError( response ) {
    // The API response from the server should be returned in a
    // nomralized format. However, if the request was not handled by the
    // server (or what not handles properly - ex. server error), then we
    // may have to normalize it on our end, as best we can.
    if (
      ! angular.isObject( response.data ) ||
      ! response.data.message
    ) {
      return( $q.reject( "An unknown error occurred." ) );
    }
    // Otherwise, use expected error message.
    return( $q.reject( response.data.message ) );
  }  
});
