myApp.factory('AuthenticationFactory', function($window) {
  var auth = {
    isLogged: false,
    userRole: null,
    check: function() {
      if ($window.sessionStorage.token) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        delete this.user;
      }
    },
    getRole:function(){
      return this.userRole;
    }
  }

  return auth;
});

myApp.factory('UserAuthFactory', function($window, $location, $http, AuthenticationFactory) {
  return {
    login: function(username, password) {
      return $http.post('http://localhost:3000/login', {
        username: username,
        password: password
      });
    },
    logout: function() {

      if (AuthenticationFactory.isLogged) {
        AuthenticationFactory.isLogged = false;
        AuthenticationFactory.role = null;
        delete AuthenticationFactory.user;
        delete AuthenticationFactory.user.id;
        delete AuthenticationFactory.user.role;

        delete $window.sessionStorage.token;
        delete $window.sessionStorage.user;
        delete $window.sessionStorage.user.id;
        delete $window.sessionStorage.user.role;

        $location.path("/login");
      }

    }
  }
});

myApp.factory('TokenInterceptor', function($q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['X-Access-Token'] = $window.sessionStorage.token;
        config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },

    response: function(response) {
      return response || $q.when(response);
    }
  };
});
