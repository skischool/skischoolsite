var module = angular.module("employeesIndex", []);

module.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'employeesController',
        templateUrl: '../../Templates/employeesView.html'
    });

    $routeProvider.otherwise({ redirectTo: '/' });
});


function employeesController($scope, $http) {
    $scope.employees = [];
    $scope.isLoading = true;

    $http.get('../../api/employees')
         .then(function (result) {
             // Success
             angular.copy(result.data, $scope.employees)
         },
         function () {
             // Error
             alert('error');
         })
         .then(function () {
             $scope.isLoading = false;
         });
};