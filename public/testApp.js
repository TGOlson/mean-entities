var app = angular.module('testApp', []);

app.controller('PeopleCtrl', function($scope, $http){

  $scope.sendNewPerson = function(){

    console.log('model:', $scope.newPerson);

    var newPerson = $scope.newPerson;

    $scope.newPerson = {};

    $http.post('/people', newPerson).success(function(res){

      if(res === 'success'){
        $scope.people.push(newPerson)
      }

    });
  };

  $http.get('/people').success(function(res){
    $scope.people = res;
  });

});