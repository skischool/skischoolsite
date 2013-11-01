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

    var _editSecurity = function (item) {
        var deferred = $q.defer();

        $http.put('../../api/security?userName=' + item.Username, item)
             .then(function (result) {
                 // success
                 _isInit = true;
                 deferred.resolve();
             }, function () {
                 // error
                 deferred.reject();
             });

        return deferred.promise;
    }

    return {
        security: _security,
        getSecurity: _getSecurity,
        editSecurity: _editSecurity,
        isReady: _isReady
    };
});