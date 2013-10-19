var viewEmployeeController = ['$scope', 'employeesService', function ($scope, employeesService) {
    $scope.data = employeesService;
    $scope.isLoading = false;

    $scope.test = 'test data';

    //if (employeesService.isReady() == false) {
    //    $scope.isLoading = true;
    //    employeesService.getEmployees()
    //          .then(function () {
    //              // success
    //          },
    //          function () {
    //              // error
    //              alert('could not load.');
    //          })
    //          .then(function () {
    //              $scope.isLoading = false;
    //          });
    //}
}];