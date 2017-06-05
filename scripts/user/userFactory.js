(function () {
    'use strict';

    userFactory.$inject = [
        '$q',
        '$http',
        'url',
        '$httpParamSerializerJQLike'
    ];
    angular.module('user').factory('userFactory', userFactory);

    function userFactory(
        $q,
        $http,
        url,
        $httpParamSerializerJQLike) {

        var factory = {};

        var getUser = url.backend() + "/UserService/GetUser.php";
        var createUser = url.backend() + "/UserService/CreateUser.php";

        factory.getFacebookInfo = function () {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: ['third_party_id', 'first_name', 'last_name', 'middle_name',
                    'link', 'email', 'picture', 'token_for_business', 'ids_for_business',
                    'friends']
            }, function (response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                    console.error(response.data.Error);
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        };

        factory.getUser = function (facebookUniqueId, facebookAppId) {
            var deferred = $q.defer();

            var params = {
                facebook_unique_id: facebookUniqueId,
                app_id: facebookAppId
            };

            $http({
                method: 'POST',
                url: getUser,
                data: $httpParamSerializerJQLike({ 'data': params }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                if (response.data.Error == "USER_EXIST_NOT")
                    deferred.resolve(response.data);
                else {
                    deferred.reject('Error occured' + response);
                    console.error(response.data.Error);
                }
            });
            return deferred.promise;
        };

        factory.createUser = function (user) {
            var deferred = $q.defer();

            var params = {
                current_app: user.current_app,
                name: user.name,
                friends: user.friends,
                setting: user.setting
            };
            params.current_app.app_settings = JSON.stringify(params.current_app.app_settings);

            $http({
                method: 'POST',
                url: createUser,
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

        return factory;
    }
})();
