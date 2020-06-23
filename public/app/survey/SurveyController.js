angular.module('LoanerLaptopSurveyApp').controller('surveyController',
    function ($scope, $filter, $window, $state, $timeout, $http,$q,Student,  mvIdentity, Notifier ) {

        $scope.SubmittedClicked = false;
        $scope.survey = {};

        $scope.Submitted = false;

        if (!mvIdentity.currentUser) {
            $state.go('login');
        } else {
            $scope.student = mvIdentity.currentUser;
            $scope.survey.studentid = $scope.student.EmployeeNumber;
            $scope.survey.email = $scope.student.EmailAddress;

        }

        $scope.submitSurvey = function () {
            $scope.SubmittedClicked = true;
            if (!$scope.loanerLaptopSurveyForm.$valid) {
                return;
            }
            if (

                $scope.survey.enrollFall == undefined)
            {
                return;
            }


            Student.saveSurvey({survey: $scope.survey}).$promise.then(function (result) {
                $scope.Submitted = true;
                $scope.SubmittedClicked = false;

                if(!result){

                    Notifier.notify('You may have already submitted a survey.');
                    return;
                }

                Notifier.notify('Your survey has been saved successfully');
                $timeout(function () {
                        $state.go('survey.thanks');
                    }
                );
            }, function (err) {

                Notifier.notify('You may have already submitted a survey.');
            });
        };

    });


