'use strict';

var sessionModule = angular.module('session', []);
var userModule = angular.module('user', []);
var menuModule = angular.module('menu', []);
var homeModule = angular.module('home', []);
var tutorialModule = angular.module('tutorial', []);
var gameModule = angular.module('game', []);
var workflowModule = angular.module('workflow', []);
var portfolioModule = angular.module('portfolio', []);

var app = angular.module('FeedFestStudio', ['ngRoute'
                                     , 'session'
                                     , 'user'
                                     , 'menu'
                                     , 'home'
                                     , 'tutorial'
                                     , 'game'
                                     , 'workflow'
                                     , 'portfolio'
                                     , 'ui.bootstrap'
                                     , 'pascalprecht.translate'
                                     , 'loading'
                                     , 'ngFacebook'
                                     , 'ngStorage'
]);

app.config(['$routeProvider', '$httpProvider', '$facebookProvider',
    function ($routeProvider, $httpProvider, $facebookProvider) {

    $httpProvider.defaults.withCredentials = true;

    $facebookProvider.setAppId('1193283007398999');
    $facebookProvider.setVersion("v2.2");

    $routeProvider.when('/home', {
        templateUrl: 'scripts/home/home.html',
        controller: 'homeController'
    });

    $routeProvider.when('/tutorials', {
        templateUrl: 'scripts/tutorial/tutorials.html',
        controller: 'tutorialsController'
    });
    $routeProvider.when('/tutorial/:id', {
        templateUrl: 'scripts/tutorial/tutorial.html',
        controller: 'tutorialController'
    });

    $routeProvider.when('/workflows', {
        templateUrl: 'scripts/workflow/workflowList.html',
        controller: 'workflowsController'
    });
    $routeProvider.when('/workflow/:id', {
        templateUrl: 'scripts/workflow/workflowSingle.html',
        controller: 'workflowController'
    });

    $routeProvider.when('/portfolio', {
        templateUrl: 'scripts/portfolio/portfolio.html',
        controller: 'portfolioController'
    });

    $routeProvider.when('/games', {
        templateUrl: 'scripts/game/games.html',
        controller: 'gamesController'
    });
    
    $routeProvider.otherwise({ redirectTo: '/home' });

    //$httpProvider.interceptors.push(function ($q, $location, sessionInformationService) {
    //    return {
    //        'responseError': function (rejection) {
    //            if (rejection.data) {
    //                var msgId = rejection.data.replace("\"", '').replace("\"", '');
    //                console.log(msgId);
    //            }
    //            //if HttpStatusCode.InternalServerError
    //            if (rejection.status == 403) {
    //                sessionInformationService.resetInfo();
    //                $location.path("/home");
    //            }
    //            return $q.reject(rejection);
    //        },
    //
    //        'response': function (response) {
    //            if (typeof response.data == "string" && response.data != "true" && response.data != "false"
    //                && response.data.indexOf("<") != 0 && response.data.length > 0) {
    //                var msgId = response.data.replace("\"", '').replace("\"", '');
    //                console.log(msgId);
    //            }
    //            return response || $q.when(response);
    //        }
    //    };
    //});
}]);

app.config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix: 'scripts/language/locale-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('en_US');

}]);

app.config(function ($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    //disable IE caching
    // TODO: here creates a conflict with getting data from a php backend.

    //$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    //$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
});

app.factory('fileReader', function ($http, $q) {
    var onLoad = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function (reader, scope) {
        return function (event) {
            scope.$broadcast("fileProgress",
            {
                total: event.total,
                loaded: event.loaded
            });
        };
    };

    var getReader = function (deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();

        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);

        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL
    };
});

// multi language
app.controller('TranslateCtrl', ['$scope', '$route', function ($scope, $route) {

    //$scope.currentLanguage = 'nb_NO';
    //$scope.languages = [
    //    { src: 'img/flags/en_US.png', selected: false, langKey: 'en_US' },
    //    { src: 'img/flags/nb_NO.png', selected: true, langKey: 'nb_NO' }
    //];


    //if (!!$scope.loggedUser && !!$scope.loggedUser.Language) {
    //    $scope.currentLanguage = $scope.loggedUser.Language;
    //    $translate.use($scope.currentLanguage);
    //}

    //$http.defaults.headers.common['culture'] = $scope.currentLanguage;

    //$scope.changeLanguage = function (language) {
    //    $http.defaults.headers.common['culture'] = language.langKey;
    //    $scope.currentLanguage = language.langKey;

    //    var user = $scope.loggedUser;
    //    if (user && user.Language != language.langKey) {
    //        user.Language = language.langKey;
    //    }

    //    angular.forEach($scope.languages, function (lang, key) {
    //        lang.selected = false;
    //    });
    //    language.selected = true;

    //    $translate.use(language.langKey);

    //    $route.reload();
    //};
}]);

app.run(function ($rootScope, $location, $route, sessionInformationService, url, utils) {
    checkBrowser();
    url.setUrls("localhost");   // to "online"

    // Load the facebook SDK asynchronously
    (function () {
        // If we've already installed the SDK, we're done
        if (document.getElementById('facebook-jssdk')) { return; }
        // Get the first script element, which we'll use to find the parent node
        var firstScriptElement = document.getElementsByTagName('script')[0];
        // Create a new script element and set its id
        var facebookJS = document.createElement('script');
        facebookJS.id = 'facebook-jssdk';
        // Set the new script's source to the source of the Facebook JS SDK
        facebookJS.src = '//connect.facebook.net/en_US/sdk.js';
        // Insert the Facebook JS SDK into the DOM
        firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
    }());

    // register listener to watch route changes
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (typeof (sessionInformationService.getSession().SessionId) === 'undefined'
            || sessionInformationService.getSession().SessionId === null
            || sessionInformationService.getSession().SessionId === '') {

            // no logged user ?, we should be restricting access to some routes.
            if (next.$$route &&
                (!utils.checkValueExist(
                    ['/forgotPassword', '/Signup', '/home', '/tutorials', '/tutorial', '/games', '/game', '/workflows', '/workflow', '/portfolio'],
                        next.$$route.originalPath)))
                $location.path("/home");
        }
    });

    // Returns the version of Internet Explorer or a -1 (indicating the use of another browser).
    function getInternetExplorerVersion() {
        var rv = -1; // Return value assumes failure.
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        return rv;
    }

    function checkBrowser() {
        var ver = getInternetExplorerVersion();

        if (ver > -1) {
            if (ver <= 8.0)
                $location.path("/error");
        }
    }
});

app.service('url', ['$location', function ($location) {
    var baseUrl = "";
    var serviceUrl = "";
    return {
        base: function () {
            return baseUrl;
        },

        backend: function () {
            return serviceUrl;
        },

        setUrls: function (url) {

            if (url == 'localhost') {
                baseUrl = "http://localhost:8080/gamescrypt/GameCrib.Service";
                serviceUrl = "http://localhost:8080/gamescrypt/GameCrib.Service";
            } else if (url == 'localserver') {
                baseUrl = "http://localhost:8080/Service";
                serviceUrl = "http://localhost:8080/Service";
            } else if (url == 'online') {
                baseUrl = "https://gamescrypt.000webhostapp.com/GameCrib.Service";
                serviceUrl = "https://gamescrypt.000webhostapp.com/GameCrib.Service";
            }
            else {
                baseUrl = url;
            }
        }
    };
}]);