(function () {
    'use strict';

    sessionFactory.$inject = [
        '$q',
        '$http',
        'url',
        '$httpParamSerializerJQLike'
    ];
    angular.module('session').factory('sessionFactory', sessionFactory);

    function sessionFactory(
        $q,
        $http,
        url,
        $httpParamSerializerJQLike) {

        var factory = {};

        var AppData = url.backend() + "/AppService/GetApps.php";
        var InitSession = url.backend() + "/SessionService/InitSession.php";
        var CloseSession = url.backend() + "/SessionService/CloseSession.php";

        var SetupGame = url.backend() + "/Session_SetupGame.php";
        var InitGame = url.backend() + "/Session_InitGame.php";

        factory.setupApp = function () {
            var deferred = $q.defer();
            $http.get(AppData
            ).success(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        factory.login = function (user_id) {
            var deferred = $q.defer();

            var params = {
                user_id: user_id,
                user: {}
            };

            $http({
                method: 'POST',
                url: InitSession,
                data: $httpParamSerializerJQLike({ 'data': params }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('Error occured' + response);
                console.error(response.data.Error);
            });
            return deferred.promise;
        };

        factory.prepGame = function () {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: SetupGame,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('Error occured' + response);
                console.error(response.data.Error);
            });
            return deferred.promise;
        };

        factory.initGame = function (sesId) {
            var deferred = $q.defer();
            var params = { sessionId: sesId };
            $http({
                method: 'POST',
                url: InitGame,
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject('Error occured' + response);
                console.error(response.data.Error);
            });
            return deferred.promise;
        };

        factory.logout = function (user_id) {
            var deferred = $q.defer();

            var params = { user_id: user_id };

            $http({
                method: 'POST',
                url: CloseSession,
                data: $httpParamSerializerJQLike({ 'data': params }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject('Error occured' + response);
                console.error(response.data.Error);
            });
            return deferred.promise;
        };

        return factory;
    }
})();
