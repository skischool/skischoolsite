var module = angular.module('schedulesIndex', []);

module.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'schedulesController',
        templateUrl: '../../Templates/schedulesView.html'
    });

    $routeProvider.otherwise({ redirectTo: '/' });
});

var schedulesController = ['$scope', 'scheduleService', function($scope, scheduleService) {
    $scope.data = scheduleService;
    $scope.isLoading = true;

    if (scheduleService.isReady() == false) {
        $scope.isLoading = true;
        scheduleService.getSchedules()
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