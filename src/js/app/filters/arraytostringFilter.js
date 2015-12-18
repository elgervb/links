/* global angular, app */
app.filter('arraytostring', function() { 
  return function(array, separator) {
   if (angular.isArray(array)) {
     if (array.length === 0) {
       return "";
     }
     
     var result =  "";
     
     for (var i in array.length) {
       if (angular.isString(array[i])){
         result += array[i];
         if (i < array.length) {
           result += separator;
         }
       }
     }
     
     return result;
   }
   
   return array;
  };
});
