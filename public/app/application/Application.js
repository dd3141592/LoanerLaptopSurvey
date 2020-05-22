angular.module('loanerLaptopApp').factory('Application', function($resource, $q, $http) {

  var applicationResource = $resource('/LoanerLaptop/api/application',{}, {

      save :{
          method: 'POST',
          url: '/LoanerLaptop/api/application/save'
      },
      getCollegeCount: {
          method: 'GET',
          url: '/LoanerLaptop/api/college/getCollegeCount',
          isArray: true
      },
      getCollegeAppointments: {
          method: 'GET',
          url: '/LoanerLaptop/api/college/getCollegeAppointments/:college',
          isArray: true,
          parameters : {
              college: '@college'
          }
      },

      getStudentApplication : {
          method:  'GET',
          url: '/LoanerLaptop/api/getStudentApplication/:studentId',
          parameters :{
              studentID : '@studentId'
          },
          isArray : false
      },
      getLaptopApplications: {
          method: 'GET',
          url: '/LoanerLaptop/api/getLaptopApplications',
          isArray: true
      },
      getHotSpotApplications: {
          method: 'GET',
          url: '/LoanerLaptop/api/getHotSpotApplications',
          isArray: true
      }

  });
  return applicationResource;
});