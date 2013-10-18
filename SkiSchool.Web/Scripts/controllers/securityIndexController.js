var module = angular.module('securityIndex', []);

module.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'securityController',
        templateUrl: '../../Templates/securityView.html'
    });

    $routeProvider.otherwise({ redirectTo: '/' });
});

function securityController($scope, $http) {
    $scope.security = [];
    $scope.isLoading = true;

    $http.get('../../api/security')
         .then(function (result) {
             // Success
             angular.copy(result.data, $scope.security)
         },
         function () {
             // Error
             alert('error');
         })
         .then(function () {
             $scope.isLoading = false;
         });
};