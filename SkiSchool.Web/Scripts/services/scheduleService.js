//module.factory('scheduleService', function ($http, $q) {

//    var _schedules = [];
//    var _isInit = false;
//    var _isReady = function () {
//        return _isInit;
//    }

//    var _getSchedules = function () {
//        var deferred = $q.defer();

//        $http.get('../../api/schedules')
//             .then(function (result) {
//                 // Success
//                 angular.copy(result.data, _schedules);
//                 _isInit = true;
//                 deferred.resolve();
//             },
//             function () {
//                 // Error
//                 deferred.reject();
//             });
//    }

//    return {
//        schedules: _schedules,
//        isReady: _isReady
//    }
//});