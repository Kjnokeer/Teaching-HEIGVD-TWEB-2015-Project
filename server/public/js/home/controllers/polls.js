app.controller('PollsCtrl', function($scope, $http, $state, $q) {

   $scope.labels = [];
   $scope.data = [];

   $scope.table = {
      fields: []
   };
   $scope.removedQuestionId = [];
   $scope.removedChoiceId = [];

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

   $scope.editPoll = function(id) {
      $state.go('editPoll', {
         pollId: id
      });
   }

   $scope.loadPollDetails = function(pollId) {
      $http.get('/api/polls/' + pollId).then(function(response) {
         $scope.title = response.data.title;
         $scope.state = response.data.state;
      });

      $http.get('/api/polls/' + pollId + '/questions').then(function(response) {

         var questions = response.data;

         angular.forEach(questions, function(value, key) {
            var field = {};

            field.choices = [];
            field.title = value.title;
            field.id = value._id;

            $http.get('/api/polls/' + pollId + '/questions/' + value._id + '/choices').then(function(response) {
               angular.forEach(response.data, function(value, key) {
                  field.choices.push({
                     text: value.text,
                     id: value._id
                  });
               });
            });

            $scope.table.fields.push(field);
         });
      });
   }

   $scope.addFormQuestion = function() {
      $scope.table.fields.push({
         title: '',
         choices: ['', '']
      });
   }

   $scope.addFormChoice = function(index) {
      $scope.table.fields[index].choices.push('');
   }

   $scope.removeFormQuestion = function(index) {
      $scope.removedQuestionId.push($scope.table.fields[index].id);
      $scope.table.fields.splice(index, 1);
   }

   $scope.submitPoll = function() {
      // Ajoute les informations du poll
      $http.post('/user/polls/', {
         title: $scope.title,
         state: $scope.state
      }).then(function(response) {
         var pollId = response.data._id;

         // Ajoute les questions
         angular.forEach($scope.table.fields, function(value, key) {
            $http.post('/api/polls/' + pollId + '/questions', {

               title: value.title,
               type: 'choice'

            }).then(function(response) {
               var questionId = response.data._id;

               // Ajoute les choix
               angular.forEach(value.choices, function(value, key) {
                  $http.post('/api/polls/*/questions/' + questionId + '/choices', {
                     key: 'key',
                     text: value
                  });
               });
            });
         });
      });

      $state.go('polls');
   }

   $scope.submitPollEdition = function(pollId) {

      $http.put('/api/polls/' + pollId, {
         title: $scope.title,
         state: $scope.state
      });

      angular.forEach($scope.table.fields, function(value, key) {

         // Nouvelle question
         if(value.id == undefined) {
            $http.post('/api/polls/' + pollId + '/questions', {

               title: value.title,
               type: 'choice'

            }).then(function(response) {
               var questionId = response.data._id;

               // Ajoute les choix
               angular.forEach(value.choices, function(value, key) {
                  $http.post('/api/polls/*/questions/' + questionId + '/choices', {
                     key: 'key',
                     text: value.text
                  });
               });
            });
         }

         // Question existante
         else {
            $http.put('/api/polls/*/questions/' + value.id, {
               title: value.title
            });

            angular.forEach(value.choices, function(choice, key) {
               // Nouveau choix
               if(choice.id == undefined) {
                  $http.post('/api/polls/*/questions/' + value.id + '/choices', {
                     key: 'key',
                     text: choice.text
                  });
               }
               else {
                  $http.put('/api/polls/*/questions/*/choices/' + choice.id, {
                     text: choice.text
                  });
               }
            });
         }
      });

      // On supprime les questions
      angular.forEach($scope.removedQuestionId, function(value, key) {
         $http.delete('/api/polls/*/questions/' + value);
      });
      // On supprime les choix
      angular.forEach($scope.removedChoiceId, function(value, key) {
         $http.delete('/api/polls/*/questions/*/choices/' + value);
      });

      $state.go('polls');
   }

   $scope.removeFormChoice = function(questionIndex, choiceIndex) {
      $scope.removedChoiceId.push($scope.table.fields[questionIndex].choices[choiceIndex].id);
      $scope.table.fields[questionIndex].choices.splice(choiceIndex, 1);
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

         $http.get('/api/polls/*/questions/' + $scope.question._id + '/choices').then(function(response) {

            var choices = response.data;

            angular.forEach(choices, function(choice) {

               $scope.labels.push(choice.text);

               $http.get('/api/choices/' + choice._id + '/answers').then(function(response) {
                  $scope.data.push(response.data.length);
               });

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

})