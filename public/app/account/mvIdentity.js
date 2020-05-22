angular.module('LoanerLaptopSurveyApp').factory('mvIdentity', function() {
  var currentUser;

  return {
    currentUser: currentUser,
    isAuthorized: function() {
      return !!this.currentUser && this.currentUser.isAdmin ;
    }
  }
});