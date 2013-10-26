var module = angular.module('schedulesDetails', []);

module.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'schedulesDetailsController',
        templateUrl: '../../Templates/schedulesDetailsView.html'
    });

    $routeProvider.otherwise({ redirectTo: '/' });
});

var schedulesDetailsController = ['$scope', 'scheduleService', function ($scope, scheduleService) {
    $scope.data = scheduleService;
    $scope.isLoading = true;
    $scope.sortorder = 'Date';

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

    $scope.showDetails = function (item) {
        $scope.selectedItem = item;
        $('#viewSchedule').modal({});
    }

    $scope.deleteDetails = function (item) {
        $scope.selectedItem = item;
        $('#deleteSchedule').modal({});
    }

    $scope.deleteSchedule = function (item) {
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