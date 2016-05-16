/*myApp.factory('AdminFactory', function($http,api_link) {

  var urlBase = api_link+"/admin/";
  var admin = {};

  admin.getAllStudent = function(){
    return $http.get(urlBase+"students/");
  }
  admin.getOneStudent = function(){
    return $http.get(urlBase+"students/:idStudent");
  }
  admin.getAllAbsence = function() {
    return $http.get(urlBase+"");
  };
  admin.getOneAbsence = function(){
    return $http.get(api_link+"/:id");
  }
  admin.register = function($scope){
    return $http.post(api_link+"register");
  }

  return admin;
});*/
myApp.factory('AdminFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/admin';
    var dataFactory = {};

    return dataFactory;
}]);
