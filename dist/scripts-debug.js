(function () {
    'use strict';

    gamesController.$inject = [
        '$scope'
    ];
    angular.module('game').controller('gamesController', gamesController);

    function gamesController(
        $scope) {

        $scope.games = [
            {
                id: 1,
                Name: "Backgammon League",
                Type: 'O'  // Online
            },
            {
                id: 2,
                Name: "Can you dig it ?",
                Type: 'O'
            },
            {
                id: 4,
                Name: "ElectroN World",
                Type: 'GP'  // GooglePlay
            },
            {
                id: 5,
                Name: "WDB",
                Type: 'S'   // Steam
            }
        ];

        $scope.openGame = function (game) {
            console.log("open game in the right");
        };

        $scope.playGame = function (game) {

            if (!$scope.app.isLoggedIn())
                return;

            if (game.Type == 'O') {
                $scope.goGame('/game01.html');
            } else {
                console.log("play game on Google Play or Steam");
            }
        };

        $scope.getButtonClass = function (type) {
            switch (type) {
                case 'O':
                    return 'btn-play-online';
                    break;
                case 'S':
                    return 'btn-steam';
                    break;
                default:
                    break;
            }
        };
    }
})();
(function () {
    'use strict';

    homeController.$inject = [
        '$scope',
        '$window'
    ];
    angular.module('home').controller('homeController', homeController);

    function homeController(
        $scope,
        $window) {

        $scope.test = "test home";

        $scope.openImage = function (url) {
            $window.open(url, '_blank');
        }
    }
})();
(function () {
    'use strict';

    menuController.$inject = [
        '$scope',
        'menuFactory'
    ];
    angular.module('menu').controller('menuController', menuController);

    function menuController(
        $scope,
        menuFactory) {

        $scope.navCollapsed = true;

        $scope.menu = {
            prerenderedMenus : [
            { indx: 0 },
            { indx: 1 },
            { indx: 2 },
            { indx: 3 },
            { indx: 4 }
            ]
        };

        $scope.menus = [];

        $scope.selectMenuItem = function (item, online) {

            if (online) {
                for (var i = 0; i < $scope.menus.length; i++) {
                    if ($scope.menus[i].id != item.id)
                        $scope.menus[i].active = false;
                    else
                        $scope.menus[i].active = true;
                }

                $scope.go('/' + item.URL);
            } else {

                for (var i = 0; i < $scope.menu.prerenderedMenus.length; i++) {
                    if ($scope.menu.prerenderedMenus[i].indx != item.indx)
                        $scope.menu.prerenderedMenus[i].active = false;
                    else
                        $scope.menu.prerenderedMenus[i].active = true;
                }
            }
        };

        $scope.$watch(
          // This function returns the value being watched. It is called for each turn of the $digest loop
          function () {
              return menuFactory.menus;
          },
          // This is the change listener, called when the value returned from the above function changes
          function (newValue, oldValue) {
              if (newValue !== oldValue) {
                  $scope.menus = menuFactory.menus;
              }
          }, true
        );
    }
})();
(function () {
    'use strict';

    menuFactory.$inject = [
        '$q',
        '$http',
        'url'
    ];
    angular.module('menu').factory('menuFactory', menuFactory);

    function menuFactory(
        $q,
        $http,
        url) {

        var factory = { menus: [] };

        var MenuData = url.backend() + "/AppService/GetMenus.php";

        factory.refreshMenus = function () {
            var deferred = $q.defer();
            $http.get(MenuData
            ).success(function (data) {
                deferred.resolve(data);
                var menus = [];
                for (var i = 0; i < data.length; i++) {
                    menus.push(
                        {
                            id: data[i].id,
                            URL: data[i].URL,
                            Icon: data[i].icon,
                            Name: data[i].name
                        }
                    );
                }
                factory.menus = menus;
            });
            return deferred.promise;
        };

        return factory;
    }
})();
(function () {
    'use strict';

    portfolioController.$inject = [
        '$scope',
        '$window'
    ];
    angular.module('portfolio').controller('portfolioController', portfolioController);

    function portfolioController(
        $scope,
        $window) {

        

    }
})();
(function () {
    'use strict';

    app.directive('paragraphQuestions', function () {
        var obj = {
            restrict: 'E',
            scope: {
                p: '@paragraph'
            },
            template: '<div ng-include="\'scripts/services_directives/paragraphQuestions.html\'"></div>',

            controller: controller
        };

        controller.$inject = [
            '$scope',
            '$element',
            '$attrs',
            '$location',
            'utils'
        ];

        function controller(
            $scope,
            $element,
            $attrs,
            $location,
            utils) {

            var paragraphId = parseInt($scope.p);

            $scope.paragraph = {};

            if (paragraphId == 1) {
                $scope.paragraph = {
                    id: 1,
                    answersCount: 1,
                    hasAnswers: true,
                    answeredQuestions: [
                        {
                            id: 1,
                            //QuestionsCount: 1,
                            //Questions: [
                            //    {
                            //        id: 3,
                            //        QuestionsCount: 0
                            //    }
                            //],
                            //
                            Date: new Date(),
                            User: {
                                id: 1,
                                Name: "Anonymouse",
                                isAnonymous: true
                            },
                            Content: "how can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i ca",
                            Answers: [
                                {
                                    id: 45,
                                    Date: new Date(),
                                    User: {
                                        id: 3,
                                        Name: "Anonymouse45",
                                        isAnonymous: true
                                    },
                                    Content: "you can shut up!",
                                }
                            ]
                        }
                    ]
                };

                // get Questions and Answers only NUMBERS from server by paragraph id

                // get questions and answers from server by paragraph id
                $scope.paragraph.Questions = [
                        {
                            id: 1,
                            QuestionsCount: 1
                        },
                        {
                            id: 2,
                            QuestionsCount: 0
                        }
                ];

            }

            $scope.expandOptions = function (paragraph, val) {
                if (val == 0) {
                    paragraph.expandQuestions = !paragraph.expandQuestions;
                    paragraph.expandAnswers = false;
                } else {
                    paragraph.expandQuestions = false;
                    paragraph.expandAnswers = !paragraph.expandAnswers;
                }
            };
        };

        return obj;
    });

    app.directive('questionsAndAnswers', function () {
        var obj = {
            restrict: 'E',
            scope: {
                q: '@questionId'
            },
            template: '<div ng-include="\'scripts/services_directives/QaA.html\'"></div>',

            controller: controller
        };

        controller.$inject = [
            '$scope',
            '$element',
            '$attrs',
            '$location',
            'utils'
        ];

        function controller($scope, $element, $attrs, $location, utils) {

            // get question id from sever by id
            var questionId = parseInt($scope.q);

            if (questionId == 1) {
                $scope.question = {
                    id: 1,
                    QuestionsCount: 1,
                    Questions: [
                        {
                            id: 3,
                            QuestionsCount: 0
                        }
                    ],
                    //
                    Date: new Date(),
                    User: {
                        id: 1,
                        Name: "Anonymouse",
                        isAnonymous: true
                    },
                    Content: "how can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i ca",
                    Answers: [
                        {
                            id: 45,
                            Date: new Date(),
                            User: {
                                id: 3,
                                Name: "Anonymouse45",
                                isAnonymous: true
                            },
                            Content: "you can shut up!",
                        }
                    ]
                };
            } else if (questionId == 2) {
                $scope.question = {
                    id: 2,
                    QuestionsCount: 0,
                    //
                    Date: new Date(),
                    User: {
                        id: 77,
                        Name: "Anonymouse412412",
                        isAnonymous: true
                    },
                    Content: "how can i cahow can i cahow can i ca ?? ",
                };
            } else if (questionId == 3) {
                $scope.question = {
                    id: 3,
                    QuestionsCount: 1,
                    Questions: [
                        {
                            id: 4,
                            QuestionsCount: 0
                        }
                    ],
                    //
                    Date: new Date(),
                    User: {
                        id: 77,
                        Name: "Anonymous666",
                        isAnonymous: true
                    },
                    Content: " What is your problem bro ?",
                };
            } else if (questionId == 4) {
                $scope.question = {
                    id: 4,
                    QuestionsCount: 0,
                    //
                    Date: new Date(),
                    User: {
                        id: 77,
                        Name: "Anonymous666",
                        isAnonymous: true
                    },
                    Content: " What is your problem bro ?",
                };
            }
        };

        return obj;
    })

})();
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
(function () {
    'use strict';

    gameSessionController.$inject = [
        '$scope',
        '$location',
        '$window',
        '$facebook',
        '$timeout',
        '$localStorage',
        '$sessionStorage',
        'sessionFactory',
        'url'
    ];
    angular.module('session').controller('gameSessionController', gameSessionController);

    function gameSessionController(
        $scope,
        $location,
        $window,
        $facebook,
        $timeout,
        $localStorage,
        $sessionStorage,
        sessionFactory,
        url) {

        $scope.app = {
            isPlayingGame: true,
            showFullScreen: false,
            isLoggedIn: function () {
                return $scope.loggedUser != undefined || $scope.loggedUser != null;
            },
            showSquarePopupAdd: true
        };

        if ($localStorage.sessionId)
            sessionFactory.initGame($localStorage.sessionId).then(function () {
                checkGameReady();
            });

        function checkGameReady() {
            if (window.gameIsReady == true) {
                SendMessage("Game", "SetSession", $localStorage.sessionId);
                $localStorage.sessionId = undefined;
                return;
            }
            //console.log("game not ready." + new Date().toUTCString());
            $timeout(function () {
                checkGameReady();
            }, 1000 // every 1 second
            );
        };

        function sizeHappened() {
            console.log("sizeHappened()");

            //var w = window.screen.availWidth;
            var w = $window.innerWidth;

            if (w >= 1537) {
                $scope.gameWidth = '1280px';
                $scope.gameHeight = '720px';
            }
            else if (w >= 1367 && w <= 1536) {
                $scope.gameWidth = '1152px';
                $scope.gameHeight = '648px';
            }
            else if (w >= 1281 && w <= 1366) {
                $scope.gameWidth = '1024px';
                $scope.gameHeight = '576px';
            }
            else if (w <= 1280) {
                $scope.gameWidth = '976px';
                $scope.gameHeight = '549px';
            }

            if (w < 1536) {
                $scope.app.showSquarePopupAdd = false;
            } else {
                $scope.app.showSquarePopupAdd = true;
            }
        }

        sizeHappened();

        angular.element($window).bind('resize', function () {
            sizeHappened();
            $scope.$digest();
        });

        $scope.go = function (path) {
            $location.path(path);
        };

        $scope.exitGame = function (path) {
            $localStorage.exitedGame = true;
            $window.location.href = url.base() + '/index.html';
        };
    }
})();
(function () {
    'use strict';

    sessionController.$inject = [
        '$scope',
        '$location',
        '$window',
        '$facebook',
        '$timeout',
        'sessionFactory',
        '$localStorage',
        '$sessionStorage',
        'url',
        'sessionInformationService',
        'userFactory',
        'menuFactory'
    ];
    angular.module('session').controller('sessionController', sessionController);

    function sessionController(
        $scope,
        $location,
        $window,
        $facebook,
        $timeout,
        sessionFactory,
        $localStorage,
        $sessionStorage,
        url,
        sessionInformationService,
        userFactory,
        menuFactory) {

        $scope.app = {
            menuSelected: { id: 1 },
            isPlayingGame: false,
            isLoggedIn: function () {
                return $scope.loggedUser != undefined || $scope.loggedUser != null;
            },
            showLoginLoader: true,
            loginLoader: function (val, text) {
                this.showLoginLoader = val;
                if (text) {
                    var element = document.getElementById('login-loader');
                    element.setAttribute('data-content', text);
                }
            },
            profilePictureHovered: false
        };

        if ($localStorage.exitedGame) {
            $localStorage.exitedGame = false;
            $location.path('/games');
        }

        if ($localStorage.userId != null)
            $scope.app.loggingIn = false;

        $timeout(function () {

            $scope.app.loginLoader(true, 'setup');

            sessionFactory.setupApp().then(function (data) {

                $scope.app.loginLoader(true, 'logging in');

                sessionInformationService.setSession(
                    {
                        FacebookAppId: '1193283007398999',
                        Apps: data
                    }
                );

                // we are prerendering menus for now, so no need for this.
                //menuFactory.refreshMenus();

                $facebook.getLoginStatus().then(function (response) {
                    if (response.status === 'connected') {
                        $scope.app.facebookConnected = true;

                        if ($localStorage.userId != null)
                            login();
                    } else {
                        $scope.app.facebookConnected = false;
                    }
                    $scope.app.loginLoader(false);
                });

                // close the loader if facebook takes too long.
                $timeout(function () {
                    $scope.app.loginLoader(false);
                }, 5000);
            });
        }, 2000);

        $scope.loginWithFacebook = function () {

            if ($scope.app.isLoggedIn())
                return;

            $scope.app.loginLoader(true, 'connecting');

            if ($scope.app.facebookConnected) {
                login();
            } else {
                var permisions = "public_profile, email, user_friends";
                $facebook.login(permisions).then(function () {
                    login();
                });

                // close the loader if facebook takes too long.
                $timeout(function () {
                    if (!$scope.loggedUser)
                    $scope.app.loginLoader(false);
                }, 5000);
            }
        };

        function login() {
            userFactory.getFacebookInfo()
                .then(function (response) {
                    var user = sessionInformationService.handleFacebookUser(response);
                    phpLogin(user.facebookUniqueId);
                },
                function (err) {
                    console.log('Failed to login to facebook with error: ' + err);
                });
        };

        function phpLogin(facebookUniqueId) {

            $scope.app.loginLoader(true, 'finding');

            userFactory.getUser(facebookUniqueId, sessionInformationService.getSession().id)
                .then(function (response) {

                    if (response.Error == "USER_EXIST_NOT") {

                        $scope.app.loginLoader(true, 'creating');

                        userFactory.createUser(sessionInformationService.getUser())
                            .then(function () {
                                phpLogin(facebookUniqueId);
                            });
                    } else {

                        $scope.app.loginLoader(true, 'logging in');

                        sessionFactory.login(response.id)
                            .then(function () {
                                var x = response.id;
                                $scope.loggedUser = sessionInformationService.getUser();
                                $localStorage.userId = $scope.loggedUser.id;

                                // we are prerendering menus for now, so no need for this.
                                //menuFactory.refreshMenus();

                                $scope.app.loginLoader(false);
                            });
                    }
                });
        };

        $scope.logout = function () {
            sessionFactory.logout($localStorage.userId).then(function () {
                $scope.go('/home');
                $scope.loggedUser = undefined;
                $localStorage.userId = undefined;
                sessionInformationService.resetInfo();
                menuFactory.refreshMenus();
            });
        };

        $scope.go = function (path) {
            $location.path(path);
        };

        $scope.goGame = function (path) {
            sessionFactory.prepGame().then(function (response) {
                $localStorage.sessionId = response.SessionId;
                $window.location.href = url.base() + path;
            });
        };
    }
})();
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
            )
            .then(function(data) {
                deferred.resolve(data);
            }, function (err) {
                console.error(err);
            });

            return deferred.promise;

            //var deferred = $q.defer();

            //$http({
            //    method: 'GET',
            //    url: AppData,
            //    headers: {
            //        'Content-Type': 'application/x-www-form-urlencoded',
            //        'Access-Control-Allow-Origin': '*',
            //        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            //        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, origin, authorization, accept, client-security-token',
            //        'Access-Control-Allow-Credentials': 'false'
            //    }
            //}).then(function successCallback(data) {
            //    deferred.resolve(data);
            //}, function errorCallback(response) {
            //    deferred.reject('Error occured' + response);
            //    console.error(response.data.Error);
            //});
            //return deferred.promise;
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

