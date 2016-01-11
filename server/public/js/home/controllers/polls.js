app.controller('PollsCtrl', function($scope, $http, $state, $q) {

   $scope.labels = [];
   $scope.data = [];

   $scope.loadPolls = function() {
      $http.get("/user/polls").then(function(response) {
         $scope.polls = response.data;
      });
   }

   $scope.deletePoll = function(id) {
      var result = confirm('Are you sure you want to delete this poll ?');

      if (result) {
         $http.delete('/api/polls/' + id)
            .success(function(data) {
               $scope.error = "error " + data;
            });

         $http.get("/user/polls").then(function(response) {
            $scope.polls = response.data;
         });
      }
   }

   $scope.showPollDetails = function(id) {
      $state.go('pollDetails', {
         pollId: id
      });
   }

   $scope.submitPoll = function() {
      $http.post('/user/polls/', {
         title: $scope.title,
         state: $scope.state
      }).then(function(response) {
         $state.go('createQuestion', {
            pollId: response.data._id
         });
      });
   }

   $scope.finish = function() {
      $state.go('polls');
   }

   $scope.submitQuestion = function(pollId) {

      $http.post('/api/polls/' + pollId + '/questions', {
         title: $scope.title,
         type: 'choice'
      }).then(function(response) {
         var i = 1;
         while (true) {
            if (!$scope['choice' + i])
               break;

            $http.post('/api/polls//questions/' + response.data._id + '/choices', {
               key: 'key',
               text: $scope['choice' + i]
            });

            i++;
         }
         if ($scope.finish === true)
            $state.go('polls');
         else
            $state.go($state.current, {
               pollId: pollId
            }, {
               reload: true
            });
      });
   }

   $scope.showStatistics = function(pollId) {
      $state.go('statisticsPoll', {
         pollId: pollId,
         questionId: 0
      });
   }

   $scope.loadStatistics = function(pollId, questionId) {
      $scope.labels = [];
      $scope.data = [];

      $http.get('/api/polls/' + pollId).then(function(response) {
         $scope.title = response.data.title;
      });
      $http.get('/api/polls/' + pollId + '/questions').then(function(response) {

         $scope.question = response.data[questionId];
         $scope.nbQuestions = response.data.length;

         $http.get('/api/polls/*/questions/' + response.data[questionId]._id + '/choices').then(function(response) {

            var choices = response.data;

            angular.forEach(choices, function(choice) {
               $scope.labels.push(choice.text);

               $http.get('/api/choices/' + choice._id + '/answers').then(function(response) {
                  $scope.data.push(response.data.length);
               });

               /*
               $http({
               method: 'GET',
               url: '/api/choices/' + choice._id + '/answers',
               async: false
               }).then(function successCallback(response) {
               $scope.data.push(response.data.length);
               }, function errorCallback(response) {
               });*/
            });
         });
      });
   }

   $scope.nextQuestion = function(pollId) {
      $scope.questionId++;
      $state.go('statisticsPoll', {
         pollId: pollId,
         questionId: $scope.questionId
      });
   }

   $scope.previousQuestion = function(pollId) {
      $scope.questionId--;
      $state.go('statisticsPoll', {
         pollId: pollId,
         questionId: $scope.questionId
      });
   }

   $scope.checkPreviousQuestion = function() {
      if ($scope.questionId == 0) {
         return true;
      } else {
         return false;
      }
   };

   $scope.checkNextQuestion = function() {
      if ($scope.questionId == $scope.nbQuestions - 1) {
         return true;
      } else {
         return false;
      }
   };


   $scope.loadPollDetails = function(pollId) {
      $http.get('/api/polls/' + pollId).then(function(response) {
         $scope.poll = response.data;
      });

      $http.get('/api/polls/' + pollId + '/questions').then(function (response) {
         $scope.questions = response.data;

         angular.forEach($scope.questions, function(value, key) {
            $http.get('/api/polls/' + pollId + '/questions/' + value._id + '/choices').then(function(response) {
               value.choices = response.data;
            });
         });

      });
   }

})