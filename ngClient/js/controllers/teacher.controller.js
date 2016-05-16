myApp.controller("TeacherCtrl", ['$scope','$location',
    function($scope,$location){
      $scope.role = "professeur";
      $scope.actor = "teacher";
      $scope.possibilities = ["Consulter les cours","Afficher les élèves du cours", "Faire l'appel"];

      $scope.estTeacher = function(){
        return true;
      };
    }
]);
