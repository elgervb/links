app.filter('timestampFilter', function() { 
  return function(object, query) {
    if (angular.isNumber(object)) {
      var result, date = new Date(object);
      result = date.getFullYear();
      result += '-' + date.getMonth();
      result += '-' + date.getDate();
      result += ' ' + date.getHours();
      result += ':' + date.getMinutes();
      return result;
    }
    return object;
  };
});