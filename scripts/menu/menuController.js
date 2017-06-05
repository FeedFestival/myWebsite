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

        $scope.menus = [];

        $scope.selectMenuItem = function (item) {

            for (var i = 0; i < $scope.menus.length; i++) {
                if ($scope.menus[i].id != item.id)
                    $scope.menus[i].active = false;
                else
                    $scope.menus[i].active = true;
            }
            $scope.go('/' + item.URL);
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