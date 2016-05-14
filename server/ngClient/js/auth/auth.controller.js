myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
  function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {

    $scope.login = function() {

      var username = $scope.username,
        password = $scope.password;

      if (username !== undefined && password !== undefined) {
        UserAuthFactory.login(username, password).success(function(data) {
          var role = data.token.user.role;
          AuthenticationFactory.isLogged = true;
          AuthenticationFactory.userRole = role;
          $window.sessionStorage.token = data.token.token;
          //On répartie les pages d'accueil en fonction des rôles
          if(role == 'administrator'){
            $location.path("/admin");
          }
          else if(role == 'student'){
            $location.path("/student");
          }
          else if(role == 'teacher'){
            $location.path("/teacher");
          }
        }).error(function(response) {
            alert(response.message);
        });
      } else {
        alert('Merci de renseigner les champs.');
      }

    };

  }
]);
