myApp.controller("StudentCtrl", ['$scope','$location','StudentFactory',
    function($scope,$location,StudentFactory){
      $scope.role = "étudiant";
      $scope.actor = "student";
      $scope.possibilities = ["Consulter vos absences et retards","Fournir un justificatif", "Etre plus assidu..."];

      $scope.student = {};
      StudentFactory.getStudents().then(function(data) {
        $scope.students = data.data.students;
      });
      $scope.getStudent = function(data){
        $scope.student = data;
        $location.url('admin/students/'+data.id_Student);
        return data;
      };
      $scope.estStudent = function(){
        return true;
      }
    }
    /*$scope.listStudent = function(){
      //Get sur la liste des étudiants
    }
    $scope.register = function() {
      //Récupérer le formulaire (get)
      //Envoyer le formulaire(post)
    }*/
]);
