app.filter('linksFilter', function() {
  return function(links, query) {
    var regex = new RegExp(query, 'i'),
    props = ['title', 'url', 'tags'],
    i;
    
    if (angular.isArray(links)) {
      return links.filter(function(link) {
        for (i in props) {
          if (regex.test(link[props[i]])) {
            return link;
          }
        }
        
      });
    } else {
      return links;
    }
  };
});