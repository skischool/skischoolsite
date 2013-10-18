module.factory('scheduleService', function ($http, $q) {

    var _schedules = [];
    var _isInit = false;
    var _isReady = function () {
        return _isInit;
    };

    var _getSchedules = function () {

        var deffered = $q.defer();

        $http.get('../../api/schedules')
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
        getSchedules: _getSchedules,
        isReady: _isReady
    };
});