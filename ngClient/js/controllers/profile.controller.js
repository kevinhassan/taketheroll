myApp.controller("ProfileCtrl", ['$scope','$location','StudentFactory',
    function($scope,$location,StudentFactory){

      StudentFactory.getStudents().then(function(data) {
        console.log(data);
      });
  }
]);
