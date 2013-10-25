module.factory('scheduleService', function ($http, $q) {

    'use strict';

    var _schedules = [];
    var _aggregateSchedules = [];
    var _isInit = false;
    var _isReady = function () {
        return _isInit;
    };

    var _getSchedulesAggregate = function () {

        var deffered = $q.defer();

        $http.get('../../api/schedules?grouped=true')
               .then(function (result) {
                   // success
                   angular.copy(result.data, _aggregateSchedules);
                   _isInit = true;
                   deffered.resolve();
               }, function () {
                   // error
                   deffered.reject();
               });

        return deffered.promise;
    };

    var _getSchedules = function () {

        var deffered = $q.defer();

        $http.get('../../api/schedules?grouped=false')
               .then(function (result) {
                   // success
                   angular.copy(result.data, _schedules);
                   _isInit = true;
                   deffered.resolve();
               }, function () {
                   // error
                   deffered.reject();
               });

        return deffered.promise;
    };

    return {
        schedules: _schedules,
        aggregateSchedules: _aggregateSchedules,
        getSchedulesAggregate: _getSchedulesAggregate,
        getSchedules: _getSchedules,
        isReady: _isReady
    };
});