myApp.factory('CourseFactory', function($http) {

  var _courses = {};
  _courses.getCourses = function(actor) {
    var url = 'http://localhost:3000/api/'+actor+'/courses';
    return $http.get(url);
  };
  return courses;
});
