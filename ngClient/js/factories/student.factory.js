
myApp.factory('StudentFactory', function($http) {
  /** https://docs.angularjs.org/guide/providers **/
  var _students = {};
  var id = 0;
  _students.getStudents = function() {
    var url = 'http://localhost:3000/api/admin/students';
    return $http.get(url);
  };
  if(id != undefined){
    _students.getStudent = function(id){
      var url = 'http://localhost:3000/api/admin/students/'+id;
      return $http.get(url);
  }
}

  return _students;
});
