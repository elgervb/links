/**
 * NG filter to show all HTML content.
 *
 * USAGE:
 * <p ng-bind-html="htmlContent | htmlFilter"></p>
 */
app.filter('htmlFilter', function($sce) {
  return function(val) {
    return $sce.trustAsHtml(val);
  };
});