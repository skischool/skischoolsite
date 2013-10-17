var module = angular.module('schedulesIndex', []);

module.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'schedulesController',
        templateUrl: '../../Templates/schedulesView.html'
    });

    $routeProvider.otherwise({ redirectTo: '/' });
});

function schedulesController($scope, $http) {
    $scope.test = 'schedules test';
    $scope.schedules = [];
    $scope.isLoading = true;

    $http.get('../../api/schedules')
         .then(function (result) {
             // Success
             angular.copy(result.data, $scope.schedules)
         },
         function () {
             // Error
             alert('error');
         })
         .then(function () {
             $scope.isLoading = false;
         });
};