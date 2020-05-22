angular.module('loanerLaptopApp').controller('adminController', function($scope,$state,$timeout, Application, Excel ) {
    //$scope.isAdmin = Identity ? (Identity.currentparticipant ?  Identity.currentparticipant.isAdmin : false) : false;
    //$scope.isSuperAdmin = Identity ? (Identity.currentparticipant ?  Identity.currentparticipant.isSuperAdmin : false) : false;

    $scope.laptopApplications = [];
    $scope.hotspotApplications = [];

    $scope.downloadRequests = function(type){
        switch(type){
            case 'laptop':
                Application.getLaptopApplications().$promise.then(function(result){
                    $scope.laptopApplications = result;
                    $scope.exportToExcel('#LaptopList');
                });
                break;
            case 'hotspot':
                Application.getHotSpotApplications().$promise.then(function (result) {
                    $scope.hotspotApplications = result;
                    $scope.exportToExcel('#HotSpotList');
                });
                break;

        }
    };

    $scope.exportToExcel=function(tableId){
        $timeout(function () {
            exportHref=Excel.tableToExcel(tableId,'S1');
            $timeout(function(){exportHref.click();},500);

        },2000);
        //exportHref.click();
    }

});