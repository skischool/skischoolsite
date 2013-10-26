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
    $scope.sortorder = 'Date';

    if (scheduleService.isReady() == false) {
        $scope.isLoading = true;
        scheduleService.getSchedulesAggregate()
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
        $('#viewSchedule').modal({});
    }

    $scope.editDetails = function (item) {
        $scope.selectedItem = item;
        $('#editSchedule').modal({});
    }

    $scope.editSchedule = function (item) {
        $scope.isLoading = false;

        scheduleService.editSchedule(item)
              .then(function () {
                  // success
              },
              function () {
                  // error
                  alert('could not save.');
              })
              .then(function () {
                  $scope.isLoading = false;

                  scheduleService.getSchedules();
              });
    }
}];