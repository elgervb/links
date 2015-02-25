/**
 * Validates that 2 models are equal.
 *
 * Use it as follows:
 *
 * <input type="text" name="password" equals-validator="{{passwordretype}}" />
 * <input type="text" name="passwordretype" />
 * 
 * <div ng-show="form.$submitted ||  (form.password.$touched && form.passwordretype.$touched)">
 *   <span ng-show="form.password.$error.equalsValidator">Passwords did not match.</span>
 * </div>
 */
app.directive('equalsValidator', [
  function() {

    var link = function($scope, $element, $attrs, ctrl) {

      var validate = function(viewValue) {
        var comparisonModel = $attrs.equalsValidator;
        
        if(!viewValue || !comparisonModel){
          // It's valid because we have nothing to compare against
          ctrl.$setValidity('equalsValidator', true);
          return viewValue;
        }

        // It's valid if model is equal to the model we're comparing against
        ctrl.$setValidity('equalsValidator', viewValue == comparisonModel );
        return viewValue;
      };

      ctrl.$parsers.unshift(validate);
      ctrl.$formatters.push(validate);

      $attrs.$observe('equalsValidator', function(comparisonModel){
        return validate(ctrl.$viewValue);
      });
      
    };

    return {
      require: 'ngModel',
      link: link
    };

  }
]);