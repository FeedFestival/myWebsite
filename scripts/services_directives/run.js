(function () {
    'use strict';

    fileReader.$inject = [
        '$http',
        '$q'
    ];
    app.factory('fileReader', fileReader);

    function fileReader(
        $http, 
        $q) {
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
    };

    app.config(['$translateProvider', function ($translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: 'scripts/language/locale-',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en_US');

    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        //initialize get if not there
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        //disable IE caching
        // TODO: here creates a conflict with getting data from a php backend.

        //$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        //$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }]);

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

})();