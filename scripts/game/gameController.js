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