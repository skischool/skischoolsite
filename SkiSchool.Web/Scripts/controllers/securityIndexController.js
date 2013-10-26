var module = angular.module('securityIndex', []);

module.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'securityController',
        templateUrl: '../../Templates/securityView.html'
    });

    $routeProvider.otherwise({ redirectTo: '/' });
});

var securityController = ['$scope', 'securityService', function ($scope, securityService) {
    $scope.data = securityService;
    $scope.isLoading = true;
    $scope.sortorder = 'LastName';

    if (securityService.isReady() == false) {
        $scope.isLoading = true;
        securityService.getSecurity()
              .then(function () {
                  // success
              },
              function () {
                  // error
                  alert('could not load.');
              })
              .then(function () {
                  $scope.isLoading = false;
              });
    }

    $scope.showDetails = function (item) {
        $scope.selectedItem = item;
        $('#viewSecurity').modal({});
    }

    $scope.editDetails = function (item) {
        $scope.selectedItem = item;
        $('#editSecurity').modal({});
    }

    $scope.editSecurity = function (item) {
        $scope.isLoading = false;

        securityService.editSecurity(item)
              .then(function () {
                  // success
              },
              function () {
                  // error
                  alert('could not save.');
              })
              .then(function () {
                  $scope.isLoading = false;

                  securityService.getSecurity();
              });
    }

}];
