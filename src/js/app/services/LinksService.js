// http://www.bennadel.com/blog/2612-using-the-http-service-in-angularjs-to-make-ajax-requests.htm
app.service('LinksService', function($http, $q){
  // public API
  return ({
    getLinks : getLinks
  });

  function getLinks(){

    var request = $http({
      method: "get",
      url: 'assets/js/app/modules/links/links.json'
    });
    return( request.then( handleSuccess, handleError ) );
  };
  
  function handleSuccess( response ) {
    return( response.data.sort(function compare(a,b) {
          if (a.title < b.title)
             return -1;
          if (a.title > b.title)
            return 1;
          return 0;
        }) );
  };

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