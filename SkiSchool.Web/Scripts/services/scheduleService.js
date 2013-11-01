module.factory('scheduleService', function ($http, $q) {

    'use strict';

    var _schedules = [];
    var _aggregateSchedules = [];
    var _scheduleTypes = [];
    var _scheduleTimes = [];
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

    var _getScheduleTypes = function () {

        var deffered = $q.defer();

        $http.get('../../api/scheduleTypes')
               .then(function (result) {
                   // success
                   angular.copy(result.data, _scheduleTypes);
                   _isInit = true;
                   deffered.resolve();
               }, function () {
                   // error
                   deffered.reject();
               });

        return deffered.promise;
    };

    var _getScheduleTimes = function () {

        var deffered = $q.defer();

        $http.get('../../api/scheduletimes')
             .then(function (result) {
                 // success
                 angular.copy(result.data, _scheduleTimes);
                 deffered.resolve();
             }, function () {
                 // error
                 deffered.reject();
             });

        return deffered.promise;
    }

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

    var _postSchedule = function (schedule) {
        var deffered = $q.defer();

        $http.post('../../api/schedules', schedule)
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

    var _deleteSchedule = function (schedule) {
        var deferred = $q.defer();

        $http.delete('../../api/schedules?id=' + schedule.Id)
             .then(function (result) {
                 // success
                 deferred.resolve();
             }, function () {
                 // error
                 deferred.reject();
             });

        return deferred.promise;
    }
    

    return {
        schedules: _schedules,
        aggregateSchedules: _aggregateSchedules,
        scheduleTypes: _scheduleTypes,
        scheduleTimes: _scheduleTimes,
        getSchedulesAggregate: _getSchedulesAggregate,
        getSchedules: _getSchedules,
        getScheduleTypes: _getScheduleTypes,
        getScheduleTimes: _getScheduleTimes,
        deleteSchedule: _deleteSchedule,
        postSchedule: _postSchedule,
        isReady: _isReady
    };
});