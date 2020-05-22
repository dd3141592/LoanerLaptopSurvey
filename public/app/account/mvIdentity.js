angular.module('loanerLaptopApp').factory('mvIdentity', function() {
  var currentUser;
  var loanDetails;
  return {
    currentUser: currentUser,
     loanDetails:  loanDetails,
    isAuthorized: function() {
      return !!this.currentUser && this.currentUser.isAdmin ;
    }
  }
});