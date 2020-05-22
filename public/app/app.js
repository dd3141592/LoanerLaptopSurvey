'use strict';
var loanerLaptopApp = angular.module('loanerLaptopApp', ['ngResource',  'ui.router', 'ngFileUpload','as.sortable', 'ui.mask', 'ui.bootstrap', 'ngAnimate', 'angularSpinner' ])
    .config(function ($stateProvider,  $urlRouterProvider, $locationProvider) {

        $stateProvider.state('admin',
            {
                url: '/LoanerLaptop/admin',
                templateUrl: "/LoanerLaptop/partials/admin/menu",
                controller: 'adminController'
            });
        $stateProvider.state('regret',
            {
                url: '/LoanerLaptop/regret',
                templateUrl: "/LoanerLaptop/partials/application/regret"
            });

        $stateProvider.state('survey',
            {
                url: '/LoanerLaptop/survey',
                abstract: true,
                templateUrl: "/LoanerLaptop/partials/survey/surveyForm",
                controller: 'surveyController'
            });
        $stateProvider
            .state('survey.form', {
                url: '/form',
                templateUrl: '/LoanerLaptop/partials/survey/questions'
            });
        $stateProvider.state('survey.thanks',
            {
                url: '/thanks',
                templateUrl: "/LoanerLaptop/partials/survey/thanks"
            });

        $stateProvider.state('thanks',
            {
                url: '/LoanerLaptop/thanks',
                templateUrl: "/LoanerLaptop/partials/application/thanks"
            });
        $stateProvider.state('thanksES',
            {
                url: '/LoanerLaptop/espanol/thanks',
                templateUrl: "/LoanerLaptop/partials/application/thanksES"
            });

        $stateProvider.state('thanksPOL',
            {
                url: '/LoanerLaptop/polsku/thanks',
                templateUrl: "/LoanerLaptop/partials/application/thanksPOL"
            });
        

        $stateProvider.state('deadlinepassed',
            {
                url: '/LoanerLaptop/deadlinepassed',
                templateUrl: "/LoanerLaptop/partials/application/deadlinepassed"
            });

        $stateProvider.state('application',
            {
                url: '/LoanerLaptop/application',
                abstract: true,
                templateUrl: '/LoanerLaptop/partials/application/applicationForm',
                controller: 'applicationController'
            });


        $stateProvider
            .state('application.screen',{
                url: '/form',
                views: {
                    'general_contact_info': {
                        templateUrl: '/LoanerLaptop/partials/application/general_contact_info'
                    }
                }
            });

        $stateProvider.state('applicationPOL',
            {
                url: '/LoanerLaptop/polsku/application',
                abstract: true,
                templateUrl: '/LoanerLaptop/partials/application/applicationFormPOL',
                controller: 'applicationController'
            });


        $stateProvider
            .state('applicationPOL.screen',{
                url: '/forma',
                views: {
                    'general_contact_infoPOL': {
                        templateUrl: '/LoanerLaptop/partials/application/general_contact_infoPOL'
                    }
                }
            });




        $stateProvider.state('applicationES',
            {
                url: '/LoanerLaptop/espanol/application',
                abstract: true,
                templateUrl: '/LoanerLaptop/partials/application/applicationFormES',
                controller: 'applicationController'
            });


        $stateProvider
            .state('applicationES.screen',{
                url: '/forma',
                views: {
                    'general_contact_infoES': {
                        templateUrl: '/LoanerLaptop/partials/application/general_contact_infoES'
                    }
                }
            });

        $stateProvider
            .state('agreementES',{
                url: '/LoanerLaptop/espanol/agreement',
                templateUrl: '/LoanerLaptop/partials/application/LoanerLaptopAgreementES'
                }
            );
        $stateProvider
            .state('agreementPOL',{
                    url: '/LoanerLaptop/polsku/agreement',
                    templateUrl: '/LoanerLaptop/partials/application/LoanerLaptopAgreementPOL'
                }
            );

        $stateProvider
            .state('agreement',{
                    url: '/LoanerLaptop/agreement',
                    templateUrl: '/LoanerLaptop/partials/application/LoanerLaptopAgreement'
                }
            );
        //LoanerLaptopAgreement

        $stateProvider.state('login',
            {
                url: '/LoanerLaptop/login',
                templateUrl: '/LoanerLaptop/partials/account/login',
                controller: 'loginController'
            });
        $stateProvider.state('loginES',
            {
                url: '/LoanerLaptop/espanol/login',
                templateUrl: '/LoanerLaptop/partials/account/loginES',
                controller: 'loginController'
            });
        $stateProvider.state('loginPOL',
            {
                url: '/LoanerLaptop/polsku/login',
                templateUrl: '/LoanerLaptop/partials/account/loginPOL',
                controller: 'loginController'
            });


        // $stateProvider.state('applicationClosed',
        //     {
        //         url: '/scholarshipApp',
        //         templateUrl: '/scholarshipApp/partials/application/applicationClosed'
        //     });
        $urlRouterProvider.when('/LoanerLaptop/espanol/', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/LoanerLaptop/espanol', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/LoanerLaptop/Espanol/', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/LoanerLaptop/Espanol', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/loanerlaptop/espanol', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/loanerlaptop/Espanol', function ($state) {

            $state.go('loginES');
        });

        $urlRouterProvider.when('/loanerlaptop/espanol/', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/loanerlaptop/espanol/', function ($state) {

            $state.go('loginES');
        });

        $urlRouterProvider.when('/loanerlaptop/Espanol', function ($state) {

            $state.go('loginES');
        });

        $urlRouterProvider.when('/Loanerlaptop/espanol', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/Loanerlaptop/espanol/', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/Loanerlaptop/Espanol', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/Loanerlaptop/Espanol/', function ($state) {

            $state.go('loginES');
        });

        $urlRouterProvider.when('/loanerLaptop/espanol', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/loanerLaptop/espanol/', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/loanerLaptop/Espanol', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/loanerLaptop/Espanol/', function ($state) {

            $state.go('loginES');
        });



        $urlRouterProvider.when('/LoanerLaptop/Espanol/Login/', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/LoanerLaptop/espanol/login', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/LoanerLaptop/espanol/login/', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/LoanerLaptop/espanol/login', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/loanerlaptop/espanol/login', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/loanerlaptop/espanol/login/', function ($state) {

            $state.go('loginES');
        });

        $urlRouterProvider.when('/loanerlaptop/espanol/login', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/loanerlaptop/espanol/login/', function ($state) {

            $state.go('loginES');
        });

        $urlRouterProvider.when('/loanerlaptop/espanol/login', function ($state) {

            $state.go('loginES');
        });

        $urlRouterProvider.when('/Loanerlaptop/espanol/login', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/Loanerlaptop/espanol/login/', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/Loanerlaptop/espanol/login', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/Loanerlaptop/espanol/login/', function ($state) {

            $state.go('loginES');
        });

        $urlRouterProvider.when('/loanerLaptop/espanol/login', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/loanerLaptop/espanol/login/', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/loanerLaptop/espanol/login', function ($state) {

            $state.go('loginES');
        });
        $urlRouterProvider.when('/loanerLaptop/espanol/login/', function ($state) {

            $state.go('loginES');
        });

        //polsku



        $urlRouterProvider.when('/LoanerLaptop/polsku/', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/LoanerLaptop/polsku', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/LoanerLaptop/Polsku/', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/LoanerLaptop/Polsku', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/loanerlaptop/polsku', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/loanerlaptop/Polsku', function ($state) {

            $state.go('loginPOL');
        });

        $urlRouterProvider.when('/loanerlaptop/polsku/', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/loanerlaptop/Polsku/', function ($state) {

            $state.go('loginPOL');
        });

        $urlRouterProvider.when('/loanerlaptop/polsku', function ($state) {

            $state.go('loginPOL');
        });

        $urlRouterProvider.when('/Loanerlaptop/Polsku', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/Loanerlaptop/polsku/', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/Loanerlaptop/polsku', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/Loanerlaptop/Polsku/', function ($state) {

            $state.go('loginPOL');
        });

        $urlRouterProvider.when('/loanerLaptop/Polsku', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/loanerLaptop/Polsku/', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/loanerLaptop/polsku', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/loanerLaptop/polsku/', function ($state) {

            $state.go('loginPOL');
        });



        $urlRouterProvider.when('/LoanerLaptop/Polsku/Login/', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/LoanerLaptop/Polsku/login', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/LoanerLaptop/polsku/login/', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/LoanerLaptop/polsku/login', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/loanerlaptop/Polsku/login', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/loanerlaptop/Polsku/login/', function ($state) {

            $state.go('loginPOL');
        });

        $urlRouterProvider.when('/loanerlaptop/Polsku/login', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/loanerlaptop/Polsku/login/', function ($state) {

            $state.go('loginPOL');
        });

        $urlRouterProvider.when('/loanerlaptop/polsku/login', function ($state) {

            $state.go('loginPOL');
        });

        $urlRouterProvider.when('/Loanerlaptop/Polsku/login', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/Loanerlaptop/Polsku/login/', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/Loanerlaptop/polsku/login', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/Loanerlaptop/polsku/login/', function ($state) {

            $state.go('loginPOL');
        });

        $urlRouterProvider.when('/loanerLaptop/Polsku/login', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/loanerLaptop/Polsku/login/', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/loanerLaptop/polsku/login', function ($state) {

            $state.go('loginPOL');
        });
        $urlRouterProvider.when('/loanerLaptop/polsku/login/', function ($state) {

            $state.go('loginPOL');
        });




        $urlRouterProvider.when('/LoanerLaptop', function ($state) {

            $state.go('login');
        });
        $urlRouterProvider.when('/LoanerLaptop/', function ($state) {

            $state.go('login');
        });
        $urlRouterProvider.when('/LoanerLaptop', function ($state) {

            $state.go('login');
        });
        $urlRouterProvider.when('/LoanerLaptop/', function ($state) {

            $state.go('login');
        });

        $urlRouterProvider.when('/Loanerlaptop', function ($state) {

            $state.go('login');
        });
        $urlRouterProvider.when('/Loanerlaptop/', function ($state) {

            $state.go('login');
        });
        $urlRouterProvider.when('/loanerlaptop', function ($state) {

            $state.go('login');
        });
        $urlRouterProvider.when('/loanerlaptop/', function ($state) {

            $state.go('login');
        });


        $urlRouterProvider.otherwise(function(){ 'login'});


        $locationProvider.html5Mode(true);



    });






angular.module('loanerLaptopApp').run(function ($rootScope, $state) {
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

