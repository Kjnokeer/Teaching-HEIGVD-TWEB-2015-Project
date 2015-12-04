angular.module("AudienceApp", ['ui.router', 'chart.js', 'btford.socket-io' ]) // déclaration du module
.config(function($stateProvider) {
  $stateProvider.state('audience', {
    templateUrl: 'partials/audience/audience.html',
    url: '/audience'
  });

  $stateProvider.state('question', {
    templateUrl: 'partials/audience/question.html',
    url: '/question'
  });
})
.factory('mySocket',	function	(socketFactory)	{	
	return	socketFactory();	
})
.controller('socket.io.controller',	function	($scope, mySocket)	{	

  // permet de setter le titre de la page
  $scope.title = "audience";

  // permet de gerer l'affichage du camanbert
  $scope.labels = ["Yes", "No", "I don't know"];
  $scope.data = [0, 0, 0];
  // cam

  mySocket.on('userNumber', function(data){
    console.log(data);
  }); 
})
.controller('audienceController', function($scope, $http, $state){
  $scope.audience = function(){
    //$scope.pseudo

      $http.post('/audience', $scope.pseudo).then(success, error);

    function success(response) {
      console.log("success");
      $state.go("question");
    }

    function error(response){
      console.log("error");
    }
  }
});
