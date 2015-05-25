app.directive('contenteditable', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      // View -> model
      elm.on('blur', function() {
        scope.$apply(function() {
          ctrl.$setViewValue(elm.html());
        });
      });

      // Model -> view
      ctrl.$render = function() {
        elm.html(ctrl.$viewValue);
      };

      // :oad init value from DOM
      ctrl.$setViewValue(elm.html());
    }
  };
});