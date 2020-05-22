angular.module('loanerLaptopApp').controller('applicationController',
    function ($scope, $filter, $window, $state, $timeout, $http,$q,  mvIdentity, Application, Notifier ) {

        $window.scrollTo(0, 0);

        $scope.currentTerm = $window.currentTerm;

        $scope.response = {};
        $scope.Submitted = false;
        $scope.SubmittedClicked = false;

        //$scope.disableFieldsFlag = false;
        $scope.laptopDisabled = false;
        $scope.hotspotDisabled = false;

        $scope.states = [
            'IL',
            'IN',
            'WI'];

        $scope.POBox =
            /^ *((#\d+)|((box|bin)[-. \/\\]?\d+)|(.*p[ \.]? ?(o|0)[-. \/\\]? *-?((box|bin)|b|(#|num)?\d+))|(p(ost)? *(o(ff(ice)?)?)? *((box|bin)|b)? *\d+)|(p *-?\/?(o)? *-?box)|post office box|((box|bin)|b) *(number|num|#)? *\d+|(num|number|#) *\d+)/i;
        $scope.POBox1 =
            /\bP(ost|ostal)?([ \.]*(O|0)(ffice)?)?([ \.]*Box)?\b/i;

        var baseUrl = "https://us-street.api.smartystreets.com/street-address?key=4171511542393981";


        $scope.makeDate = function (date) {
            var convertdLocalTime = new Date(date);
            var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;
            convertdLocalTime.setHours(convertdLocalTime.getHours() + hourOffset);

            return convertdLocalTime;
        };

        $scope.returnToLogin = function (lang) {

            switch (lang) {
                case 'ES':
                    $timeout(function () {
                        Notifier.error("Loaner equipment is only available to credit or Adult Ed students taking classes in the {{currentTerm}} term");

                        $timeout(function () {
                            $state.go('loginES');
                        }, 2000);

                    }, 500);
                    break;
                case 'POL':
                    $timeout(function () {
                        Notifier.error("Loaner equipment is only available to credit or Adult Ed students taking classes in the {{currentTerm}} term");

                        $timeout(function () {
                            $state.go('loginPOL');
                        }, 2000);

                    }, 500);
                    break;
                default:
                    $timeout(function () {
                        Notifier.error("Loaner equipment is only available to credit or Adult Ed students taking classes in the {{currentTerm}} term");

                        $timeout(function () {
                            $state.go('login');
                        }, 2000);

                    }, 500);
                    break;
            }

        };


        if (!mvIdentity.currentUser) {
            $state.go('login');
        } else {
            $scope.student = mvIdentity.currentUser;

        }

        $scope.getSmartyStreetsAddress = function () {
            var deferred = $q.defer();

            $("#addressModal").modal({
                backdrop: 'static'
            });
            var secondary= (!!$scope.student.address2 && $scope.student.address2.length>0) ? "&secondary=" + encodeURIComponent($scope.student.address2)  : '';
            var encodedAddress = "&street=" + encodeURIComponent($scope.student.address)
                + "&city=&state=&zipcode=" +  encodeURIComponent($scope.student.postal)
                +  secondary;

            var url =  encodeURI(baseUrl) +  encodedAddress;
            var config = {
                headers: {
                    'Accept': 'application/json',
                    'Host': 'us-street.api.smartystreets.com'
                }
            };

            $http.get(url, config).then(
                function successCallback(response) {
                    $scope.response = response;
                    if (response.data.length == 0) {
                        deferred.reject(false);
                        return;
                    } else {
                        $scope.student.delivery_line_1 = response.data[0].delivery_line_1;
                        $scope.student.last_line = response.data[0].last_line;

                    }
                    deferred.resolve(true);


                },
                function errorCallback(response) {
                    Notifier.error('An error has occurred validating your address.  Please try again or enter a different address.');
                    console.log("Unable to perform get request");
                    deferred.reject(false);
                }
            );
            return deferred.promise;
        };

        function getFormData(student) {
            if (Object.getOwnPropertyNames(mvIdentity.currentUser).indexOf('laptop') > -1
                || Object.getOwnPropertyNames(mvIdentity.currentUser).indexOf('hotspot') > -1) {
                //student = mvIdentity.currentUser;
                $scope.Submitted = (student.hotspot && student.laptop);
                return;

            }
            //curl -v "https://us-zipcode.api.smartystreets.com/lookup?key=3550738597428721952&city=mountain+view&state=CA&zipcode=94035"
            Application.getStudentApplication({studentId: student.EmployeeNumber}).$promise.then(function (result) {
                    if (Object.getOwnPropertyNames(result).indexOf('laptop') > -1 || Object.getOwnPropertyNames(result).indexOf('hotspot') > -1) {
                        angular.extend(student, result);
                        $scope.student.disableFieldsFlag = (student.hotspot || student.laptop);
                        $scope.student.certifyQualified = true;
                        $scope.laptopDisabled = student.laptop;
                        $scope.hotspotDisabled = student.hotspot;
                        $scope.Submitted = (student.hotspot && student.laptop);


                    }
                },
                function (err) {
                    Notifier.error(err.message || 'An error occurred.');
                    console.log(err.message);
                });
        }


        getFormData($scope.student);


        $scope.goToAgreement = function (where) {
            mvIdentity.currentUser = $scope.student;
            $state.go(where);
        };

        // function chooseAddress() {
        //     var deferred = $q.defer();
        //     $("#addressModal").modal('show');
        //
        //     $timeout(function () {
        //         deferred.resolve(true);
        //     }, 3000);
        //
        //     return deferred.promise;
        // }


        $scope.submitApplication = function (lang) {

            $scope.lang = lang;

            $scope.SubmittedClicked = true;
            if (!$scope.loanerLaptopAppForm.$valid) {
                return;
            }


            if ($scope.student.mobilephone == undefined ||
                $scope.student.address == undefined ||
                $scope.student.city == undefined ||
                $scope.student.state == undefined ||
                $scope.student.postal == undefined ||
                $scope.student.privacyconsent == undefined ||
                (Object.getOwnPropertyNames( $scope.student).indexOf('laptop') <0 && Object.getOwnPropertyNames( $scope.student).indexOf('hotspot') <0 ) ||
                ($scope.student.address.match($scope.POBox1) != null|| $scope.student.address.match($scope.POBox) != null)){
                return;
            }


            $scope.getSmartyStreetsAddress().then(function(){
                    $("#addressModal").modal('show');
                    return;

            }
            ,function(){
                Notifier.error("Please enter a valid address and re-submit");
                $("#addressModal").modal('hide');

            });


        };

        $scope.addressSelectionMade = function(choice){
            if(choice = "enteredAddress"){
                $scope.student.last_line = '';
                $scope.student.delivery_line_1 = '';
            }
            $("#addressModal").modal('hide');

            $scope.saveForm($scope.lang);
        };

        $scope.saveForm = function (lang) {

            $scope.student.lang = lang;


             Application.save({student: $scope.student}).$promise.then(function (result) {


                    $scope.Submitted = true;
                    $scope.SubmittedClicked = false;
                    switch (lang) {
                        case 'ES':
                            Notifier.notify('Se acepto la informacion proporcionada.');
                            $timeout(function () {
                                $state.go('thanksES');

                            }, 500);
                            break;
                        case 'POL':
                            Notifier.notify('Your application has been successfully submitted.');
                            $timeout(function () {
                                $state.go('thanksPOL');

                            }, 500);
                            break;
                        default:
                            Notifier.notify('Your application has been successfully submitted.');
                            $timeout(function () {
                                $state.go('thanks');

                            }, 500);
                            break;

                    }
                },
                function (err) {
                    Notifier.error(err.message);
                }
            );
        };

        $scope.closeModal = function () {
            $("#addressModal").modal('hide');
        };

    });



