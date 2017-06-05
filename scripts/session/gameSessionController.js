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