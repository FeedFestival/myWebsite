(function () {
    'use strict';

    tutorialController.$inject = [
        '$scope',
        '$sce',
        '$routeParams',
        '$templateRequest',
        '$window',
        'utils'
    ];
    angular.module('tutorial').controller('tutorialController', tutorialController);

    function tutorialController(
        $scope,
        $sce,
        $routeParams,
        $templateRequest,
        $window,
        utils) {

        var id = $routeParams.id;
        init();

        function init() {

            // getTutorial php by id

            $scope.tutorial = {
                id: $routeParams.id,
                Name: "",
                CreatedBy: 'Simionescu Daniel',
                LastUpdateDate: new Date(),
                Link: 'scripts/tutorial/tutorials/tutorial01.html', // Link: 'scripts/tutorial/tutorials/tutorial02.html',
                Paragraphs: [
                    {
                        id: 1,
                        Name: "The model",
                    },
                    {
                        id: 2,
                        Name: "Ambient occlusion",
                    },
                    {
                        id: 3,
                        Name: "Texture",
                    }
                ]
            };
        };

        $scope.openImage = function (url) {
            $window.open(url, '_blank');
        };
    }
})();

(function () {
    'use strict';

    tutorialsController.$inject = [
        '$scope',
        '$window'
    ];
    angular.module('tutorial').controller('tutorialsController', tutorialsController);

    function tutorialsController(
        $scope,
        $window) {

        $scope.tutorials = [
            {
                id: 1,
                Name: 'Tutorial01',
                Description: 'First tutorial.',
                Link: 'tutorials/tutorial01.html'
            },
            {
                id: 2,
                Name: 'Tutorial02',
                Description: 'Second tutorial.',
                Link: 'tutorials/tutorial02.html'
            }
        ];

        $scope.showTutorialDescription = function (id) {

        };

        $scope.openImage = function (url) {
            $window.open(url, '_blank');
        }
    }
})();