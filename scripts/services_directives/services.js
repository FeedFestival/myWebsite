(function () {
    'use strict';
    var mod = angular.module('loading', []);

    mod.factory('loadingService', function () {
        var service = {
            requestCount: 0,
            isLoading: function () {
                return service.requestCount > 0;
            }
        };
        return service;
    });

    mod.factory('onCompleteInterceptor', ['$q', 'loadingService', function ($q, loadingService) {
        var started = function () {
            loadingService.requestCount++;
        };
        var ended = function () {
            loadingService.requestCount--;
        };
        return {
            request: function (config) {
                started();
                return config || $q.when(config);
            },
            response: function (response) {
                ended();
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                ended();
                return $q.reject(rejection);
            }
        };
    }]);

    mod.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('onCompleteInterceptor');
    }]);

    mod.controller('LoadingCtrl', ['$scope', 'loadingService', function ($scope, loadingService) {
        $scope.$watch(function () { return loadingService.isLoading(); }, function (value) { var loading = value; });
    }]);

    angular.module('menu').service('titleService', function () {
        var title = "";

        return {
            changeTitle: function (theTitle) {
                title = theTitle;
            },

            getTitle: function () {
                return title;
            }
        };
    });

    angular.module('session').service('utils', function () {
        var utils = {};

        utils.checkValueExist = function (array, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] == value || value.includes(array[i])) {
                    return true;
                }
            }
            return false;
        }

        return utils;
    });

    angular.module('session').service('sessionInformationService', function () {
        var loggedUser = {};
        var session = {};

        return {
            resetInfo: function () {
                loggedUser = {};
            },

            resetLoggedUser: function (user) {
                loggedUser = user;
            },

            handleFacebookUser: function (baseInfo) {
                loggedUser = {
                    name: baseInfo.first_name + " " + (!baseInfo.middle_name ? "" : baseInfo.middle_name) + baseInfo.last_name,
                    picture: baseInfo.picture.data.url,
                    facebookUniqueId: baseInfo.third_party_id,
                    setting: {
                        id: null,
                        settings: [
                            {
                                id: null,
                                type: {
                                    id: null,
                                    prog_id: "facebook_unique_id",
                                    name: "Facebook third_party_id"
                                },
                                value: baseInfo.third_party_id
                            },
                            {
                                id: null,
                                type: {
                                    id: null,
                                    prog_id: "facebook_email",
                                    name: "Email"
                                },
                                value: !baseInfo.email ? "" : baseInfo.email
                            }
                        ]
                    },
                    current_app: {
                        user_type_prog_id: "user_scoped_id",
                        user_value: baseInfo.id,
                        app_type_prog_id: "facebook_id",
                        app_value: session.FacebookAppId,
                        app_settings: [
                            {
                                type: {
                                    prog_id: "ACTIVATE_MAIL",
                                    name: "Activate mail recieving"
                                },
                                value: "true"
                            }
                        ]
                    },
                    friends: []
                };

                // setup apps of this user.
                //loggedUser.apps = [];
                //for (var i = 0; i < baseInfo.ids_for_business.data.length; i++) {
                //    if (loggedUser.current_app.facebook_id == baseInfo.ids_for_business.data[i].app.id)
                //        continue;
                //    var app = {
                //        facebook_id: baseInfo.ids_for_business.data[i].app.id,
                //        user_scoped_id: baseInfo.ids_for_business.data[i].id,
                //        name: baseInfo.ids_for_business.data[i].app.name
                //    };
                //    loggedUser.apps.push(app);
                //};

                // setup friends.
                for (var i = 0; i < baseInfo.friends.data.length; i++) {
                    loggedUser.friends.push(
                        {
                            prog_id: 'user_scoped_id',
                            user_scoped_id: baseInfo.friends.data[i].id
                        }
                    );
                }
                return loggedUser;
            },
            getUser: function () {
                return loggedUser;
            },
            setUser: function (user) {
                loggedUser = user;
                return loggedUser;
            },

            getSession: function () {
                return session;
            },

            setSession: function (s) {
                for (var i = 0; i < s.Apps.length; i++) {
                    if (s.Apps[i].name == "FeedFestStudio")
                        s.id = s.Apps[i].id;
                }
                session = s;
            }
        };
    });

    angular.module('session')
        .factory('AuthService', ['$q', 'ConfigFileLoaderService', function ($q, ConfigFileLoaderService) {
            var AuthService = {};

            AuthService.loginWithFacebook = function (authResponse) {

                var deferred = $q.defer();

                var params;

                ConfigFileLoaderService.load('aws-credentials.json').then(function (success) {
                    params = success;
                    params.Logins = {
                        "graph.facebook.com": authResponse.accessToken
                    };
                    AWS.config.region = 'eu-west-1';
                    // initialize the Credentials object with our parameters
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);


                    AWS.config.credentials.get(function (err) {
                        if (!err) {
                            deferred.resolve(AWS.config.credentials.identityId);
                        } else {
                            deferred.reject(err);
                        }
                    });
                }, function (error) {
                    deferred.reject('Problem loading credentials.');
                    return deferred.promise;
                }
                );

                return deferred.promise;
            };

            return AuthService;
        }]).factory('ConfigFileLoaderService', ['$q', '$http', function ($q, $http) {
            var ConfigFileLoaderService = {};

            ConfigFileLoaderService.load = function (file) {
                var deferred = $q.defer();
                $http.get(file).success(function (credentials) {
                    deferred.resolve(credentials);
                }).error(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            return ConfigFileLoaderService;
        }])
})();