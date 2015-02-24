app.directive('field', function(){
  return {
    require: '^form', // require the parent form
    restrict: 'EA',
    scope: {
      name: '=',
      ngModel: '=',
      label: '=?',
    },
    templateUrl: function(element, attrs){
      return 'assets/js/app/directives/field.'+attrs.type+'.html';
    },
    link: function(scope, element, attrs, formCtrl){

      scope.form = formCtrl;
      scope.label = scope.label || scope.name;

      if(!element.hasClass('field')){
        element.addClass('field');
      }

      if (attrs.required){
        scope.required = "required";
      }

      // TODO let's find another way of doing this... for now, proceed
      if (attrs.type === 'collection'){

        scope.addItem = function(item){

          if (!item){return;}

          scope.ngModel = scope.ngModel || {};
          scope.ngModel.items = scope.ngModel.items || [];

          // prevent dupes
          if (scope.ngModel.items.indexOf(item) === -1){
            scope.ngModel.items.push(item.toLowerCase());
            scope.item = "";
          }
        
        };

        scope.addItemOnKeyPress = function(item, $event){

          if ($event.which === 13){
            scope.addItem(item);
            $event.preventDefault();
          }

        };

      }
    }
  };
});