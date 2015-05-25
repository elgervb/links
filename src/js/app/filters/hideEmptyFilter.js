app.filter('hideEmpty', function() { 
  return function(object, query) {
    if (!query) {
      return {};
    } else {
      return object;
    }
  };
});