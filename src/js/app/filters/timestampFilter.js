app.filter('timestampFilter', function() { 
  return function(object, query) {

    // Make sure we have a 13 digit timestamp
    if ((object + '').length < 13) {
      var length = (object + '').length;
      for (var i = 0; i < 13 - length; i++) {
        object += '0';
      }
    }

    var result, date = new Date();
    date.setTime(object);
    result = date.getFullYear();
    result += '-' + date.getMonth();
    result += '-' + date.getDate();
    result += ' ' + date.getHours();
    result += ':' + date.getMinutes();
    return result;
  };
});