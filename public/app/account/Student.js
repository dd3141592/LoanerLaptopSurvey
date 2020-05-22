angular.module('LoanerLaptopSurveyApp').factory('Student', function($resource, $http,  $q) {

  var studentResource = $resource('/LoanerLaptopSurvey/api',{}, {

    saveSurvey: {
      method: 'POST',
      url: '/LoanerLaptopSurvey/api/saveSurvey'
    }

  }

);
  return studentResource;

});