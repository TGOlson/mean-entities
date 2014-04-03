var app = angular.module('testApp', ['ngRoute']);


app.controller('EntitiesCtrl', function($scope, $http){

  getEntities();

  $scope.filterType = '';
  
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



  $scope.showEntityDetails = function(entity) {

    var id = entity._id

    $http.get('/entities/' + id).success(function(res){
      console.log(res)
      if(res.error){
       
        console.log(res.error);
       
        $scope.entityDetails = {
          name: 'something failed',
          type: 'sorry'
        }
      } else {
        $scope.entityDetails = res; 
      }

    });

  }

});

app.controller('IdeasCtrl', function($scope, $http){

  $scope.showIdeas = function(entity){

    if($scope.showEntityIdeas){
      console.log('hiding ideas for', entity._id)
      $scope.showEntityIdeas = false;
    } else {
      console.log('showing ideas for', entity._id)
      $scope.showEntityIdeas = true;
    }

  }


});



app.controller('EntityCtrl', function($scope, $http, $routeParams){

});
