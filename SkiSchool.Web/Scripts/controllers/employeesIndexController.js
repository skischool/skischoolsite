var module = angular.module("employeesIndex", []);

module.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'employeesController',
        templateUrl: '../../Templates/employeesView.html'
    });

    //$routeProvider.when('/newmessage', {
    //    controller: 'viewEmployeeController',
    //    templateUrl: '../../Templates/employeesView.html'
    //});

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

        employeesService.getEmployeeTitles()
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

        employeesService.getEmployeeTypes()
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
        $('#viewEmployee').modal({});
    }

    $scope.editDetails = function (item) {
        $scope.selectedItem = item;
        $('#editEmployee').modal({});
    }

    $scope.deleteDetails = function (item) {
        $scope.selectedItem = item;
        $('#deleteEmployee').modal({});
    }

    $scope.editEmployee = function (item) {
        $scope.isLoading = false;
        employeesService.editEmployee(item)
              .then(function () {
                  // success
              },
              function () {
                  // error
                  alert('could not save.');
              })
              .then(function () {
                  $scope.isLoading = false;
              });
    }
}];