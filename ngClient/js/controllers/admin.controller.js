myApp.controller("AdminCtrl", ['$scope','$location','AdminFactory',
    function($scope,$location,AdminFactory){
      $scope.role = "administrateur";
      $scope.possibilities = ["Créer/Modifier/Supprimer un utilisateur","Voir toutes les absences et retards de chacun des élèves", "Passer une absence ou un retard à justifié"];
  }
]);
