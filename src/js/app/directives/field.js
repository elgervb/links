app.directive('field', function(){
  return {
    require: '^form', // require the parent form
    restrict: 'EA',
    scope: {
      name: '=',
      ngModel: '=',
      label: '=?'
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
    }
  };
});