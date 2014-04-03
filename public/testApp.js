var app = angular.module('testApp', []);

app.controller('EntityCtrl', function($scope, $http){

  getEntities();
  
  $scope.sendNewEntity = function(){

    var newEntity = $scope.newEntity;

    $http.post('/entities', newEntity).success(function(res){
      
      if(res === 'success'){
        getEntities();
      }
    
    });
  
    $scope.newEntity = {};
  };

  function getEntities(){

    $http.get('/entities').success(function(res){
      $scope.entities = res;
    });

  }

});

app.controller('IdeaCtrl', function($scope){

  $scope.showIdeas = function(entity){
    console.log('showing ideas for', entity._id)

    if($scope.showEntityIdeas){
      $scope.showEntityIdeas = false;
    } else {
      $scope.showEntityIdeas = true;
    }

  }


});