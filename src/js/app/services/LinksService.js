/**
 * Service to access links
 */
app.service('LinksService', function($http, $q, baseUrl, SettingsService, StorageService){

  /**
   * Stores a link
   * @return Promise with the newly added link
   */
  var store = StorageService.create('local::links'),
  addLink = function(link){

    var links = store.get() || [];

    // check for login
    if (SettingsService.user()){
      var request = $http({
        method: "POST",
        url: baseUrl + SettingsService.user().username + '/links',
        withCredentials: true,
        data: link
      });
      return( request.then( function( response ) {

        // save the just added link
        links.push(response.data);
        save(links);

        return( response.data );
      }, handleError ) );
    }
    else{
      // save the just added link
      links.push(link);
      save(links);
      return $q(function(resolve, reject) {
        resolve( link ) ;
      });
    }
  },
  incrementCount = function(link){
    if (!link.count){
      link.count = 0;
    }
    link.count++;
    var request = $http({
        method: "PATCH",
        withCredentials: true,
        url: baseUrl + SettingsService.user().username + '/links/' + link.guid,
        data: {
          count: link.count
        }
    });

     return request.then(function(response){
        update(response.data);
     }, handleError);
  },
  /**
   * Returns all links as a promise
   * 
   * @return Promise with links
   */ 
  getLinks = function(){
    if (store.get()){
      console.log("Returning links from local storage");
      return $q(function(resolve, reject) {
        resolve( store.get() ) ;
      });
    }
    
    // check for login
    if (SettingsService.user()){
      console.log("Returning links from server");
      var request = $http({
        method: "GET",
        withCredentials: true,
        url: baseUrl + SettingsService.user().username + '/links'
      });
      return( request.then( function(response){
        // store in localStorage
        save(response.data);
        return response.data;
      }, handleError ) );
      }
    else{
      return $q(function(resolve, reject) {
        resolve(  ) ; // no links present
      });
    }
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
    store.remove();
  },
  save = function(links){
    reset();
    store.set( links );
  },
  update = function(link){

    console.log("updating link with guid: " + link.guid);

    var links = store.get(),
    index = getIndex(links, link.guid);
    
    links[index] = link;
    save(links);
  };

  // public API
  return ({
    incrementCount: incrementCount,
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
