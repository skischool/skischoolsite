function employeesIndexController($scope, $http) {
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