angular.module("AudienceApp", ['ui.router', 'chart.js', 'btford.socket-io' ]) // déclaration du module
.config(function($stateProvider) {

  // Main state
  $stateProvider.state('audience', {
    templateUrl: 'partials/audience/audience.html',
    url: '/audience',
    controller: 'audienceController'
  });

  // Main state with pollNr pre-filled
  $stateProvider.state('audience2', {
    templateUrl: 'partials/audience/audience.html',
    url: '/audience/:pollNr',
    params: {
      pollNr: 'pollNr'
    },
    controller: 'audienceController'
  });

  // State used to display unique choice questions (radio button)
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
  // State used to display open questions (field)
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
  // State used to display multiple questions (checkbox)
  $stateProvider.state('questionMultiple', {
    templateUrl: 'partials/audience/questionMultiple.html',
    url: '/question',
    params: {
      idPoll: 'idPoll',
      titlePoll: 'titlePoll'
    },
    controller: 'questionsController'
  });

  // State used at the end of the poll
  $stateProvider.state('end', {
    templateUrl: 'partials/audience/end.html',
    url: '/end'
  });

  // State used in differents cases of error
  $stateProvider.state('error', {
      templateUrl: 'partials/audience/error.html',
      url: '/error',
      params: {
        errorMsg : 'undefined error'
      },
      controller : 'errorController'
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
// Entry point when the user start the poll
.controller('audienceController', function($scope, $http, $state, $stateParams) {

  $scope.poll = {
    number: $stateParams.pollNr,
    pseudo: '',
    questions: []
  };

  // Retreive poll informations
  $scope.startPoll = function() {

    if($scope.poll.number === "pollNr" || $scope.poll.number === ""){ 
      $state.go("error", {errorMsg : "Error, you must provide a correct poll number."});
      console.log("[error] no poll nr");
    }

    $http.get('/api/polls/' + $scope.poll.number).then(function success(response) {

      if(response.data.state === "closed"){
        $state.go("error", {errorMsg : "Error, this poll is closed."});
        console.log("[error] poll closed");
        return;
      }

      $state.go("question", {
        idPoll: response.data._id,
        titlePoll: response.data.title
      });
    }, function error(response){
      $state.go("error", {errorMsg : "Error, this poll doesn't exist !"});
      console.log("[error] impossible to retreive poll");
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

    // Get the first question
    $scope.getQuestion();

  }, function error(response){
    $scope.errorMsg = "Error !";
    $state.go("error", {errorMsg : "Error, the poll as been deleted !"});
    console.log("[error] unable to retreive questions");
  });

  // Is called to display the first question and when user click on the "Next" button
  $scope.getQuestion = function(){

    // Post answers given for the previous question (unless if it's the first)
    if($scope.indexQuestion >= 0) {
      
      $http.post('/api/polls/' + $stateParams.idPoll + '/questions/' + $scope.poll.questions[$scope.indexQuestion]._id + '/answers', {
        pseudo: $scope.poll.pseudo,
        choiceId: $scope.currentQuestion.choice
      }).then(function success(response) {
        console.log(response);
      }, function error(response) {
        console.log("[error] undefined");
      })
    }

    $scope.indexQuestion++;

    // Finish poll if the end is reached
    if($scope.indexQuestion == $scope.poll.questions.length){
      $state.go('end');
      return;
    }

    // Retreive choice for the current question
    $http.get('/api/polls/' + $stateParams.idPoll + '/questions/' + $scope.poll.questions[$scope.indexQuestion]._id + '/choices').then(function success(response) {
      $scope.currentQuestion = $scope.poll.questions[$scope.indexQuestion];
      $scope.poll.questions[$scope.indexQuestion].choices = response.data;

      // If it's the last question, change the label of the button "Next" to "Finish"
      if($scope.indexQuestion == $scope.poll.questions.length - 1){
        $scope.buttonContent = "Finish";
      }

    }, function(error) {
      $state.go("error", {errorMsg : "Error !"});
      console.log("[error] problem retreiving choices for the question");
    });
  }

})
.controller('errorController', function($stateParams, $http, $scope, $state) {
  $scope.errorMsg = $stateParams.errorMsg;
});
