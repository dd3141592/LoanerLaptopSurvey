angular.module('loanerLaptopSurverApp').controller('loginController',
    function($scope, $http, $filter,$timeout,$interval, $q, $window,Student, Notifier, mvAuth,mvIdentity, $state) {

  $scope.currentTerm = $window.currentTerm;
  $scope.nextTerm = $window.nextTerm;

  $scope.loginClicked = false;






  $scope.submitLogin = function (lang) {
    $scope.loginClicked = true;
    if (!$scope.loginAppForm.$valid ) {
      //Notifier.error("Please enter your password and username.");
      return;
    }

    var index = $scope.user.username.indexOf('@');
    if(index > -1 ){
      $scope.user.username = $scope.user.username.slice(0,index);
    }
    mvAuth.authenticateUser($scope.user).then(function (success) {
      if (success) {

        $scope.student = mvIdentity.currentUser;



        Notifier.notify('Welcome' + mvIdentity.currentUser.GivenName + '.  You have successfully signed in!');
        $state.go('survey.form');

      }
      else {
        processBadLogin();
      }
    });
  };
  function processBadLogin () {

        Notifier.error('Username and Password combination incorrect');

  }








});