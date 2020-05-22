angular.module('loanerLaptopApp').controller('loginController',
    function($scope, $http, $filter,$timeout,$interval, $q, $window,Student, Notifier, mvAuth,mvIdentity, $state) {

  $scope.waitMessage ;
  $scope.currentTerm = $window.currentTerm;
  $scope.nextTerm = $window.nextTerm;

  $scope.loginClicked = false;
  // $scope.setFocus = function () {
  //   $timeout(function () { $('#login').focus(); });
  // };



  $scope.polishTranslation = '"Hot spot akces" jest miejscem fizyczny, gdzie uzytkownicy' +
      'maja mozliwosc dostepu do internetu, zazwaczaj uzywajac' +
      'Wi-Fi technologie i router ktory jest podlaczony do prowajdera internetu. ' +
      'Byznesy takie jak kawiarnie i  hotele oferuja publiczne "hot spot akces" ' +
      'dla swoich klientow. CCC bedzie placic za uzywanie "hot spot punktow akcesu"';

  $scope.cancelNotifier = function(){
    if (angular.isDefined($scope.waitMessage)) {
      $interval.cancel($scope.waitMessage);
    }
  };
  $scope.submitLogin = function (lang) {
    $scope.loginClicked = true;
    if (!$scope.loginAppForm.$valid ) {
      //Notifier.error("Please enter your password and username.");
      return;
    }

    var index = $scope.user.username.indexOf('@');
    if(index > -1 ){
      $scope.user.username = $scope.user.username.slice(0,index);
    }
    mvAuth.authenticateUser($scope.user).then(function (success) {
      if (success) {
        checkIfAdmin();
        $scope.student = mvIdentity.currentUser;


        var arr = [];

        // if($scope.student.EmployeeNumber == '000685506'){

        Notifier.notify("Welcome " + $scope.student.GivenName + ".  You have successfully logged in.");

         $scope.waitMessage =  $timeout(function () {
          Notifier.notify("Please wait while we check your eligibility for the technology loaner program..."  );
        },2000);


          Student.getStudentTechnologyLoanCredentials({studentId: $scope.student.EmployeeNumber}).$promise.then(function (result) {
            processCredentials(result,lang);

            return;
          },
          function (err) {
            console.log("error calling cs9" + err.message);
            $scope.cancelNotifier();

            $state.go('regret');
            return;
          });

      }
      else {
        processBadLogin(lang);
      }
    });
  };
  function processBadLogin (lang) {
    switch(lang){
      case 'ES':
        Notifier.error('La informacion proporcionada no functiono');
        break;
      case 'POL':
        Notifier.error('Username and Password combination incorrect');
        break;
      default:
        Notifier.error('Username and Password combination incorrect');
        break;
    }
  }

  function proceedToApplication(lang){
      switch(lang){
        case 'ES':
          Notifier.notify('Bienvenido y Bienvenida ' + mvIdentity.currentUser.GivenName + '.  Acaba de entrar al sistema.');
          $state.go('applicationES.screen');
          break;
        case 'POL':
          Notifier.notify('Welcome' + mvIdentity.currentUser.GivenName + '.  You have successfully signed in!');
          $state.go('applicationPOL.screen');
          break;
        default:
          Notifier.notify('Welcome' + mvIdentity.currentUser.GivenName + '.  You have successfully signed in!');
          $state.go('application.screen');
          break;
    }
  }

  function checkForTechLoanDetails(){
      //check if in techloanDetails table.
      Student.getStudentTechnologyLoanDetails({studentId: $scope.student.EmployeeNumber}).$promise.then(
          function (result) {
            if(!!result && result.length >0){
              mvIdentity.loanDetails = result;
              $state.go('survey.form');

            } else {
              $state.go('regret');

            }
          }
      );
  }


  function processCredentials(result,lang){
    //result.data.query.rows
    $scope.cancelNotifier();

    if(studentStatusAllowsLoan(result)){
        proceedToApplication(lang);
    } else if(studentNotEnrolled(result)) {
        checkForTechLoanDetails();

    } else{
        $state.go('regret');
      }
    }


  function checkIfAdmin() {
    if(
        //($scope.user.username.indexOf('ddorman')> -1) ||
    //($scope.user.username.indexOf('aberns')> -1) ||
        ($scope.user.username.indexOf('smarsey')> -1) ||
        ($scope.user.username.indexOf('dmacklin')> -1) ||
        ($scope.user.username.indexOf('lewashington')> -1) ||
        ($scope.user.username.indexOf('jcampbell')> -1) ||
        ($scope.user.username.indexOf('yweng3')> -1))
    {
      $state.go('admin');
      return;
    }
  }

  function filterByStudentEligibility(item) {
    return  ((item.TERM_DESCR == $scope.currentTerm ||  item.TERM_DESCR == $scope.nextTerm)&& item.ENROLLED_YN == 'Y' && item.ACAD_CAREER == 'CRED')
        &&  (item.ACAD_PROG != 'NODC'  || (item.ACAD_PROG = 'NODC'  && item.ACAD_PLAN == '0101EC' ))

  }


  function filterByStudentNotEnrolled(item) {
      return  ( (item.TERM_DESCR == $scope.currentTerm || item.TERM_DESCR == $scope.nextTerm ) && item.ENROLLED_YN == 'N' && item.ACAD_CAREER == 'CRED')
          &&  (item.ACAD_PROG != 'NODC'  || (item.ACAD_PROG = 'NODC'  && item.ACAD_PLAN == '0101EC' ))

    }


  function studentNotEnrolled(result){
    // If ACAD_PROG = “NODC” and ACAD_PLAN = “0101EC” they are Dual Credit/Enroll.
    //
    //     If ACAD_PROG = “NODC” and ACAD_PLAN <> “0101EC” they are other non-degree seeking students.
    //
    //     If ACAD_PROG <> “NODC” they are degree seeking students.

    //result.data.query.rows

    //  select the right entry
    var arrTerms = !!result &&  !!result.data && !!result.data.query &&   !!result.data.query.rows ? result.data.query.rows : [];

    if( arrTerms.length == 0) {
      return false;
    }


    var arrSurvey = arrTerms.filter(filterByStudentNotEnrolled);
    //check to see if this termResult indicates that student is enrolled and a degree seeking student
    return  arrSurvey.length == 2;

  }

  function studentStatusAllowsLoan(result){
        // If ACAD_PROG = “NODC” and ACAD_PLAN = “0101EC” they are Dual Credit/Enroll.
        //
        //     If ACAD_PROG = “NODC” and ACAD_PLAN <> “0101EC” they are other non-degree seeking students.
        //
        //     If ACAD_PROG <> “NODC” they are degree seeking students.

        //result.data.query.rows

        //  select the right entry
        var arrTerms = !!result &&  !!result.data && !!result.data.query &&   !!result.data.query.rows ? result.data.query.rows : [];

        if( arrTerms.length == 0) {
          return false;
        }


        var arrEligible = arrTerms.filter(filterByStudentEligibility);
        //check to see if this termResult indicates that student is enrolled and a degree seeking student
        return  arrEligible.length > 0;

      }
});