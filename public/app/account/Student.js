angular.module('loanerLaptopApp').factory('Student', function($resource, $http,  $q) {

  var studentResource = $resource('/LoanerLaptop/api',{}, {
    getStudentTechnologyLoanCredentials: {
      method: 'GET',
      url: '/LoanerLaptop/api/getStudentTechLoanCreds/:studentId',
      parameters: {
        studentId: '@studentId'
      }
    },
    getStudentTechnologyLoanDetails: {
      method: 'GET',
      url: '/LoanerLaptop/api/getTechLoanDetails/:studentId',
      parameters: {
        studentId: '@studentId'
      },
      isArray: true
    },
    saveSurvey: {
      method: 'POST',
      url: '/LoanerLaptop/api/saveSurvey'
    }

  },

);
  return studentResource;

});