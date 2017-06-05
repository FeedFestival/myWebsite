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