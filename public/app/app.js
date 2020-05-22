'use strict';
var loanerLaptopSurverApp = angular.module('loanerLaptopSurverApp', ['ngResource',  'ui.router', 'ngFileUpload','as.sortable', 'ui.mask', 'ui.bootstrap', 'ngAnimate', 'angularSpinner' ])
    .config(function ($stateProvider,  $urlRouterProvider, $locationProvider) {

        $stateProvider.state('admin',
            {
                url: '/LoanerLaptopSurvey/admin',
                templateUrl: "/LoanerLaptopSurvey/partials/admin/menu",
                controller: 'adminController'
            });


        $stateProvider.state('survey',
            {
                url: '/LoanerLaptopSurvey/survey',
                abstract: true,
                templateUrl: "/LoanerLaptopSurvey/partials/survey/surveyForm",
                controller: 'surveyController'
            });
        $stateProvider
            .state('survey.form', {
                url: '/form',
                templateUrl: '/LoanerLaptopSurvey/partials/survey/questions'
            });
        $stateProvider.state('survey.thanks',
            {
                url: '/thanks',
                templateUrl: "/LoanerLaptopSurvey/partials/survey/thanks"
            });


        $urlRouterProvider.when('/loanerlaptopsurvey', function ($state) {

            $state.go('login');
        });
        $urlRouterProvider.when('/loanerlaptopsurvey/', function ($state) {

            $state.go('login');
        });
        $urlRouterProvider.when('/LoanerLaptopSurvey', function ($state) {

            $state.go('login');
        });
        $urlRouterProvider.when('/LoanerLaptopSurvey/', function ($state) {

            $state.go('login');
        });

        $urlRouterProvider.when('/loanerlaptopSurvey', function ($state) {

            $state.go('login');
        });
        $urlRouterProvider.when('/loanerlaptopSurvey/', function ($state) {

            $state.go('login');
        });
        $urlRouterProvider.when('/loanerLaptopSurvey', function ($state) {

            $state.go('login');
        });
        $urlRouterProvider.when('/loanerLaptopSurvey/', function ($state) {

            $state.go('login');
        });


        $urlRouterProvider.otherwise(function(){ 'login'});


        $locationProvider.html5Mode(true);



    });






angular.module('loanerLaptopSurverApp').run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (evt, current, previous, rejection) {
        console.log('state change error + rejection: ' + rejection);
        $state.go('login');
    });
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $state.go('login');
        }
    });
});

