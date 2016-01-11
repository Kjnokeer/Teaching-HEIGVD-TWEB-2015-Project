var app = angular.module("app", ["chart.js", "ui.router", "ncy-angular-breadcrumb"]);

app.config(function($stateProvider) {
   $stateProvider.state('home', {
      templateUrl: 'partials/home/home.html',
      url: '/home',
      ncyBreadcrumb: {
         label: 'Home'
      }
   });
   $stateProvider.state('polls', {
      templateUrl: 'partials/home/polls.html',
      url: '/polls',
      ncyBreadcrumb: {
         label: 'Polls'
      }
   });
   $stateProvider.state('statistics', {
      templateUrl: 'partials/home/statistics.html',
      url: '/statistics',
      ncyBreadcrumb: {
         label: 'Statistics'
      }
   });
   $stateProvider.state('statisticsPoll', {
      templateUrl: 'partials/home/statistics-poll.html',
      url: '/statisticsPoll?pollId&questionId',
      ncyBreadcrumb: {
         label: 'Statistics of a poll'
      },
      controller: function($scope, $stateParams, $state) {
         $scope.pollId = $stateParams.pollId;
         $scope.questionId = $stateParams.questionId;
      }
   });
   $stateProvider.state('manage', {
      templateUrl: 'partials/home/manage.html',
      url: '/manage',
      ncyBreadcrumb: {
         label: 'Manage your account'
      },
      params: {
         message: 'None'
      }
   });
   $stateProvider.state('createPoll', {
      templateUrl: 'partials/home/create-poll.html',
      url: '/createPoll',
      ncyBreadcrumb: {
         label: 'Create a poll'
      }
   });
   $stateProvider.state('pollDetails', {
      templateUrl: 'partials/home/poll-details.html',
      url: '/pollDetails?pollId',
      ncyBreadcrumb: {
         label: "Poll's details"
      },
      controller: function($scope, $stateParams, $state) {
         $scope.pollId = $stateParams.pollId;
      }
   });
   $stateProvider.state('createQuestion', {
      templateUrl: 'partials/home/create-question.html',
      url: '/createQuestion?pollId',
      ncyBreadcrumb: {
         label: 'Create a question'
      },
      controller: function($scope, $stateParams, $state) {
         $scope.pollId = $stateParams.pollId;
      }
   });
});