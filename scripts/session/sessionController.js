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
            }
        };

        if ($localStorage.exitedGame) {
            $localStorage.exitedGame = false;
            $location.path('/games');
        }

        if ($localStorage.userId != null)
            $scope.app.loggingIn = false;

        sessionFactory.setupApp().then(function (data) {
            sessionInformationService.setSession(
                {
                    FacebookAppId: '1193283007398999',
                    Apps: data
                }
            );

            menuFactory.refreshMenus();

            $facebook.getLoginStatus().then(function (response) {
                if (response.status === 'connected') {
                    $scope.app.facebookConnected = true;

                    if ($localStorage.userId != null)
                        login();
                } else {
                    $scope.app.facebookConnected = false;
                }
            });
        });

        $scope.loginWithFacebook = function () {

            if ($scope.app.isLoggedIn())
                return;

            if ($scope.app.facebookConnected) {
                login();
            } else {
                var permisions = "public_profile, email, user_friends";
                $facebook.login(permisions).then(function () {
                    login();
                });
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
            userFactory.getUser(facebookUniqueId, sessionInformationService.getSession().id)
                .then(function (response) {

                    if (response.Error == "USER_EXIST_NOT") {
                        userFactory.createUser(sessionInformationService.getUser())
                            .then(function () {
                                phpLogin(facebookUniqueId);
                            });
                    } else {
                        sessionFactory.login(response.id)
                            .then(function () {
                                var x = response.id;
                                $scope.loggedUser = sessionInformationService.getUser();
                                $localStorage.userId = $scope.loggedUser.id;
                                menuFactory.refreshMenus();
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