(function () {
    'use strict';

    tutorialController.$inject = [
        '$scope',
        '$sce',
        '$routeParams',
        '$templateRequest',
        '$window',
        'utils'
    ];
    angular.module('tutorial').controller('tutorialController', tutorialController);

    function tutorialController(
        $scope,
        $sce,
        $routeParams,
        $templateRequest,
        $window,
        utils) {

        var id = $routeParams.id;
        init();

        function init() {

            // getTutorial php by id

            $scope.tutorial = {
                id: $routeParams.id,
                Name: "",
                CreatedBy: 'Simionescu Daniel',
                LastUpdateDate: new Date(),
                Link: 'scripts/tutorial/tutorials/tutorial01.html', // Link: 'scripts/tutorial/tutorials/tutorial02.html',
                Paragraphs: [
                    {
                        id: 1,
                        Name: "The model",
                    },
                    {
                        id: 2,
                        Name: "Ambient occlusion",
                    },
                    {
                        id: 3,
                        Name: "Texture",
                    }
                ]
            };
        };

        $scope.openImage = function (url) {
            $window.open(url, '_blank');
        };
    }
})();

(function () {
    'use strict';

    tutorialsController.$inject = [
        '$scope',
        '$window'
    ];
    angular.module('tutorial').controller('tutorialsController', tutorialsController);

    function tutorialsController(
        $scope,
        $window) {

        $scope.tutorials = [
            {
                id: 1,
                Name: 'Tutorial01',
                Description: 'First tutorial.',
                Link: 'tutorials/tutorial01.html'
            },
            {
                id: 2,
                Name: 'Tutorial02',
                Description: 'Second tutorial.',
                Link: 'tutorials/tutorial02.html'
            }
        ];

        $scope.showTutorialDescription = function (id) {

        };

        $scope.openImage = function (url) {
            $window.open(url, '_blank');
        }
    }
})();
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

