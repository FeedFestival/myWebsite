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