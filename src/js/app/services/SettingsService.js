app.service('SettingsService', function() {

  var user = function(user) {
    if (user) {
      localStorage.setItem('links.user', angular.toJson(user));
      return user;
    } else {
      return angular.fromJson(localStorage.getItem('links.user'));
    }
  };

  return {
    user: user
  };
});