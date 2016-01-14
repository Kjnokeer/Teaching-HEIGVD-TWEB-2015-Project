angular.module("AudienceApp", ['ui.router', 'chart.js', 'btford.socket-io' ]) // déclaration du module
.config(function($stateProvider) {

  $stateProvider.state('audience', {
    templateUrl: 'partials/audience/audience.html',
    url: '/audience',
    controller: 'audienceController'
  });

  $stateProvider.state('audience2', {
    templateUrl: 'partials/audience/audience.html',
    url: '/audience/:pollNr',
    params: {
      pollNr: 'pollNr'
    },
    controller: 'audienceController'
  });

  $stateProvider.state('question', {
    templateUrl: 'partials/audience/question.html',
    url: '/question/:idPoll',
    params: {
      idPoll: 'idPoll',
      titlePoll: 'titlePoll'
    },
    controller: 'questionsController'
  });

  // Not used yet...
  $stateProvider.state('questionOpen', {
    templateUrl: 'partials/audience/questionOpen.html',
    url: '/question',
    params: {
      idPoll: 'idPoll',
      titlePoll: 'titlePoll'
    },
    controller: 'questionsController'
  });

  // Not used yet...
  $stateProvider.state('questionMultiple', {
    templateUrl: 'partials/audience/questionMultiple.html',
    url: '/question',
    params: {
      idPoll: 'idPoll',
      titlePoll: 'titlePoll'
    },
    controller: 'questionsController'
  });

  $stateProvider.state('end', {
    templateUrl: 'partials/audience/end.html',
    url: '/end'
  });

  $stateProvider.state('error', {
      templateUrl: 'partials/audience/error.html',
      url: '/error'
   });

})
.factory('mySocket',	function	(socketFactory)	{
  return	socketFactory();
})
.controller('socket.io.controller',	function	($scope, mySocket)	{

  // permet de setter le titre de la page
  $scope.title = "audience";

  mySocket.on('userNumber', function(data) {
    console.log(data);
  });
})
.controller('audienceController', function($scope, $http, $state, $stateParams) {
  
  //  $scope.pollNr = "";
  
  //$scope.pollNr = $stateParams.pollNr;

  //$state.go("audience2", $scope.pollNr);

  $scope.poll = {
    number: $stateParams.pollNr,
    pseudo: '',
    questions: []
  };

  $scope.errorMsg = "";

  // Retreive poll informations
  $scope.audience = function() {

    $http.get('/api/polls/' + $scope.poll.number).then(function success(response) {


      if(response.data.state === "closed"){
        $scope.errorMsg = "Error, this poll is closed.";
        $state.go("error");
        return;
      }

      $state.go("question", {
        idPoll: response.data._id,
        titlePoll: response.data.title
      });
    }, function error(response){
      $scope.errorMsg = "Error, this poll doesn't exist !";
      $state.go("error");
      console.log("error");
    });

  }
})
.controller('questionsController', function($stateParams, $http, $scope, $state) {

  $scope.indexQuestion = -1;
  $scope.currentQuestion = "";

  $scope.buttonContent = "Next question";

  // Retreive questions
  $http.get('/api/polls/' + $stateParams.idPoll + '/questions').then(function success(response) {
    $scope.poll.questions = response.data;

    console.log($scope.poll.questions);

    $scope.nextQuestion();

  }, function error(response){
    $scope.errorMsg = "Error !";
    console.log("error");
  });

  $scope.nextQuestion = function(){

    if($scope.indexQuestion >= 0) {
      console.log($stateParams.idPoll);
      console.log($scope.indexQuestion);
      console.log($scope.poll.questions);
      $http.post('/api/polls/' + $stateParams.idPoll + '/questions/' + $scope.poll.questions[$scope.indexQuestion]._id + '/answers', {
        pseudo: $scope.poll.pseudo,
        choiceId: $scope.currentQuestion.choice
      }).then(function success(response) {
        console.log(response);
      }, function error(response) {
        console.log("error");
      })
    }


    $scope.indexQuestion++;

    if($scope.indexQuestion == $scope.poll.questions.length){
      $state.go('end');
      return;
    }

    $http.get('/api/polls/' + $stateParams.idPoll + '/questions/' + $scope.poll.questions[$scope.indexQuestion]._id + '/choices').then(function success(response) {

      if($scope.indexQuestion == $scope.poll.questions.length - 1){
        $scope.buttonContent = "Finish";
      }

      $scope.currentQuestion = $scope.poll.questions[$scope.indexQuestion];
      $scope.poll.questions[$scope.indexQuestion].choices = response.data;

    }, function(error) {
      $scope.errorMsg = "Error !";
      console.log("error");
    });
  }

});
