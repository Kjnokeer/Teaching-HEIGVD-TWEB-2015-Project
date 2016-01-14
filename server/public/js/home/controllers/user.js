app.controller('UserCtrl', function($scope, $http, $state) {
  $scope.loadUserInfo = function() {
    $http.get("/user/account").then(function(response) {
      $scope.user = response.data;
    });
  };

  $scope.submitUserInfos = function() {

    $http.put('/user/account/', {
      firstname: $scope.user.firstname,
      lastname: $scope.user.lastname,
      password: $scope.password
    });

    alert('Success');
  };
})