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