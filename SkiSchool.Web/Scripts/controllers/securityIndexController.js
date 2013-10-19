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
}];