(function () {
    'use strict';

    workflowController.$inject = [
        '$scope',
        '$sce',
        '$routeParams',
        '$templateRequest',
        '$window',
        'utils'
    ];
    angular.module('workflow').controller('workflowController', workflowController);

    function workflowController(
        $scope,
        $sce,
        $routeParams,
        $templateRequest,
        $window,
        utils) {

        var id = $routeParams.id;
        init();

        function init() {

            // getworkflow php by id

            $scope.workflow = {
                id: $routeParams.id,
                Name: "",
                CreatedBy: 'Simionescu Daniel',
                LastUpdateDate: new Date(),
                Link: 'scripts/workflow/workflows/workflow01.html', // Link: 'scripts/workflow/workflows/workflow02.html',
                Paragraphs: [
                    {
                        id: 1,
                        Name: "The model",
                    },
                    {
                        id: 2,
                        Name: "Ambient occlusion",
                    },
                    {
                        id: 3,
                        Name: "Texture",
                    }
                ]
            };
        };

        $scope.openImage = function (url) {
            $window.open(url, '_blank');
        };
    }
})();

(function () {
    'use strict';

    workflowsController.$inject = [
        '$scope',
        '$window'
    ];
    angular.module('workflow').controller('workflowsController', workflowsController);

    function workflowsController(
        $scope,
        $window) {
        $scope.workflows = [
            {
                id: 1,
                Name: 'workflow01',
                Description: 'First workflow.',
                Link: 'workflows/workflow01.html'
            },
            {
                id: 2,
                Name: 'workflow02',
                Description: 'Second workflow.',
                Link: 'workflows/workflow02.html'
            }
        ];

        $scope.showworkflowDescription = function (id) {

        };

        $scope.openImage = function (url) {
            $window.open(url, '_blank');
        }
    }
})();