module.factory('securityService', function ($http, $q) {

    'use strict';

    var _security = [];
    var _isInit = false;
    var _isReady = function () {
        return _isInit;
    };

    var _getSecurity = function () {

        var deffered = $q.defer();

        $http.get('../../api/security')
               .then(function (result) {
                   // success
                   angular.copy(result.data, _security);
                   _isInit = true;
                   deffered.resolve();
               }, function () {
                   // error
                   deffered.reject();
               });

        return deffered.promise;
    };

    return {
        security: _security,
        getSecurity: _getSecurity,
        isReady: _isReady
    };
});