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

app.config(['$routeProvider', '$httpProvider', '$facebookProvider', '$locationProvider',
    function ($routeProvider, $httpProvider, $facebookProvider, $locationProvider) {

        $httpProvider.defaults.withCredentials = true;

        $facebookProvider.setAppId('1193283007398999');
        $facebookProvider.setVersion("v2.2");

        $routeProvider.when('/', {
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

        $routeProvider.otherwise({ redirectTo: '/' });

        // use the HTML5 History API
        //$locationProvider.html5Mode(true);
    }]);

app.service("url", ["$location", function (r) {
    var e = "http://localhost:8080/gamescrypt/GameCrib.Service";
    //var e = "gamescrypt.com/GameCrib.Service";
    return { base: function () { return e }, backend: function () { return e } }
}]);

app.run(function ($rootScope, $location, $route, sessionInformationService, utils) {
    checkBrowser();

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
                $location.path("/");
        }
    });

    // Returns the version of Internet Explorer or a -1 (indicating the use of another browser).
    function getInternetExplorerVersion() { var e = -1; if ("Microsoft Internet Explorer" == navigator.appName) { var r = navigator.userAgent; null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(r) && (e = parseFloat(RegExp.$1)) } return e } function checkBrowser() { var e = getInternetExplorerVersion(); e > -1 && e <= 8 && $location.path("/error") }
});