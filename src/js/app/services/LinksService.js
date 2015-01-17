/**
 * Service to access links
 */
app.service('LinksService', function($http, $q){
  var baseUrl = 'http://localhost/git/REST-api/',
  addLink = function(link){

    var links = JSON.parse( localStorage.getItem('local::links') );
    links.push(link);
    link.guid = createGUID();
    link.timestamp = new Date().getTime();
    
    save(links);

    var request = $http({
      method: "POST",
      url: baseUrl + 'links',
      data: link
    });
    return( request.then( handleSuccess, handleError ) );
  },
  createGUID = function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  },
  /**
   * Returns all links as a promise
   * 
   * @return Promise with links
   */ 
  getLinks = function(){
    if (localStorage.getItem('local::links')){
      console.log("Returning links from local storage");
      return $q(function(resolve, reject) {
        resolve( JSON.parse( localStorage.getItem('local::links') ) ) ;
      });
    }
    
    console.log("Returning links from server");
    var request = $http({
      method: "GET",
      url: baseUrl + 'links'
    });
    return( request.then( handleSuccess, handleError ) );
  },
  getIndex = function(links, guid){
    // get this index of the link
    if (links && links.length > 0){
      for (var i=0;i<links.length;i++){
        if (links[i].guid === guid){
          return i;
        }
      }
    }
    return -1;
  },
  reset = function(){
    localStorage.removeItem('local::links');
  },
  save = function(links){
    reset();
    localStorage.setItem('local::links', JSON.stringify( links ) );
  },
  update = function(link){
    var links = JSON.parse( localStorage.getItem('local::links') ),
    index = getIndex(links, link.guid);
    
    links[index] = link;
    save(links);
  };

  // public API
  return ({
    addLink       : addLink,
    getLinks      : getLinks,
    update        : update,
    reset         : reset,
    save          : save
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
