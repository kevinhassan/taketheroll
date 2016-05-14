myApp.controller("AdminCtrl", ['$scope',
    function($scope){

      $scope.role = "administrateur";
      $scope.possibilities = ["Créer/Modifier/Supprimer un utilisateur","Voir toutes les absences et retards de chacun des élèves", "Passer une absence ou un retard à justifié"];
    /*dataFactory.getProducts().then(function(data) {
      $scope.products = data.data.students;
    });*/
  }
]);
