/**
 * Service to access links
 */
app.service('LinksService', function($http, $q){

  
  var addLink = function(link){

    var links = JSON.parse( localStorage.getItem('local::links') );
    links.push(link);

    localStorage.setItem('local::links', JSON.stringify( links ) );

    var request = $http({
      method: "post",
      url: 'server/links/add',
      data: link
    });
    return( request.then( handleSuccess, handleError ) );
  },
   getLinks = function(){

    if (localStorage.getItem('local::links')){
      console.log("Returning links from local storage");
      return $q(function(resolve, reject) {
        resolve( JSON.parse( localStorage.getItem('local::links') ) ) ;
      });
    }
    
    console.log("Returning links from server");
    var request = $http({
      method: "get",
      url: 'assets/js/app/modules/links/links.json'
    });
    return( request.then( handleSuccess, handleError ) );

  };

  // public API
  return ({
    getLinks : getLinks,
    addLink  : addLink
  });
  
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
