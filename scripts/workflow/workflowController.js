(function () {
    'use strict';

    workflowController.$inject = [
        '$scope',
        '$sce',
        '$routeParams',
        '$templateRequest',
        '$window',
        'utils'
    ];
    angular.module('workflow').controller('workflowController', workflowController);

    function workflowController(
        $scope,
        $sce,
        $routeParams,
        $templateRequest,
        $window,
        utils) {

        var id = $routeParams.id;
        init();

        function init() {

            // getworkflow php by id

            $scope.workflow = {
                id: $routeParams.id,
                Name: "",
                CreatedBy: 'Simionescu Daniel',
                LastUpdateDate: new Date(),
                Link: 'scripts/workflow/workflows/workflow01.html', // Link: 'scripts/workflow/workflows/workflow02.html',
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

    workflowsController.$inject = [
        '$scope',
        '$window'
    ];
    angular.module('workflow').controller('workflowsController', workflowsController);

    function workflowsController(
        $scope,
        $window) {
        $scope.workflows = [
            {
                id: 1,
                Name: 'workflow01',
                Description: 'First workflow.',
                Link: 'workflows/workflow01.html'
            },
            {
                id: 2,
                Name: 'workflow02',
                Description: 'Second workflow.',
                Link: 'workflows/workflow02.html'
            }
        ];

        $scope.showworkflowDescription = function (id) {

        };

        $scope.openImage = function (url) {
            $window.open(url, '_blank');
        }
    }
})();