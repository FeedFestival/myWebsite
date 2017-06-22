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