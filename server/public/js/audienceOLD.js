angular.module("AudienceApp", ['ui.router', 'chart.js', 'btford.socket-io' ]) // déclaration du module
.config(function($stateProvider) {
	// Déclaration des états

	$stateProvider.state('audience', {
    	templateUrl: 'partials/audience/audience.html',
    	url: '/audience',
    	controller: 'audienceController'
  	});

  	$stateProvider.state('audience.poll', {
		templateUrl: 'partials/audience/audience.html',
	    url: '/audience/:pollNr',
	    params: {
	      pollNr: 'pollNr'
	    },
	    controller: 'audienceController'
	});

	$stateProvider.state('error', {
		templateUrl: 'partials/audience/error.html',
      	url: '/error',
      	params: {
      		errorMsg: 'errorMsg'
      	},
      	controller: 'errorController'
	});
})
.controller('audienceController', function($scope, $http, $state, $stateParams) {

	$scope.poll = {
    number: $stateParams.pollNr,
    pseudo: '',
    questions: []
  };

  // Entry point, called when user submit the first form (pollid + username)
  $scope.startPoll = function(){

  	if($scope.poll.number === "pollNr" || $scope.poll.number === ''){
  		$state.go('error', {errorMsg : "Error, you must provide a correct poll id !"});
  	}

  }
})
.controller('errorController', function($scope, $http, $state, $stateParams) {
	$scope.errorMsg = $stateParams.errorMsg;
});