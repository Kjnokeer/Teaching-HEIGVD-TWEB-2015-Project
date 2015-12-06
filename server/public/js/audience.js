angular.module("AudienceApp", ['ui.router', 'chart.js', 'btford.socket-io' ]) // déclaration du module
.config(function($stateProvider) {
  $stateProvider.state('audience', {
    templateUrl: 'partials/audience/audience.html',
    url: '/audience'
  });

  $stateProvider.state('question', {
    templateUrl: 'partials/audience/question.html',
    url: '/question',
    params: {
      idPoll: 'idPoll',
      titlePoll: 'titlePoll'
    },
    controller: 'questionsController'
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

  mySocket.on('userNumber', function(data) {
    console.log(data);
  });
})
.controller('audienceController', function($scope, $http, $state) {

  $scope.poll = {
    number: '',
    pseudo: ''
  };

  $scope.audience = function() {

    $http.get('/api/polls/' + $scope.poll.number).then(function success(response) {
      $state.go("question", {
        idPoll: response.data._id,
        titlePoll: response.data.title
      });
    }, function error(response){
      console.log("error");
    });




  }
})
.controller('questionsController', function($stateParams, $http, $scope) {
  $http.get('/api/polls/' + $stateParams.idPoll + '/questions').then(function success(response) {
    $scope.poll.question = response.data[0];

    $http.get('/api/polls/' + $stateParams.idPoll + '/questions/' + $scope.poll.question._id + '/choices').then(function success(response) {
      $scope.poll.question.choices = response.data;
    }, function(error) {
      console.log("error");
    })

  }, function error(response){
    console.log("error");
  });

});
