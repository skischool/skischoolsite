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

    $scope.showAddSchedule = function (item) {

        $('.datepicker').datepicker({
            numberOfMonths: 3,
            showButtonsPanel: true
        });

        scheduleService.getScheduleTypes()
                        .then(function () {
                            // success
                        },
                        function () {
                            // error
                            alert('could not load');
                        });

        scheduleService.getScheduleTimes()
                       .then(function () {
                           // success
                       },
                       function () {
                           // error
                           alert('could not load');
                       });

        $('#addScheduleModal').modal({});
    }

    $scope.deleteSchedule = function (item) {
        $scope.isLoading = false;

        scheduleService.deleteSchedule(item)
                       .then(function () {
                           // success
                       },
                       function () {
                           // error
                           alert('could not delete.');
                       })
                       .then(function () {
                           $scope.isLoading = false

                           scheduleService.getSchedules();
                       });
    }

    $scope.addSchedule = function (item) {
        $scope.isLoading = false;

        item.Date = $('#newScheduleDate').val();

        scheduleService.postSchedule(item)
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

    $scope.showDetails = function (item) {
        $scope.selectedItem = item;
        $('#viewSchedule').modal({});
    }

    $scope.deleteDetails = function (item) {
        $scope.selectedItem = item;
        $('#deleteSchedule').modal({});
    }
}];