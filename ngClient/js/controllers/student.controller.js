myApp.controller("StudentCtrl", ['$scope',
    function($scope){

      $scope.role = "étudiant";
      $scope.possibilities = ["Consulter ses absences et retards","Justifier ses absences et retards", "<em>...Ne pas rater de cours...</em>"];
    /*dataFactory.getProducts().then(function(data) {
      $scope.products = data.data.students;
    });*/
  }
]);
