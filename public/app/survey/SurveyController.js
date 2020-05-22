angular.module('LoanerLaptopSurveyApp').controller('surveyController',
    function ($scope, $filter, $window, $state, $timeout, $http,$q,Student,  mvIdentity, Notifier ) {

        $scope.Submitted = false;
        $scope.SubmittedClicked = false;
        $scope.survey = {};


        if (!mvIdentity.currentUser) {
            $state.go('login');
        } else {
            $scope.student = mvIdentity.currentUser;
            $scope.survey.studentid = $scope.student.EmployeeNumber;

        }

        $scope.submitSurvey = function () {
            $scope.SubmittedClicked = true;
            if (!$scope.loanerLaptopSurveyForm.$valid) {
                return;
            }
            if (
                $scope.survey.purchase == undefined ||
                $scope.survey.enrollSummer == undefined ||
                $scope.survey.enrollFall == undefined ||
                $scope.survey.intendReturn == undefined)
            {
                return;
            }


            Student.saveSurvey({survey: $scope.survey}).$promise.then(function (result) {
                $scope.Submitted = true;
                $scope.SubmittedClicked = false;

                Notifier.notify('Your survey has been saved successfully');
                $timeout(function () {
                        $state.go('survey.thanks');
                    }
                );
            },
                function (err) {

                    Notifier.notify('You may have already submitted a survey.');
            });
        };

    });


