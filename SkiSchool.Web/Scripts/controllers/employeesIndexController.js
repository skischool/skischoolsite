var module = angular.module("employeesIndex", []);

module.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'employeesController',
        templateUrl: '../../Templates/employeesView.html'
    });

    $routeProvider.otherwise({ redirectTo: '/' });
});

var employeesController = ['$scope', 'employeesService', function($scope, employeesService) {
    $scope.data = employeesService;
    $scope.isLoading = false;

    if (employeesService.isReady() == false) {
        $scope.isLoading = true;
        employeesService.getEmployees()
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