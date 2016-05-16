
myApp.factory('StudentFactory', function($http) {

  var _students = {};
  _students.getStudents = function() {
    var url = 'http://localhost:3000/api/admin/students';
    return $http.get(url);
  };
  return _students;
});
