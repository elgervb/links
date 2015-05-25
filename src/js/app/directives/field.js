app.directive('field', function() {
  return {
    require: '^form', // Require the parent form
    restrict: 'EA',
    scope: {
      name: '=',
      ngModel: '=',
      label: '=?',
    },
    templateUrl: function(element, attrs) {
      return 'assets/js/app/directives/field.' + attrs.type + '.html';
    },
    link: function(scope, element, attrs, formCtrl) {

      scope.form = formCtrl;
      scope.label = scope.label || scope.name;

      if (!element.hasClass('field')) {
        element.addClass('field');
      }

      if (attrs.required) {
        scope.required = 'required';
      }

      // TODO let's find another way of doing this... for now, proceed
      if (attrs.type === 'collection') {

        scope.addItem = function(item) {

          if (!item) {return;}

          scope.ngModel = scope.ngModel || [];

          // Prevent dupes
          if (scope.ngModel.indexOf(item) === -1) {
            scope.ngModel.push(item.toLowerCase());
            scope.item = '';
          }
        
        };

        scope.addItemOnKeyPress = function(item, $event) {

          if ($event.which === 13) {
            scope.addItem(item);
            $event.preventDefault();
          }

        };

        scope.removeItem = function(item) {
          var index = scope.ngModel.indexOf(item);

          if (index > -1) {
            scope.ngModel.splice(index, 1);
            formCtrl.$setDirty();
          }
        };

      }
    }
  };
});