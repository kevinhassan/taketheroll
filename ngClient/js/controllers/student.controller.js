myApp.controller("StudentCtrl", ['$scope','$location','StudentFactory',
    function($scope,$location,StudentFactory){
      $scope.role = "administrateur";
      $scope.possibilities = ["Créer/Modifier/Supprimer un utilisateur","Voir toutes les absences et retards de chacun des élèves", "Passer une absence ou un retard à justifié"];

      StudentFactory.getStudents().then(function(data) {
        $scope.students = data.data.students;
      });
    }
    /*$scope.listStudent = function(){
      //Get sur la liste des étudiants
    }
    $scope.register = function() {
      //Récupérer le formulaire (get)
      //Envoyer le formulaire(post)
    }*/
]);
