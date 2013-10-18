module.factory('employeesService', function ($http, $q) {

    var _employees = [];
    var _isInit = false;
    var _isReady = function () {
        return _isInit;
    };

    var _getEmployees = function () {

        var deffered = $q.defer();

        $http.get('../../api/employees')
               .then(function (result) {
                   // success
                   angular.copy(result.data, _employees);
                   _isInit = true;
                   deffered.resolve();
               }, function () {
                   // error
                   deffered.reject();
               });

        return deffered.promise;
    };

    return {
        employees: _employees,
        getEmployees: _getEmployees,
        isReady: _isReady
    };
});