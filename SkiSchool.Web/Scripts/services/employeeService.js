module.factory('employeesService', function ($http, $q) {

    'use strict';

    var _employees = [];
    var _employeeTypes = [];
    var _employeeTitles = [];
    var _genders = [];
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

    var _getEmployeeTitles = function () {

        var deffered = $q.defer();

        $http.get('../../api/employeeTitles')
               .then(function (result) {
                   // success
                   angular.copy(result.data, _employeeTitles);
                   _isInit = true;
                   deffered.resolve();
               }, function () {
                   // error
                   deffered.reject();
               });

        return deffered.promise;
    };

    var _getEmployeeTypes = function () {

        var deffered = $q.defer();

        $http.get('../../api/employeeTypes')
               .then(function (result) {
                   // success
                   angular.copy(result.data, _employeeTypes);
                   _isInit = true;
                   deffered.resolve();
               }, function () {
                   // error
                   deffered.reject();
               });

        return deffered.promise;
    };

    var _getGenders = function () {

        var deffered = $q.defer();

        $http.get('../../api/genders')
               .then(function (result) {
                   // success
                   angular.copy(result.data, _genders);
                   _isInit = true;
                   deffered.resolve();
               }, function () {
                   // error
                   deffered.reject();
               });

        return deffered.promise;
    };

    var _editEmployee = function (employee) {
        var deffered = $q.defer();

        $http.put('../../api/employees?id=' + employee.Id, employee)
             .then(function (result) {
                 // success
                 _isInit = true;
                 deffered.resolve();
             }, function () {
                 // error
                 deffered.reject();
             });

        return deffered.promise;
    }

    return {
        employees: _employees,
        employeeTypes: _employeeTypes,
        employeeTitles: _employeeTitles,
        genders: _genders,
        getEmployees: _getEmployees,
        editEmployee: _editEmployee,
        getEmployeeTitles: _getEmployeeTitles,
        getEmployeeTypes: _getEmployeeTypes,
        getGenders: _getGenders,
        isReady: _isReady
    };
});