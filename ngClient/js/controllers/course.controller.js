myApp.controller("CourseCtrl", ['$scope','$location','CourseFactory',
    function($scope,$location,CourseFactory,role){
      $scope.courses = {};
      CourseFactory.getCourses().then(function(data) {
        $scope.courses = data;
      });
  }
]);
